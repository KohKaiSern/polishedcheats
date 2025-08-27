<script setup>
import { ref, onMounted, watch } from 'vue'
import { useClipboard } from '@vueuse/core'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputNumber from 'primevue/inputnumber';
import { IftaLabel } from 'primevue';

const addresses = ref(null)
const selectedDVs = ref([15, 15, 15, 15, 15, 15])
const copy = ref(null)
const copied = ref(false)
const types = [
    "Fighting",
    "Flying",
    "Poison",
    "Ground",
    "Rock",
    "Bug",
    "Ghost",
    "Steel",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Psychic",
    "Ice",
    "Dragon",
    "Dark",
    "Fairy"
]

const fetchAddresses = async () => {
  let responseAddresses = await fetch("https://polishedcheats-backend.vercel.app/api/addresses") 
  addresses.value = await responseAddresses.json()
}

onMounted(() => {
  fetchAddresses();
});

watch(addresses, () => {
  const clipboard = useClipboard(getDVCode(selectedDVs.value));
  copy.value = clipboard.copy;
  copied.value = clipboard.copied;
})

const getDVCode = (selectedDVs) => {
  //Retrieve the right addresses
  let addressList = [addresses.value["wPartyMon1HPAtkDV"], addresses.value["wPartyMon1DefSpeDV"], addresses.value["wPartyMon1SatSdfDV"]];
  //Convert DVs to Hex (validation performed by PrimeVue component)
  selectedDVs = selectedDVs.map((dv) => dv.toString(16))

  return ("01" + selectedDVs[0] + selectedDVs[1] + addressList[0] + " 01" + selectedDVs[2] + selectedDVs[3] + addressList[1] + " 01" + selectedDVs[4] + selectedDVs[5] + addressList[2]).toUpperCase();
}

const getHPType = (selectedDVs) => {
    //Hidden Power Type Algorithm
    //Convert every DV to a 0 or 1 depending on whether it is even or odd respectively.
    //Insert into this formula:
    //x = floor(((a + 2b + 4c + 8d + 16e + 32f) * 16) / 63)
    //Where a = HP, b = Atk, c = Def, d = Spe, e = Sat, f = Sdf
    //x is the index of types
    let x = 0;
    for (let i = 0; i < 6; i++) {
        x += (selectedDVs[i] % 2) * (2 ** i)
    }
    return types[Math.floor(x * 16 / 63)];
}

</script>

<template>
  <Card>
    <template #title>Determinant Values <Button v-if="addresses" @click="copy(getDVCode(selectedDVs))" :label="(copied.value ? 'Copied!' : 'Copy')" class="float-right" icon="pi pi-copy" iconPos="right" /></template>
    <template #content>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2 mb-6">
      <IftaLabel>
        <InputNumber v-model="selectedDVs[0]" inputId="hp" showButtons :min="0" :max="15" fluid />
        <label for="hp">HP</label>
      </IftaLabel>
      <IftaLabel>
        <InputNumber v-model="selectedDVs[1]" inputId="atk" showButtons :min="0" :max="15" fluid />
        <label for="atk">Attack</label>
      </IftaLabel>
      <IftaLabel>
        <InputNumber v-model="selectedDVs[2]" inputId="def" showButtons :min="0" :max="15" fluid />
        <label for="def">Defense</label>
      </IftaLabel>
      <IftaLabel>
        <InputNumber v-model="selectedDVs[3]" inputId="spe" showButtons :min="0" :max="15" fluid />
        <label for="spe">Speed</label>
      </IftaLabel>
      <IftaLabel>
        <InputNumber v-model="selectedDVs[4]" inputId="sat" showButtons :min="0" :max="15" fluid />
        <label for="sat">Special Attack</label>
      </IftaLabel>
      <IftaLabel>
        <InputNumber v-model="selectedDVs[5]" inputId="sdf" showButtons :min="0" :max="15" fluid />
        <label for="sdf">Special Defense</label>
      </IftaLabel>
      </div>
      <p class="mb-5" v-if="addresses">Your code for the Determinant Values is: {{ getDVCode(selectedDVs) }}</p>
      <p class="mb-5">The Hidden Power Type of your Pokemon will be: {{ getHPType(selectedDVs) }}</p>
      <p>This code modifies the Determinant Values of your Pokemon. As a side-effect, this will also affect the type of the Pokemon's Hidden Power move.<br>
        If you have Perfect Stats turned on in your save settings, this will only affect your Hidden Power Type. <br>
        Should you wish to change the DVs of the other Pokemon in your party, simply swap the party order to place them first.
      </p>
    </template>
  </Card>
</template>

<style scoped></style>
