<script setup>
import { ref, onMounted, watch } from "vue";
import { useClipboard } from "@vueuse/core";
import { addressExtend } from "../lib/addressExtend.js";
import Card from "primevue/card";
import Select from "primevue/select";
import InputNumber from "primevue/inputnumber";
import IftaLabel from "primevue/iftalabel";
import Button from "primevue/button";

const copy = ref(null);
const copied = ref(null);
const addresses = ref(null);
const names = ref(null);
const growthRates = ref(null);
const selectedPokemon = ref(null);
const selectedLevel = ref(50);

//GET from API
const fetchAddresses = async () => {
  let responseAddresses = await fetch(
    "https://polishedcheats-backend.vercel.app/api/addresses"
  );
  let responseCoefficients = await fetch(
    "https://polishedcheats-backend.vercel.app/api/growthrates"
  );
  let responseNames = await fetch(
    "https://polishedcheats-backend.vercel.app/api/names"
  );
  addresses.value = await responseAddresses.json();
  growthRates.value = await responseCoefficients.json();
  names.value = await responseNames.json();
};

onMounted(() => {
  fetchAddresses();
});

//Parse items into an array of [items] for Select to loop over
const getNameList = () => {
  return names.value.map((name) => {
    return Object.keys(name)[0];
  });
};

//Implements clipboard when a code exists
watch(selectedPokemon, () => {
  const clipboard = useClipboard(
    getLevelCode(selectedPokemon.value, selectedLevel.value)
  );
  copy.value = clipboard.copy;
  copied.value = clipboard.copied;
});

//Code generator
const getLevelCode = (selectedPokemon, selectedLevel) => {
  //Retrieve the right address
  let addressList = [
    addresses.value["wPartyMon1Level"],
    addressExtend(addresses.value["wPartyMon1Exp"], 3),
  ];

  //Level is determined by two addresses - wPartyMon1Level & wPartyMon1Exp
  //IF THESE TWO DON'T MATCH, THE SAVE WILL GO HAYWIRE

  //Get growth rate
  let growthRate = "";
  names.value.forEach((name) => {
    if (name.hasOwnProperty(selectedPokemon)) {
      growthRate = name[selectedPokemon];
    }
  });

  //Get coefficients
  let coefficients = growthRates.value[growthRate];

  //Calculate exp at level
  //Formula:
  //floor[(a/b)*n**3 + c*n**2 + d*n - e]

  let exp = Math.floor(
    (coefficients[0] / coefficients[1]) * selectedLevel ** 3 +
      coefficients[2] * selectedLevel -
      coefficients[3]
  ).toString(16);

  //Pad values
  exp = "0".repeat(6 - exp.length) + exp;
  selectedLevel = selectedLevel.toString(16);
  selectedLevel = "0".repeat(2 - selectedLevel.length) + selectedLevel;

  //Put it all together
  return (
    "01" +
    selectedLevel +
    addressList[0] +
    " 01" +
    exp.slice(0, 2) +
    addressList[1][0] +
    " 01" +
    exp.slice(2, 4) +
    addressList[1][1] +
    " 01" +
    exp.slice(4) +
    addressList[1][2]
  ).toUpperCase();
};
</script>

<template>
  <Card v-if="addresses && names && growthRates">
    <template #title>
      <div class="flex flex-wrap justify-between gap-5">
        <span>Level</span>
        <Button
          v-if="selectedPokemon"
          @click="copy(getLevelCode(selectedPokemon, selectedLevel))"
          :label="copied.value ? 'Copied!' : 'Copy'"
          icon="pi pi-copy"
          iconPos="right"
        />
      </div>
    </template>
    <template #content>
      <IftaLabel>
        <InputNumber
          class="mt-2 mb-2"
          v-model="selectedLevel"
          inputId="level"
          showButtons
          :min="1"
          :max="100"
          fluid
        />
        <label class="mt-2" for="level">Level</label>
      </IftaLabel>
      <Select
        class="mb-5"
        v-model="selectedPokemon"
        :options="getNameList()"
        filter
        placeholder="Select a Pokemon"
      />
      <p v-if="selectedPokemon" class="mb-5">
        Your code for a Level {{ selectedLevel }} {{ selectedPokemon }} is:
        {{ getLevelCode(selectedPokemon, selectedLevel) }}
      </p>
      <p v-else>Please select a Pokemon and a level.</p>
      <p>
        This code modifies the level of the first Pokemon in your party.
        <br />
        This code is intended for Nuzlocke players, to avoid overleveling their
        Pokemon.
        <br />
        Should you wish to change the levels of the other Pokemon in your party,
        simply swap the party order to place them first.
      </p>
    </template>
  </Card>
</template>

<style scoped></style>
