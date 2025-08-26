<script setup>
import { ref } from 'vue'
import Items from './components/Items.vue'
import Wild from './components/Wild.vue'
import DVs from './components/DVs.vue'
import EVs from './components/EVs.vue'
import Moves from './components/Moves.vue'
import Happiness from './components/Happiness.vue'
import Money from './components/Money.vue'
import AbilityNatureShiny from './components/AbilityNatureShiny.vue'
import TMsHMs from './components/TMsHMs.vue'
import Select from 'primevue/select'
import Divider from 'primevue/divider';

const selectedCheat = ref(null)
const cheats = ["Item Modifier", "Wild Pokemon Modifier", "DV Modifier", "EV Modifier", "Moveset Modifier", "Ability / Nature / Shininess Modifier", "Happiness Modifier", "Money Modifier", "TM & HM Modifier"];

</script>

<template>
  <h1 class="text-3xl font-bold mt-5 ml-5 mb-3 mr-5">Polished Cheats v3.1.1</h1>
  <h2 class="text-2xl italic mt-5 mb-5 ml-5 mr-5">This website is currently in a <span class="text-red-500 font-bold">BETA</span> state. Do not expect the codes to work - the website is under heavy testing.</h2>
  <p class="ml-5 mr-5">This website provides GameShark cheat codes for Polished Crystal by scraping .sym and .asm files. This allows cheat codes to be up-to-date and customizable.</p>
  <div class="mt-3 ml-5 mb-3">
  <p>Before using this website, read the following:</p>
  <ul class="list-inside list-disc">
    <li>These cheats work only on v3.1.1 of Polished Crystal. Attempts to use said codes in other versions <em>will</em> corrupt your save.</li>
    <li>Upon usage of a cheat, turn it off immediately to avoid side-effects. Always make a backup of your save before usage.</li>
    <li>If a cheat appeared to have done nothing, revert to a previous backup. The cheat has most likely broken your save.</li>
    <li>By using a cheat, you most likely invalidate any bug reports that come out of your save.</li>
    <li>I take zero responsibility for corrupted saves.</li>
    <li>Contact me via the Polished Crystal Discord server @Rev3lation if a code fails.</li>
  </ul>
  </div>
  <em class="ml-5">Credits: Rev3lation, Sylvie, LamLamLam</em><br><br>

  <Select class="ml-5 mb-3" v-model="selectedCheat" :options="cheats" filter placeholder="Select a Cheat"/>

  <Divider />

  <div class="mb-100" v-if="selectedCheat===null"></div>
  <Wild class="mt-7 ml-5 mr-5 mb-100" v-if="selectedCheat==='Wild Pokemon Modifier'" />
  <Items class="mt-7 ml-5 mr-5 mb-100" v-if="selectedCheat==='Item Modifier'"/>
  <DVs class="mt-7 ml-5 mr-5 mb-100" v-if="selectedCheat==='DV Modifier'"/>
  <EVs class="mt-7 ml-5 mr-5 mb-100" v-if="selectedCheat==='EV Modifier'"/>
  <Moves class="mt-7 ml-5 mr-5 mb-100" v-if="selectedCheat==='Moveset Modifier'"/>
  <AbilityNatureShiny class="mt-7 ml-5 mr-5 mb-100" v-if="selectedCheat==='Ability / Nature / Shininess Modifier'"/>
  <Happiness class="mt-7 ml-5 mr-5 mb-100" v-if="selectedCheat==='Happiness Modifier'"/>
  <Money class="mt-7 ml-5 mr-5 mb-100" v-if="selectedCheat==='Money Modifier'"/>
  <TMsHMs class="mt-7 ml-5 mr-5 mb-100" v-if="selectedCheat==='TM & HM Modifier'"/>
</template>

<style scoped></style>
