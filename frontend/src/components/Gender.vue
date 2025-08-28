<script setup>
import { ref, onMounted, watch } from "vue";
import { useClipboard } from "@vueuse/core";
import Card from "primevue/card";
import Select from "primevue/select";
import Button from "primevue/button";

const addresses = ref(null);
const names = ref(null);
const copy = ref(null);
const copied = ref(null);
const selectedGender = ref(null);
const selectedPokemon = ref(null);
const selectedForm = ref(null);

//TODO: Auto-generate forms
const forms = {
  Typhlosion: ["Plain", "Hisuian"],
  Rattata: ["Plain", "Alolan"],
  Raticate: ["Plain", "Alolan"],
  Pichu: ["Plain", "Spiky-Eared"],
  Pikachu: ["Plain", "Fly", "Surf", "Red", "Yellow", "Spark"],
  Raichu: ["Plain", "Alolan"],
  Geodude: ["Plain", "Alolan"],
  Graveler: ["Plain", "Alolan"],
  Golem: ["Plain", "Alolan"],
  Sandshrew: ["Plain", "Alolan"],
  Sandslash: ["Plain", "Alolan"],
  Arbok: ["Plain", "Kanto", "Koga", "Agatha", "Ariana"],
  Dudunsparce: ["Two-Segment", "Three-Segment"],
  Wooper: ["Plain", "Paldean"],
  Unown: [
    "Unown A",
    "Unown B",
    "Unown C",
    "Unown D",
    "Unown E",
    "Unown F",
    "Unown G",
    "Unown H",
    "Unown I",
    "Unown J",
    "Unown K",
    "Unown L",
    "Unown M",
    "Unown N",
    "Unown O",
    "Unown P",
    "Unown Q",
    "Unown R",
    "Unown S",
    "Unown T",
    "Unown U",
    "Unown V",
    "Unown W",
    "Unown X",
    "Unown Y",
    "Unown Z",
    "Unown !",
    "Unown ?",
  ],
  Magikarp: [
    "Plain",
    "Skelly",
    "Calico 1",
    "Calico 2",
    "Calico 3",
    "Two-Tone",
    "Orca",
    "Dapples",
    "Tiger",
    "Zebra",
    "Stripe",
    "Bubbles",
    "Diamonds",
    "Patches",
    "Forehead 1",
    "Mask 1",
    "Forehead 2",
    "Mask 2",
    "Saucy",
    "Raindrop",
  ],
  Gyarados: ["Plain", "Red"],
  Slowpoke: ["Plain", "Galarian"],
  Slowbro: ["Plain", "Galarian"],
  Slowking: ["Plain", "Galarian"],
  Exeggutor: ["Plain", "Alolan"],
  Weezing: ["Plain", "Galarian"],
  Grimer: ["Plain", "Alolan"],
  Muk: ["Plain", "Alolan"],
  Voltorb: ["Plain", "Hisuian"],
  Electrode: ["Plain", "Hisuian"],
  Vulpix: ["Plain", "Alolan"],
  Ninetails: ["Plain", "Alolan"],
  Growlithe: ["Plain", "Hisuian"],
  Arcanine: ["Plain", "Hisuian"],
  Diglett: ["Plain", "Alolan"],
  Dugtrio: ["Plain", "Alolan"],
  Meowth: ["Plain", "Alolan", "Galarian"],
  Persian: ["Plain", "Alolan"],
  Tauros: ["Plain", "Paldean Blaze Breed", "Paldean Aqua Breed", "Paldean"],
  Mr__mime: ["Plain", "Galarian"],
  Farfetch_d: ["Plain", "Galarian"],
  Qwilfish: ["Plain", "Hisuian"],
  Corsola: ["Plain", "Galarian"],
  Ursaluna: ["Plain", "Bloodmoon"],
  Ponyta: ["Plain", "Galarian"],
  Rapidash: ["Plain", "Galarian"],
  Marowak: ["Plain", "Alolan"],
  Sneasel: ["Plain", "Hisuian"],
  Articuno: ["Plain", "Galarian"],
  Zapdos: ["Plain", "Galarian"],
  Moltres: ["Plain", "Galarian"],
  Mewtwo: ["Plain", "Armored"],
};

//GET from API
const fetchNames = async () => {
  let responseAddresses = await fetch(
    "https://polishedcheats-backend.vercel.app/api/addresses"
  );
  let responseNames = await fetch(
    "https://polishedcheats-backend.vercel.app/api/names"
  );
  names.value = await responseNames.json();
  addresses.value = await responseAddresses.json();
};

onMounted(() => {
  fetchNames();
});

//Resets selectedForm when selectedPokemon changes
watch(selectedPokemon, () => {
  selectedForm.value = null;
});

//Implements clipboard when a code exists
watch([selectedPokemon, selectedGender, selectedForm], () => {
  if (
    selectedGender.value &&
    selectedPokemon.value &&
    (selectedForm.value || !forms.hasOwnProperty(selectedPokemon.value))
  ) {
    const clipboard = useClipboard(
      getGenderCode(
        selectedGender.value,
        selectedPokemon.value,
        selectedForm.value
      )
    );
    copy.value = clipboard.copy;
    copied.value = clipboard.copied;
  }
});

//Code generator
const getGenderCode = (selectedGender, selectedPokemon, selectedForm) => {
  //Retrieve the right address
  let address = addresses.value["wPartyMon1Gender"];

  //Gender is one part of an 8-bit address abxccccc
  //x - 9th-bit species index - set to 1 if Pokemon is 256+
  //a - gender - set to 0 for male, 1 for female
  //b - isEgg - set to 0
  //c - form - set to 01 for default, etc. (see Wild.vue for specifics)

  //That is to say, to set the gender accurately,
  //it is necessary for the user to select
  //Gender, Species and Form

  let genderValue = selectedGender === "Male" ? "0" : "1";
  let isEggValue = "0";
  let speciesExtValue = "0";
  let formValue = 1;

  //Handling for 256+ Pokemon
  if (names.value.indexOf(selectedPokemon) > 254) {
    speciesExtValue = "1";
  }

  //Form Handling
  //Cases: Gyarados, Regional Forms
  //Red Gyarados
  if (selectedPokemon === "Gyarados" && selectedForm === "Red") {
    formValue = 21;
  }
  //Regional Forms
  else if (
    ["Alolan", "Galarian", "Hisuian", "Paldean"].includes(selectedForm)
  ) {
    formValue =
      2 + ["Alolan", "Galarian", "Hisuian", "Paldean"].indexOf(selectedForm);
  }
  //Other Forms
  else if (selectedForm) {
    formValue += forms[selectedPokemon].indexOf(selectedForm);
  }

  formValue = formValue.toString(2);
  formValue = "0".repeat(5 - formValue.length) + formValue;

  let cheatValue = parseInt(
    genderValue + isEggValue + speciesExtValue + formValue,
    2
  ).toString(16);

  return ("01" + cheatValue + address).toUpperCase();
};
</script>

<template>
  <Card v-if="addresses">
    <template #title>
      <div class="flex flex-wrap justify-between gap-5">
        <span>Gender</span>
        <Button
          v-if="
            selectedGender &&
            selectedPokemon &&
            (selectedForm || !forms.hasOwnProperty(selectedPokemon))
          "
          @click="
            copy(getGenderCode(selectedGender, selectedPokemon, selectedForm))
          "
          :label="copied.value ? 'Copied!' : 'Copy'"
          icon="pi pi-copy"
          iconPos="right"
        />
      </div>
    </template>
    <template #content>
      <div
        class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 mt-2 mb-5"
      >
        <Select
          v-model="selectedPokemon"
          :options="names"
          filter
          placeholder="Select a Pokemon"
        />
        <Select
          v-if="forms.hasOwnProperty(selectedPokemon)"
          v-model="selectedForm"
          :options="forms[selectedPokemon]"
          filter
          placeholder="Select a Form"
        />
        <Select v-else disabled placeholder="No form available" />
        <Select
          v-model="selectedGender"
          :options="['Male', 'Female']"
          placeholder="Select a Gender"
        />
      </div>
      <p
        class="mb-3"
        v-if="
          selectedGender &&
          selectedPokemon &&
          (selectedForm || !forms.hasOwnProperty(selectedPokemon))
        "
      >
        Your code for this gender is:
        {{ getGenderCode(selectedGender, selectedPokemon, selectedForm) }}
      </p>
      <p class="mb-3" v-else>
        Please choose a Pokemon species, form and gender.
      </p>
      <p>
        This code modifies the Gender of the first Pokemon in your party. <br />
        Note that this code has no effect on genderless Pokemon. <br />
        It is necessary to select a Pokemon species and form due to the way
        gender is stored. <br />
        Should you wish to change the Genders of the other Pokemon in your
        party, simply swap the party order to place them first.
      </p>
    </template>
  </Card>
</template>

<style scoped></style>
