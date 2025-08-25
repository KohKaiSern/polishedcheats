<script setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import Select from 'primevue/select'
import { addressExtend } from '../lib/addressExtend.js'

const loaded = ref(false)
const items = ref(null)
const addresses = ref(null)
const selectedItem = ref(null)

const fetchItems = async () => {
  let responseAddresses = await fetch("https://polishedcheats-backend.vercel.app/api/addresses") 
  let responseItems = await fetch("https://polishedcheats-backend.vercel.app/api/items")
  items.value = await responseItems.json()
  addresses.value = await responseAddresses.json()
}

onMounted(() => {
  fetchItems();
  loaded.value = true;
});

//Parse items into an array of [items] for Select to loop over
const getItemList = () => {
  return items.value.map((item) => {
    return Object.keys(item)[0];
  })
}

const getItemCode = (item) => {
  //Retrieve the right address
  let address = "";
  let cheatValue = "";
  items.value.forEach((item) => {
    if (Object.keys(item)[0] === selectedItem.value) {
      if (item[selectedItem.value] === "Ball") {
        address = addresses.value["wBalls"]
        cheatValue = (items.value.indexOf(item) + 1).toString(16)
      }
      else if (item[selectedItem.value] === "Medicine") {
        address = addresses.value["wMedicine"]
        cheatValue = (items.value.indexOf(item) + 1).toString(16)
      }
      else if (item[selectedItem.value] === "Item") {
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
  <Card>
    <template #title>Items</template>
    <template #content>
      <Select v-if="loaded" v-model="selectedItem" :options="getItemList()" filter placeholder="Select an Item"/>
      <p v-if="selectedItem">Your code for {{ selectedItem }} is: {{ getItemCode() }}</p>
      <p v-else>Please choose an item.</p>
      <p>This code replaces the first item in the relevant bag slot with 99 of the chosen item. <br>
        Warning! If the relevant bag slot is empty, this code will corrupt your save!
      </p>
    </template>
  </Card>
</template>

<style scoped></style>
