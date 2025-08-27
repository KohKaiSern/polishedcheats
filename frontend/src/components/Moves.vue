<script setup>
import { ref, onMounted, watch } from 'vue'
import { useClipboard } from '@vueuse/core'
import { addressExtend } from '../lib/addressExtend.js'
import Card from 'primevue/card'
import Select from 'primevue/select'
import Button from 'primevue/button'


const copy = ref(null)
const copied = ref(null)
const addresses = ref(null)
const moves = ref(null)
const selectedMoves = ref([null, null, null, null])

//GET from API
const fetchAddresses = async () => {
  let responseAddresses = await fetch("https://polishedcheats-backend.vercel.app/api/addresses") 
  let responseMoves = await fetch("https://polishedcheats-backend.vercel.app/api/moves")
  addresses.value = await responseAddresses.json()
  moves.value = await responseMoves.json()
}

onMounted(() => {
  fetchAddresses();
});

//Implements clipboard when a code exists
watch(selectedMoves, () => {
  if (!(selectedMoves.value.some(element => element === null))) {
    const clipboard = useClipboard(getMoveCode(selectedMoves.value));
    copy.value = clipboard.copy;
    copied.value = clipboard.copied;
  }
  },
  { deep : true }
);

//Code generator
const getMoveCode = (selectedMoves) => {
  //Retrieve the right address
  let addressList = addressExtend(addresses.value["wPartyMon1Moves"], 4);
  //Moves consists of four consecutive addresses, one for each move
  let cheatValues = selectedMoves.map((move) => {
    move = (moves.value.indexOf(move) + 1).toString(16);
    move = "0".repeat(2 - move.length) + move;
    return move;
  });

  return ("01" + cheatValues[0] + addressList[0] + " 01" + cheatValues[1] + addressList[1] + " 01" + cheatValues[2] + addressList[2] + " 01" + cheatValues[3] + addressList[3]).toUpperCase();
}

</script>

<template>
  <Card v-if="moves && addresses">
    <template #title>
      Moves
      <Button v-if="selectedMoves[0] && selectedMoves[1] && selectedMoves[2] && selectedMoves[3]" @click="copy(getMoveCode(selectedMoves))" :label="(copied.value ? 'Copied!' : 'Copy')" class="float-right" icon="pi pi-copy" iconPos="right" /></template>
    <template #content>
      <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-2 mb-5">
        <Select v-model="selectedMoves[0]" :options="moves" filter placeholder="Select Move 1"/>
        <Select v-model="selectedMoves[1]" :options="moves" filter placeholder="Select Move 2"/>
        <Select v-model="selectedMoves[2]" :options="moves" filter placeholder="Select Move 3"/>
        <Select v-model="selectedMoves[3]" :options="moves" filter placeholder="Select Move 4"/>
      </div>
      <p class="mb-5" v-if="selectedMoves[0] && selectedMoves[1] && selectedMoves[2] && selectedMoves[3]">Your code for this moveset is: {{ getMoveCode(selectedMoves) }}</p>
      <p class="mb-5" v-else>Please choose four moves.</p>
      <p>This code modifies the moveset of the first Pokemon in your party. <br>
        Note that this allows the Pokemon to learn moves it typically cannot. <br>
        Note that upon using this cheat, the PP of the moves will be incorrect, since it follows the PP of the old moveset. <br>
        This is easily fixed by healing your Pokemon or putting it into the PC. <br>
        Should you wish to change the moveset of the other Pokemon in your party, simply swap the party order to place them first.
      </p>
    </template>
  </Card>
</template>

<style scoped></style>
