<script setup>
import { ref, onMounted, watch } from 'vue'
import { useClipboard } from '@vueuse/core'
import { addressExtend } from '../lib/addressExtend.js'
import Card from 'primevue/card'
import Button from 'primevue/button'

const copy = ref(null)
const copied = ref(null)
const addresses = ref(null)

//GET from API
const fetchAddresses = async () => {
  let responseAddresses = await fetch("https://polishedcheats-backend.vercel.app/api/addresses") 
  addresses.value = await responseAddresses.json()
}

onMounted(() => {
  fetchAddresses();
});

//Implements clipboard when a code exists
watch(addresses, () => {
  const clipboard = useClipboard(getTMCode());
  copy.value = clipboard.copy;
  copied.value = clipboard.copied;
})

//Code generator
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
  <Card v-if="addresses">
    <template #title>
      <div class="flex flex-wrap justify-between gap-5">
        <span>TMs & HMs</span>
        <Button @click="copy(getTMCode())" :label="(copied.value ? 'Copied!' : 'Copy')" icon="pi pi-copy" iconPos="right" />
      </div>
    </template>
    <template #content >
      <p class="mt-2 mb-3">Your code for all the TMs and HMs is: {{ getTMCode() }}</p>
      <p>This code gives you every TM and HM. <br>
        Note that you will still need the relevant Gym Badges to use HM Moves outside of battle.
      </p>
    </template>
  </Card>
</template>

<style scoped></style>
