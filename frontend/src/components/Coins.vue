<script setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import InputNumber from 'primevue/inputnumber';
import { IftaLabel } from 'primevue';
import { addressExtend } from '../lib/addressExtend.js';

const loaded = ref(false)
const addresses = ref(null)
const selectedCoins = ref(65535)

const fetchAddresses = async () => {
  let responseAddresses = await fetch("https://polishedcheats-backend.vercel.app/api/addresses") 
  addresses.value = await responseAddresses.json()
}

onMounted(() => {
  fetchAddresses();
  loaded.value = true;
});

const getCoinCode = (selectedCoins) => {
  //Retrieve the right address
  let addressList = addressExtend(addresses.value["wCoins"], 2);

  //Coins is a four-digit hex number split between two consecutive addresses
  let cheatValue = selectedCoins.toString(16)
  cheatValue = "0".repeat(4 - cheatValue.length) + cheatValue;
  return ("01" + cheatValue.slice(0, 2) + addressList[0] + " 01" + cheatValue.slice(2, 4) + addressList[1]).toUpperCase();
}

</script>

<template>
  <Card>
    <template #title>Coins</template>
    <template #content >
      <IftaLabel>
        <InputNumber class="mt-2 mb-5" v-model="selectedCoins" inputId="coins" showButtons :min="0" :max="65535" fluid />
        <label class="mt-2" for="coins">Coins</label>
      </IftaLabel>
      <p class="mb-5" v-if="loaded">Your code for the coins is: {{ getCoinCode(selectedCoins) }}</p>
      <p>This code modifies the amount of game corner coins you have. <br>
        Note that you will still need a Coin Case to actually use them.
      </p>
    </template>
  </Card>
</template>

<style scoped></style>
