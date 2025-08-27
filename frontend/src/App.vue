<script setup>
import { ref } from 'vue'
import Select from 'primevue/select'
import Divider from 'primevue/divider';
import Items from './components/Items.vue'
import Wild from './components/Wild.vue'
import DVs from './components/DVs.vue'
import EVs from './components/EVs.vue'
import Moves from './components/Moves.vue'
import Happiness from './components/Happiness.vue'
import Money from './components/Money.vue'
import AbilityNatureShiny from './components/AbilityNatureShiny.vue'
import TMsHMs from './components/TMsHMs.vue'
import Gender from './components/Gender.vue'
import Coins from './components/Coins.vue'

const selectedCheat = ref(null)
const cheats = ["Item Modifier", "Wild Pokemon Modifier", "DV Modifier", "EV Modifier", "Moveset Modifier", "Ability / Nature / Shininess Modifier", "Happiness / Egg Cycle Modifier", "Money Modifier", "TM & HM Modifier", "Gender Modifier", "Coins Modifier"];

</script>

<template>
  <div class="ml-5 mr-5">

    <h1 class="text-3xl font-bold mt-5 mb-3">Polished Cheats v3.1.1</h1>

    <p>This website provides GameShark cheat codes for Polished Crystal by scraping .sym and .asm files. This allows cheat codes to be up-to-date and customizable.</p>
    
    <div class="mt-3 mb-3">
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
    <em>Credits: Rev3lation, Sylvie, Cammy, Jaidenlyons</em><br><br>

    <Select class="mb-3" v-model="selectedCheat" :options="cheats" filter placeholder="Select a Cheat"/>

    <Divider />

    <div class="mt-7 mb-100">
      <Wild v-if="selectedCheat==='Wild Pokemon Modifier'" />
      <Items v-if="selectedCheat==='Item Modifier'"/>
      <DVs v-if="selectedCheat==='DV Modifier'"/>
      <EVs v-if="selectedCheat==='EV Modifier'"/>
      <Moves v-if="selectedCheat==='Moveset Modifier'"/>
      <AbilityNatureShiny v-if="selectedCheat==='Ability / Nature / Shininess Modifier'"/>
      <Happiness v-if="selectedCheat==='Happiness / Egg Cycle Modifier'"/>
      <Money v-if="selectedCheat==='Money Modifier'"/>
      <TMsHMs v-if="selectedCheat==='TM & HM Modifier'"/>
      <Gender v-if="selectedCheat==='Gender Modifier'"/>
      <Coins v-if="selectedCheat==='Coins Modifier'"/>
    </div>

  </div>
</template>

<style scoped></style>
