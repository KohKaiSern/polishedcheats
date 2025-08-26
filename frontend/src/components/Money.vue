<script setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import InputNumber from 'primevue/inputnumber';
import { IftaLabel } from 'primevue';
import { addressExtend } from '../lib/addressExtend.js'

const loaded = ref(false)
const addresses = ref(null)
const selectedMoney = ref(9999999)

const fetchAddresses = async () => {
  let responseAddresses = await fetch("https://polishedcheats-backend.vercel.app/api/addresses") 
  addresses.value = await responseAddresses.json()
}

onMounted(() => {
  fetchAddresses();
  loaded.value = true;
});

const getMoneyCode = (selectedMoney) => {
  //Retrieve the right address
  let addressList = addressExtend(addresses.value["wMoney"], 3);

  //Money is a six-digit hex number split between three consecutive addresses
  let cheatValue = selectedMoney.toString(16)
  cheatValue = "0".repeat(6 - cheatValue.length) + cheatValue;
  return ("01" + cheatValue.slice(0, 2) + addressList[0] + " 01" + cheatValue.slice(2, 4) + addressList[1] + " 01" + cheatValue.slice(4) + addressList[2]).toUpperCase();
}

</script>

<template>
  <Card>
    <template #title>Money</template>
    <template #content >
      <IftaLabel>
        <InputNumber class="mt-2 mb-5" v-model="selectedMoney" inputId="money" showButtons :min="0" :max="9999999" fluid />
        <label class="mt-2" for="money">Money</label>
      </IftaLabel>
      <p class="mb-5" v-if="loaded">Your code for the Amount of Money is: {{ getMoneyCode(selectedMoney) }}</p>
      <p>This code modifies the amount of money you have.</p>
    </template>
  </Card>
</template>

<style scoped></style>
