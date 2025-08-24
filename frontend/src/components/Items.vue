<script setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import Select from 'primevue/select'

const items = ref(null)
const addresses = ref(null)
const selectedItem = ref('Poke Ball')

const fetchItems = async () => {
  let responseAddresses = await fetch("https://polishedcheats-backend.vercel.app/api/addresses") 
  let responseItems = await fetch("https://polishedcheats-backend.vercel.app/api/items")
  items.value = await responseItems.json()
  addresses.value = await responseAddresses.json()
}

onMounted(() => {
  fetchItems();
});

const getItemCode = (item) => {
  //Retrieve the right address
  return;
}

</script>

<template>
  <Card>
    <template #title>Items</template>
    <template #content>
      <Select v-model="selectedItem" :options="items" placeholder="Select an Item"/>
      {{ getItemCode(selectedItem) }}
    </template>
  </Card>
</template>

<style scoped></style>
