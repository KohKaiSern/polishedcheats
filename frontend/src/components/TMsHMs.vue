<script setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import { addressExtend } from '../lib/addressExtend.js'

const loaded = ref(false)
const addresses = ref(null)

const fetchAddresses = async () => {
  let responseAddresses = await fetch("https://polishedcheats-backend.vercel.app/api/addresses") 
  addresses.value = await responseAddresses.json()
}

onMounted(() => {
  fetchAddresses();
  loaded.value = true;
});

const getTMCode = () => {
  //Retrieve the right address
  let addressList = addressExtend(addresses.value["wTMsHMs"], 11);

  //TMs and HMs are controlled by 11 consecutive memory addresses.
  //Effectively, every address controls 8 TMs in a binary format.
  //For example, if the first address is 01000011, the bag will contain
  //TM01, TM02 and TM07.

  let cheatValue = "";
  addressList.slice(0, -1).forEach((address) => {
    cheatValue += " 01FF" + address;
  })

  return (cheatValue.slice(1) + " 0101" + addressList[10]).toUpperCase();
}

</script>

<template>
  <Card>
    <template #title>TMs & HMs</template>
    <template #content >
      <p class="mb-3" v-if="loaded">Your code for all the TMs and HMs is: {{ getTMCode() }}</p>
      <p>This code gives you every TM and HM. <br>
        Note that you will still need the relevant Gym Badges to use HM Moves outside of battle.
      </p>
    </template>
  </Card>
</template>

<style scoped></style>
