<script setup>
import { ref, onMounted, watch } from "vue";
import { useClipboard } from "@vueuse/core";
import Card from "primevue/card";
import Select from "primevue/select";
import Button from "primevue/button";

const copy = ref(null);
const copied = ref(null);
const addresses = ref(null);
const names = ref(null);
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
  "Mr. Mime": ["Plain", "Galarian"],
  "Farfetch'd": ["Plain", "Galarian"],
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

//Parse items into an array of [items] for Select to loop over
const getNameList = () => {
  return names.value.map((name) => {
    return Object.keys(name)[0];
  });
};

//Resets selectedForm when selectedPokemon changes
watch(selectedPokemon, () => {
  selectedForm.value = null;
});

//Implements clipboard when a code exists
watch([selectedPokemon, selectedForm], () => {
  if (
    selectedPokemon.value &&
    (selectedForm.value || !forms.hasOwnProperty(selectedPokemon.value))
  ) {
    const clipboard = useClipboard(
      getPokemonCode(
        selectedPokemon.value,
        selectedForm.value
      )
    );
    copy.value = clipboard.copy;
    copied.value = clipboard.copied;
  }
});

//Code generator
const getPokemonCode = (selectedPokemon, selectedForm) => {
  //Retrieve the right addresses: wTempEnemyMonSpecies, wWildMonForm
  let addressList = [
    addresses.value["wTempEnemyMonSpecies"],
    addresses.value["wWildMonForm"],
  ];
  //Obtain cheatValueSpecies
  let cheatValueSpecies = getNameList().indexOf(selectedPokemon) + 1;

  //Wild Encounters are determined by two memory addresses - wTempEnemyMonSpecies & wWildMonForm
  //wTempEnemyMonSpecies:
  //8-bits, goes from Pokemon 01 - Bulbasaur to 255 - Egg
  //256 and above loops back to 01 and switches on x in wWildMonForm
  //
  //wWildMonForm:
  //8-bits, in the structure abxccccc
  //x - 9th-bit species index - set to 1 if Pokemon is 256+
  //a - gender - set to 0 for male, 1 for female
  //b - isEgg - set to 0
  //c - form
  //Form is set by 5-bits.
  //Form generally counts up in a numerical order, with the exception of:
  //A. Regional Forms:
  //02 - Alolan
  //03 - Galarian
  //04 - Hisuian
  //05 - Paldean
  //B. Red Gyarados
  //15 - Red Gyarados

  let genderValue = "0" //For some reason, toggling this doesn't guarantee M/F
  let isEggValue = "0"; //isEgg
  let speciesExtValue = "0"; //9th Bit
  let formValue = 1; //Form

  //Handling for 256+ Pokemon
  if (cheatValueSpecies > 255) {
    cheatValueSpecies -= 255;
    speciesExtValue = "1"; //Switch 9th Bit to 1
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

  //Put it all together
  let cheatValueForm = parseInt(
    genderValue + isEggValue + speciesExtValue + formValue,
    2
  ).toString(16);

  cheatValueSpecies = cheatValueSpecies.toString(16);

  //Pad the values
  cheatValueSpecies =
    "0".repeat(2 - cheatValueSpecies.length) + cheatValueSpecies;
  cheatValueForm = "0".repeat(2 - cheatValueForm.length) + cheatValueForm;

  return (
    "01" +
    cheatValueSpecies +
    addressList[0] +
    " 01" +
    cheatValueForm +
    addressList[1]
  ).toUpperCase();
};
</script>

<template>
  <Card v-if="names && addresses">
    <template #title>
      <div class="flex flex-wrap justify-between gap-5">
        <span>Wild Pokemon</span>
        <Button
          v-if="
            selectedPokemon &&
            (selectedForm || !forms.hasOwnProperty(selectedPokemon))
          "
          @click="
            copy(getPokemonCode(selectedPokemon, selectedForm))
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
          :options="getNameList()"
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
      </div>
      <p
        class="mb-5"
        v-if="
          selectedPokemon &&
          (selectedForm || !forms.hasOwnProperty(selectedPokemon))
        "
      >
        Your code for {{ selectedPokemon }} is:
        {{ getPokemonCode(selectedPokemon, selectedForm) }}
      </p>
      <p class="mb-5" v-else>
        Please choose a Pokemon species and form.
      </p>
      <p>
        This code forces all Wild Encounters to be of the chosen Pokemon.<br />
        Note that this cheat causes a mild visual glitch in the battle
        animation. <br />
        This is temporary and expected.
      </p>
    </template>
  </Card>
</template>

<style scoped></style>
