<script setup>
import { ref, onMounted, watch } from 'vue'
import { useClipboard } from '@vueuse/core'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputNumber from 'primevue/inputnumber';
import { IftaLabel } from 'primevue';

const copy = ref(null)
const copied = ref(null)
const addresses = ref(null)
const selectedHappiness = ref(255)

const fetchAddresses = async () => {
  let responseAddresses = await fetch("https://polishedcheats-backend.vercel.app/api/addresses") 
  addresses.value = await responseAddresses.json()
}

onMounted(() => {
  fetchAddresses();
});

watch(addresses, () => {
  const clipboard = useClipboard(getHappinessCode(selectedHappiness.value));
  copy.value = clipboard.copy;
  copied.value = clipboard.copied;
})

const getHappinessCode = (selectedHappiness) => {
  //Retrieve the right address
  let address = addresses.value["wPartyMon1Happiness"];
  let cheatValue = selectedHappiness.toString(16)
  cheatValue = "0".repeat(2 - cheatValue.length) + cheatValue;
  return ("01" + cheatValue + address).toUpperCase();
}

</script>

<template>
  <Card v-if="addresses">
    <template #title>Happiness / Egg Cycles <Button @click="copy(getHappinessCode(selectedHappiness))" :label="(copied.value ? 'Copied!' : 'Copy')" class="float-right" icon="pi pi-copy" iconPos="right" /></template>
    <template #content >
      <IftaLabel>
        <InputNumber class="mt-2 mb-5" v-model="selectedHappiness" inputId="happiness" showButtons :min="0" :max="255" fluid />
        <label class="mt-2" for="happiness">Happiness / Egg Cycles</label>
      </IftaLabel>
      <p class="mb-5">Your code for the Pokemon's Happiness is: {{ getHappinessCode(selectedHappiness) }}</p>
      <p>This code modifies the Happiness Value of the first Pokemon in your party. <br>
        Incidentally, if the first Pokemon in your party is an Egg, this instead sets the number of Egg Cycles before hatching. <br>
        For example, if you set the Egg Cycle count to 00, you will then only need to walk another 256 steps to hatch the Egg. <br>
        Should you wish to change the Happiness Values of the other Pokemon in your party, simply swap the party order to place them first.
      </p>
    </template>
  </Card>
</template>

<style scoped></style>
