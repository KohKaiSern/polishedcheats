<script setup>
import { ref, onMounted, watch } from 'vue'
import { useClipboard } from '@vueuse/core'
import Card from 'primevue/card'
import Select from 'primevue/select'
import Button from 'primevue/button'

const addresses = ref(null)
const copy = ref(null)
const copied = ref(null)
const selectedGender = ref(null)

//GET from API
const fetchAddresses = async () => {
  let responseAddresses = await fetch("https://polishedcheats-backend.vercel.app/api/addresses") 
  addresses.value = await responseAddresses.json()
}

onMounted(() => {
  fetchAddresses();
});

//Implements clipboard when a code exists
watch(selectedGender, () => {
  const clipboard = useClipboard(getGenderCode(selectedGender.value));
  copy.value = clipboard.copy;
  copied.value = clipboard.copied;
});

//Code generator
const getGenderCode = (selectedGender) => {
  //Retrieve the right address
  let address = addresses.value["wPartyMon1Gender"];
  if (selectedGender === 'Male') {
    return ("0111" + address).toUpperCase();
  }
  return ("0199" + address).toUpperCase();
}

</script>

<template>
  <Card v-if="addresses">
    <template #title>
      <div class="flex flex-wrap justify-between gap-5">
        <span>Gender</span>
        <Button v-if="selectedGender" @click="copy(getGenderCode(selectedGender))" :label="(copied.value ? 'Copied!' : 'Copy')" icon="pi pi-copy" iconPos="right" />
      </div>
    </template>
    <template #content >
      <Select class="mt-2 mb-4" v-model="selectedGender" :options="['Male', 'Female']" placeholder="Select a Gender"/>
      <p class="mb-3" v-if="selectedGender">Your code for this gender is: {{ getGenderCode(selectedGender) }}</p>
      <p class="mb-3" v-else>Please choose a gender.</p>
      <p>This code modifies the Gender of the first Pokemon in your party. <br>
        Note that this code has no effect on genderless Pokemon. <br>
        Should you wish to change the Genders of the other Pokemon in your party, simply swap the party order to place them first.
      </p>
    </template>
  </Card>
</template>

<style scoped></style>
