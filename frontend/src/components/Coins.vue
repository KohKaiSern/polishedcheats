<script setup>
import { ref, onMounted, watch } from "vue";
import { useClipboard } from "@vueuse/core";
import { addressExtend } from "../lib/addressExtend.js";
import Card from "primevue/card";
import InputNumber from "primevue/inputnumber";
import IftaLabel from "primevue/iftalabel";
import Button from "primevue/button";

const copy = ref(null);
const copied = ref(null);
const addresses = ref(null);
const selectedCoins = ref(65535);

//GET from API
const fetchAddresses = async () => {
  let responseAddresses = await fetch(
    "https://polishedcheats-backend.vercel.app/api/addresses"
  );
  addresses.value = await responseAddresses.json();
};

onMounted(() => {
  fetchAddresses();
});

//Implements clipboard when a code exists
watch(addresses, () => {
  const clipboard = useClipboard(getCoinCode(selectedCoins.value));
  copy.value = clipboard.copy;
  copied.value = clipboard.copied;
});

//Code generator
const getCoinCode = (selectedCoins) => {
  //Retrieve the right address
  let addressList = addressExtend(addresses.value["wCoins"], 2);

  //Coins is a four-digit hex number split between two consecutive addresses
  let cheatValue = selectedCoins.toString(16);
  cheatValue = "0".repeat(4 - cheatValue.length) + cheatValue;
  return (
    "01" +
    cheatValue.slice(0, 2) +
    addressList[0] +
    " 01" +
    cheatValue.slice(2, 4) +
    addressList[1]
  ).toUpperCase();
};
</script>

<template>
  <Card v-if="addresses">
    <template #title>
      <div class="flex flex-wrap justify-between gap-5">
        <span>Coins</span>
        <Button
          @click="copy(getCoinCode(selectedCoins))"
          :label="copied.value ? 'Copied!' : 'Copy'"
          icon="pi pi-copy"
          iconPos="right"
        />
      </div>
    </template>
    <template #content>
      <IftaLabel>
        <InputNumber
          class="mt-2 mb-5"
          v-model="selectedCoins"
          inputId="coins"
          showButtons
          :min="0"
          :max="65535"
          fluid
        />
        <label class="mt-2" for="coins">Coins</label>
      </IftaLabel>
      <p class="mb-5">
        Your code for the coins is: {{ getCoinCode(selectedCoins) }}
      </p>
      <p>
        This code modifies the amount of game corner coins you have. <br />
        Note that you will still need a Coin Case to actually use them.
      </p>
    </template>
  </Card>
</template>

<style scoped></style>
