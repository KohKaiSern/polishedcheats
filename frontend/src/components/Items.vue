<script setup>
import { ref, onMounted } from 'vue'

const items = ref(null)

const fetchItems = async () => {
    let response = await fetch("https://polishedcheats-backend-v2.vercel.app/api/items")
    items.value = await response.json()
}

onMounted(() => {
    fetchItems();
});

</script>

<template>
  <h1>Items</h1>
  <p>
    {{ items }}
  </p>
</template>

<style scoped></style>
