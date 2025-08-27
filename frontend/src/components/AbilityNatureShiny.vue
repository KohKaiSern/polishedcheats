<script setup>
import { ref, onMounted, watch } from 'vue'
import { useClipboard } from '@vueuse/core'
import Card from 'primevue/card'
import Select from 'primevue/select'
import Button from 'primevue/button'

const addresses = ref(null)
const copy = ref(null)
const copied = ref(null)
const natures = [
    'Hardy',
    'Lonely',
    'Brave',
    'Adamant',
    'Naughty',
    'Bold',
    'Docile',
    'Relaxed',
    'Impish',
    'Lax',
    'Timid',
    'Hasty',
    'Serious',
    'Jolly',
    'Naive',
    'Modest',
    'Mild',
    'Quiet',
    'Bashful',
    'Rash',
    'Calm',
    'Gentle',
    'Sassy',
    'Careful',
    'Quirky'
]
const selectedOptions = ref([null, null, null])

//GET from API
const fetchAddresses = async () => {
  let responseAddresses = await fetch("https://polishedcheats-backend.vercel.app/api/addresses") 
  addresses.value = await responseAddresses.json()
}

onMounted(() => {
  fetchAddresses();
});

//Implements clipboard when a code exists
watch(selectedOptions, () => {
  if (!(selectedOptions.value.some(element => element === null))) {
    const clipboard = useClipboard(getOptionCode(selectedOptions.value));
    copy.value = clipboard.copy;
    copied.value = clipboard.copied;
  }
  },
  { deep : true }
);

//Code generator
const getOptionCode = (selectedOptions) => {
  //Retrieve the right address
  let address = addresses.value["wPartyMon1Ability"];

  //Shininess, Natures and Abilities are determined by 8-bits
  //SAANNNNN
  //S = 0 Non-Shiny
  //S = 1 Shiny
  //AA = 00 HA
  //AA = 01 A1
  //AA = 10 A2
  //NNNNN = 00000 Hardy

  let shinyValue = (['Non-Shiny', 'Shiny'].indexOf(selectedOptions[2])).toString(2);
  let abilityValue = (['Hidden Ability', 'Ability 1', 'Ability 2'].indexOf(selectedOptions[0])).toString(2);
  abilityValue = "0".repeat(2 - abilityValue.length) + abilityValue;
  let natureValue = (natures.indexOf(selectedOptions[1])).toString(2);
  natureValue = "0".repeat(5 - natureValue.length) + natureValue;

  //Convert to hex
  let cheatValue = parseInt((shinyValue + abilityValue + natureValue), 2).toString(16);
  cheatValue = "0".repeat(2 - cheatValue.length) + cheatValue;

  return ("01" + cheatValue + address).toUpperCase();
}

</script>

<template>
  <Card v-if="addresses">
    <template #title>
      Ability / Nature / Shininess
      <Button v-if="selectedOptions[0] && selectedOptions[1] && selectedOptions[2]" @click="copy(getOptionCode(selectedOptions))" :label="(copied.value ? 'Copied!' : 'Copy')" class="float-right" icon="pi pi-copy" iconPos="right" /></template>
    <template #content>
      <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 mt-2 mb-5">
        <Select v-model="selectedOptions[0]" :options="['Ability 1', 'Ability 2', 'Hidden Ability']" placeholder="Select an Ability"/>
        <Select v-model="selectedOptions[1]" :options="natures" filter placeholder="Select a Nature"/>
        <Select v-model="selectedOptions[2]" :options="['Non-Shiny', 'Shiny']" placeholder="Choose Shininess"/>
      </div>
      <p class="mb-5" v-if="selectedOptions[0] && selectedOptions[1] && selectedOptions[2]">Your code for {{ selectedOptions[0] }}, a {{ selectedOptions[1] }} Nature and a {{ selectedOptions[2] }} Pokemon is: {{ getOptionCode(selectedOptions) }}</p>
      <p class="mb-5" v-else>Please choose an ability, a nature and a shininess value.</p>
      <p>This code modifies the ability, nature and shininess of your Pokemon. <br>
        If you have abilities and natures turned off in your save settings, this cheat will only affect shininess. <br>
        Should you wish to change the ability, nature or shininess of the other Pokemon in your party, simply swap the party order to place them first.
      </p>
    </template>
  </Card>
</template>

<style scoped></style>
