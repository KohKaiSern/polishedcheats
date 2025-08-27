<script setup>
import { ref, onMounted, watch } from 'vue'
import { useClipboard } from '@vueuse/core'
import { addressExtend } from '../lib/addressExtend.js'
import Card from 'primevue/card'
import Select from 'primevue/select'
import Button from 'primevue/button'

const copy = ref(null)
const copied = ref(null)
const addresses = ref(null)
const items = ref(null)
const selectedItem = ref(null)

//GET from API
const fetchItems = async () => {
  let responseAddresses = await fetch("https://polishedcheats-backend.vercel.app/api/addresses") 
  let responseItems = await fetch("https://polishedcheats-backend.vercel.app/api/items")
  items.value = await responseItems.json()
  addresses.value = await responseAddresses.json()
}

onMounted(() => {
  fetchItems();
});

//Implements clipboard when a code exists
watch(selectedItem, () => {
  const clipboard = useClipboard(getItemCode(selectedItem.value));
  copy.value = clipboard.copy;
  copied.value = clipboard.copied;
});

//Parse items into an array of [items] for Select to loop over
const getItemList = () => {
  return items.value.map((item) => {
    return Object.keys(item)[0];
  })
}

//Code generator
const getItemCode = (selectedItem) => {
  //Retrieve the right address
  let address = "";
  let cheatValue = "";
  items.value.forEach((item) => {
    if (Object.keys(item)[0] === selectedItem) {
      if (item[selectedItem] === "Ball") {
        address = addresses.value["wBalls"]
        cheatValue = (items.value.indexOf(item) + 1).toString(16)
      }
      else if (item[selectedItem] === "Medicine") {
        address = addresses.value["wMedicine"]
        cheatValue = (items.value.indexOf(item) + 1).toString(16)
      }
      else if (item[selectedItem] === "Berries") {
        address = addresses.value["wBerries"]
        cheatValue = (items.value.indexOf(item) + 1).toString(16)
      }
      else if (item[selectedItem] === "Item") {
        address = addresses.value["wItems"]
        cheatValue = (items.value.indexOf(item) + 1).toString(16)
      }
    }
  })
  //Add in the address after wItems, which controls the amount of said item.
  let addressList = addressExtend(address, 2);
  
  //Pad the cheatValue length to two
  cheatValue = "0".repeat(2 - cheatValue.length) + cheatValue;

  return ("01" + cheatValue + addressList[0] + " 0163" + addressList[1]).toUpperCase();
}

</script>

<template>
  <Card v-if="items && addresses">
    <template #title>
      <div class="flex flex-wrap justify-between gap-5">
        <span>Items</span> 
        <Button v-if="selectedItem" @click="copy(getItemCode(selectedItem))" :label="(copied.value ? 'Copied!' : 'Copy')" icon="pi pi-copy" iconPos="right" />
      </div>
    </template>
    <template #content>
      <Select class="mt-2 mb-5" v-model="selectedItem" :options="getItemList()" filter placeholder="Select an Item"/>
      <p class="mb-5" v-if="selectedItem">Your code for {{ selectedItem }} is: {{ getItemCode(selectedItem) }}</p>
      <p class="mb-5" v-else>Please choose an item.</p>
      <p>This code replaces the first item in the relevant bag slot with 99 of the chosen item. <br>
        Warning! If the relevant bag slot is empty, this code will corrupt your save!
      </p>
    </template>
  </Card>
</template>

<style scoped></style>
