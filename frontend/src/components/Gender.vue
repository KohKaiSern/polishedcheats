<script setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import { Select } from 'primevue'

const loaded = ref(false)
const addresses = ref(null)
const selectedGender = ref(null)

const fetchAddresses = async () => {
  let responseAddresses = await fetch("https://polishedcheats-backend.vercel.app/api/addresses") 
  addresses.value = await responseAddresses.json()
}

onMounted(() => {
  fetchAddresses();
  loaded.value = true;
});

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
  <Card>
    <template #title>Gender</template>
    <template #content >
      <Select class="mt-2 mb-4" v-if="loaded" v-model="selectedGender" :options="['Male', 'Female']" placeholder="Select a Gender"/>
      <p class="mb-3" v-if="selectedGender">Your code for this gender is: {{ getGenderCode(selectedGender) }}</p>
      <p class="mb-3" v-else>Please choose a gender.</p>
      <p>This code modifies the Gender of the first Pokemon in your party. <br>
        <!-- TODO: Figure out what happens when you use this code on a genderless species. -->
        Should you wish to change the Genders of the other Pokemon in your party, simply swap the party order to place them first.
      </p>
    </template>
  </Card>
</template>

<style scoped></style>
