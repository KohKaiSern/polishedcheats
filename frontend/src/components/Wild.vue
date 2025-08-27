<script setup>
import { ref, onMounted, watch } from 'vue'
import { Button } from 'primevue'
import { useClipboard } from '@vueuse/core'
import Card from 'primevue/card'
import Select from 'primevue/select'

const copy = ref(null)
const copied = ref(null)
const names = ref(null)
const addresses = ref(null)
const selectedPokemon = ref(null)
const selectedForm = ref(null)

//TODO: Auto-generate forms
const forms = 
{
    "Typhlosion": ["Plain", "Hisuian"],
    "Rattata": ["Plain", "Alolan"],
    "Raticate": ["Plain", "Alolan"],
    "Pichu": ["Plain", "Spiky-Eared"],
    "Pikachu": ["Plain", "Fly", "Surf", "Red", "Yellow", "Spark"],
    "Raichu": ["Plain", "Alolan"],
    "Geodude": ["Plain", "Alolan"],
    "Graveler": ["Plain", "Alolan"],
    "Golem": ["Plain", "Alolan"],
    "Sandshrew": ["Plain", "Alolan"],
    "Sandslash": ["Plain", "Alolan"],
    "Arbok": ["Plain", "Kanto", "Koga", "Agatha", "Ariana"],
    "Dudunsparce": ["Two-Segment", "Three-Segment"],
    "Wooper": ["Plain", "Paldean"],
    "Unown": [
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
        "Unown ?"
    ],
    "Magikarp": [
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
        "Raindrop"
    ],
    "Gyarados": ["Plain", "Red"],
    "Slowpoke": ["Plain", "Galarian"],
    "Slowbro": ["Plain", "Galarian"],
    "Slowking": ["Plain", "Galarian"],
    "Exeggutor": ["Plain", "Alolan"],
    "Weezing": ["Plain", "Galarian"],
    "Grimer": ["Plain", "Alolan"],
    "Muk": ["Plain", "Alolan"],
    "Voltorb": ["Plain", "Hisuian"],
    "Electrode": ["Plain", "Hisuian"],
    "Vulpix": ["Plain", "Alolan"],
    "Ninetails": ["Plain", "Alolan"],
    "Growlithe": ["Plain", "Hisuian"],
    "Arcanine": ["Plain", "Hisuian"],
    "Diglett": ["Plain", "Alolan"],
    "Dugtrio": ["Plain", "Alolan"],
    "Meowth": ["Plain", "Alolan", "Galarian"],
    "Persian": ["Plain", "Alolan"],
    "Tauros": ["Plain", "Paldean Blaze Breed", "Paldean Aqua Breed", "Paldean"],
    "Mr__mime": ["Plain", "Galarian"],
    "Farfetch_d": ["Plain", "Galarian"],
    "Qwilfish": ["Plain", "Hisuian"],
    "Corsola": ["Plain", "Galarian"],
    "Ursaluna": ["Plain", "Bloodmoon"],
    "Ponyta": ["Plain", "Galarian"],
    "Rapidash": ["Plain", "Galarian"],
    "Marowak": ["Plain", "Alolan"],
    "Sneasel": ["Plain", "Hisuian"],
    "Articuno": ["Plain", "Galarian"],
    "Zapdos": ["Plain", "Galarian"],
    "Moltres": ["Plain", "Galarian"],
    "Mewtwo": ["Plain", "Armored"]
}

const fetchNames = async () => {
  let responseAddresses = await fetch("https://polishedcheats-backend.vercel.app/api/addresses") 
  let responseNames = await fetch("https://polishedcheats-backend.vercel.app/api/names")
  names.value = await responseNames.json()
  addresses.value = await responseAddresses.json()
}

onMounted(() => {
  fetchNames();
});

//Implements Clipboard when a code exists
watch(selectedPokemon, () => {
  const clipboard = useClipboard(getPokemonCode(selectedPokemon.value, selectedForm.value));
  copy.value = clipboard.copy;
  copied.value = clipboard.copied;
});

//Resets selectedForm when selectedPokemon changes
watch(selectedPokemon, () => {
    selectedForm.value = false;
});

const getPokemonCode = (selectedPokemon, selectedForm) => {
  //Retrieve the right addresses: wTempEnemyMonSpecies, wWildMonForm
  let addressList = [addresses.value["wTempEnemyMonSpecies"], addresses.value["wWildMonForm"]];
  let cheatValueSpecies = "";
  let cheatValueForm = "01";

  //Obtain cheatValueSpecies
  cheatValueSpecies = (names.value.indexOf(selectedPokemon) + 1).toString(16);

  //For Pokemon with IDs over 255, wTempEnemyMonSpecies loops back to 01, with wWildMonForm then set to 21.
  if (parseInt(cheatValueSpecies, 16) > 255) {
    cheatValueSpecies = (parseInt(cheatValueSpecies, 16) - 255).toString(16);
    cheatValueForm = "21";
  }

  //Obtain cheatValueForm
  //Cases: Gyarados, Regional Forms, 255+ Pokemon
  //Red Gyarados
  if (selectedPokemon === "Gyarados" && selectedForm === "Red") {
    cheatValueForm = "15";
  }

  //255+ Pokemon
  else if (cheatValueForm === "21" && selectedForm) {
    cheatValueForm = (33 + forms[selectedPokemon].indexOf(selectedForm)).toString(16);
  }

  //Regional Forms
  else if (["Alolan", "Galarian", "Hisuian", "Paldean"].includes(selectedForm)) {
    cheatValueForm = (2 + ["Alolan", "Galarian", "Hisuian", "Paldean"].indexOf(selectedForm)).toString(16)
  }

  //Cosmetic Forms
  else if (selectedForm) {
    cheatValueForm = (1 + forms[selectedPokemon].indexOf(selectedForm)).toString(16);
  }

  //Pad the Values
  cheatValueSpecies = "0".repeat(2 - cheatValueSpecies.length) + cheatValueSpecies;
  cheatValueForm = "0".repeat(2 - cheatValueForm.length) + cheatValueForm;

  return ("01" + cheatValueSpecies + addressList[0] + " 01" + cheatValueForm + addressList[1]).toUpperCase();
}

</script>

<template>
  <Card>
    <template #title>Wild Pokemon <Button v-if="selectedPokemon" @click="copy(getPokemonCode(selectedPokemon, selectedForm))" :label="(copied.value ? 'Copied!' : 'Copy')" class="float-right" icon="pi pi-copy" iconPos="right" /></template>
    <template #content>
      <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mt-2 mb-5">
      <Select v-if="names" v-model="selectedPokemon" :options="names" filter placeholder="Select a Pokemon"/>
      <Select v-if="forms[selectedPokemon]" v-model="selectedForm" :options="forms[selectedPokemon]" filter placeholder="Select a Form"/>
      </div>
      <p class="mb-5" v-if="selectedPokemon">Your code for {{ selectedPokemon }} is: {{ getPokemonCode(selectedPokemon, selectedForm) }}</p>
      <p class="mb-5" v-else>Please choose a Pokemon.</p>
      <p>This code forces all Wild Encounters to be of the chosen Pokemon.<br>
        Note that this cheat causes a mild visual glitch in the battle animation. <br>
        This is temporary and expected.
      </p>
    </template>
  </Card>
</template>

<style scoped></style>
