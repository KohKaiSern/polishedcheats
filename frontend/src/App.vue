<script setup>
import { ref, onMounted } from "vue";
import { inject } from "@vercel/analytics"
import Select from "primevue/select";
import Divider from "primevue/divider";
import Items from "./components/Items.vue";
import Wild from "./components/Wild.vue";
import DVs from "./components/DVs.vue";
import EVs from "./components/EVs.vue";
import Moves from "./components/Moves.vue";
import Happiness from "./components/Happiness.vue";
import Money from "./components/Money.vue";
import AbilityNatureShiny from "./components/AbilityNatureShiny.vue";
import TMsHMs from "./components/TMsHMs.vue";
import Gender from "./components/Gender.vue";
import Coins from "./components/Coins.vue";
import Status from "./components/Status.vue";
import Level from "./components/Level.vue";
import CALC_NATURES from "./components/CALC_NATURES.vue";

const version = ref(null);
const selectedCheat = ref(null);
const cheats = [
  "Item Modifier",
  "Wild Pokemon Modifier",
  "DV Modifier",
  "EV Modifier",
  "Moveset Modifier",
  "Ability / Nature / Shininess Modifier",
  "Happiness / Egg Cycle Modifier",
  "Money Modifier",
  "TM & HM Modifier",
  "Gender Modifier",
  "Coins Modifier",
  "Status Modifier",
  "Level Modifier"
];

//GET version from API
const fetchVersion = async () => {
  let responseVersion = await fetch(
    "https://polishedcheats-backend.vercel.app/"
  );
  version.value = await responseVersion.text();
};

onMounted(() => {
  fetchVersion();
  inject();
});
</script>

<template>
  <div class="ml-5 mr-5">
    <h1 class="text-3xl font-bold mt-5 mb-3">Polished Cheats v{{ version }}</h1>

    <p>
      UPDATE: Unless you are interested in the technical aspects of GameShark cheats,
      I would highly recommend you use <a href='https://polishededitor.vercel.app'>Polished Editor</a>, my new graphical save editor for
      Polished Crystal. It is easier to use, safer and works on more emulators. <br>
      This website provides GameShark cheat codes for Polished Crystal by
      scraping .sym and .asm files. This allows cheat codes to be up-to-date and
      customizable.
    </p>

    <div class="mt-3 mb-3">
      <p>Before using this website, read the following:</p>
      <ul class="list-inside list-disc">
        <li>
          These cheats work only on v{{ version }} of Polished Crystal. Attempts
          to use said codes in other versions <em>will</em> corrupt your save.
        </li>
        <li>
          Upon usage of a cheat, turn it off immediately to avoid side-effects.
          Always make a backup of your save before usage.
        </li>
        <li>
          If a cheat appeared to have done nothing, revert to a previous backup.
          The cheat has most likely broken your save.
        </li>
        <li>
          By using a cheat, you most likely invalidate any bug reports that come
          out of your save.
        </li>
        <li>I take zero responsibility for corrupted saves.</li>
        <li>
          Contact me via the Polished Crystal Discord server @Rev3lation if a
          code fails.
        </li>
      </ul>
    </div>
    <em>Credits: Rev3lation, Sylvie (Rangi42), Cammy, Jaidenlyons</em
    ><br /><br />

    <Select
      class="mb-3"
      v-model="selectedCheat"
      :options="cheats"
      filter
      placeholder="Select a Cheat"
    />

    <Divider />

    <div class="mt-7 mb-100 flex flex-wrap gap-5">
      <Wild class="w-full" v-if="selectedCheat === 'Wild Pokemon Modifier'" />
      <Items class="w-full" v-if="selectedCheat === 'Item Modifier'" />
      <DVs class="w-full" v-if="selectedCheat === 'DV Modifier'" />
      <EVs class="w-full" v-if="selectedCheat === 'EV Modifier'" />
      <Moves class="w-full" v-if="selectedCheat === 'Moveset Modifier'" />
      <AbilityNatureShiny class="w-full" v-if="selectedCheat === 'Ability / Nature / Shininess Modifier'" />
      <CALC_NATURES class="w-full" v-if="selectedCheat === 'Ability / Nature / Shininess Modifier'" />
      <Happiness class="w-full" v-if="selectedCheat === 'Happiness / Egg Cycle Modifier'" />
      <Money class="w-full" v-if="selectedCheat === 'Money Modifier'" />
      <TMsHMs class="w-full" v-if="selectedCheat === 'TM & HM Modifier'" />
      <Gender class="w-full" v-if="selectedCheat === 'Gender Modifier'" />
      <Coins class="w-full" v-if="selectedCheat === 'Coins Modifier'" />
      <Status class="w-full" v-if="selectedCheat === 'Status Modifier'" />
      <Level class="w-full" v-if="selectedCheat === 'Level Modifier'" />
    </div>
  </div>
</template>

<style scoped></style>
