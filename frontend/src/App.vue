<script setup>
import { ref } from 'vue'
import Items from './components/Items.vue'
import Wild from './components/Wild.vue'
import Select from 'primevue/select'
import Divider from 'primevue/divider';

const selectedCheat = ref(null)
const cheats = ["Item Modifier", "Wild Pokemon Modifier"];

</script>

<template>
  <h1>Polished Cheats v3.1.1</h1>
  <h2>This website is currently in a BETA state. Do not expect the codes to work - the website is under heavy testing.</h2>
  <p>This website provides GameShark cheat codes for Polished Crystal by scraping .sym and .asm files. This allows cheat codes to be up-to-date and customizable.</p>
  <p>Before using this website, read the following:</p>
  <ul>
    <li>These cheats work only on v3.1.1 of Polished Crystal. Attempts to use said codes in other versions <em>will</em> corrupt your save.</li>
    <li>Upon usage of a cheat, turn it off immediately to avoid side-effects. Always make a backup of your save before usage.</li>
    <li>If a cheat appeared to have done nothing, revert to a previous backup. The cheat has most likely broken your save.</li>
    <li>By using a cheat, you most likely invalidate any bug reports that come out of your save.</li>
    <li>I take zero responsibility for corrupted saves.</li>
    <li>Contact me via the Polished Crystal Discord server @Rev3lation if a code fails.</li>
  </ul>
  <em>Credits: Rev3lation, Sylvie, LamLamLam</em><br><br>

  <Select v-model="selectedCheat" :options="cheats" filter placeholder="Select a Cheat"/>

  <Divider />

  <Wild v-if="selectedCheat==='Wild Pokemon Modifier'" />
  <Items v-if="selectedCheat==='Item Modifier'"/>
</template>

<style scoped></style>
