<script setup>
import { ref, onMounted, watch } from "vue";
import { useClipboard } from "@vueuse/core";
import Card from "primevue/card";
import InputNumber from "primevue/inputnumber";
import IftaLabel from "primevue/iftalabel";
import Button from "primevue/button";

const copy = ref(null);
const copied = ref(false);
const addresses = ref(null);
const selectedEVs = ref([252, 252, 252, 252, 252, 252]);

//GET from API
const fetchAddresses = async () => {
  let responseAddresses = await fetch(
    "https://polishedcheats-backend.vercel.app/api/addresses"
  );
  addresses.value = await responseAddresses.json();
};

onMounted(() => {
  fetchAddresses();
});

//Implements clipboard when a code exists
watch(addresses, () => {
  const clipboard = useClipboard(getEVCode(selectedEVs.value));
  copy.value = clipboard.copy;
  copied.value = clipboard.copied;
});

//Code generator
const getEVCode = (selectedEVs) => {
  //Retrieve the right addresses
  let addressList = [
    addresses.value["wPartyMon1HPEV"],
    addresses.value["wPartyMon1AtkEV"],
    addresses.value["wPartyMon1DefEV"],
    addresses.value["wPartyMon1SpeEV"],
    addresses.value["wPartyMon1SatEV"],
    addresses.value["wPartyMon1SdfEV"],
  ];

  //Convert EVs to Hex (validation performed by PrimeVue component)
  selectedEVs = selectedEVs.map((ev) => {
    ev = ev.toString(16);
    return "0".repeat(2 - ev.length) + ev;
  });

  //Generate cheat code
  let cheat = "";
  for (let i = 0; i < 6; i++) {
    cheat += " 01" + selectedEVs[i] + addressList[i];
  }
  //Slice off the first empty space
  return cheat.slice(1).toUpperCase();
};
</script>

<template>
  <Card v-if="addresses">
    <template #title>
      <div class="flex flex-wrap justify-between gap-5">
        <span>Effort Values</span>
        <Button
          @click="copy(getEVCode(selectedEVs))"
          :label="copied.value ? 'Copied!' : 'Copy'"
          icon="pi pi-copy"
          iconPos="right"
        />
      </div>
    </template>
    <template #content>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2 mb-6"
      >
        <IftaLabel>
          <InputNumber
            v-model="selectedEVs[0]"
            inputId="hp"
            showButtons
            :min="0"
            :max="252"
            fluid
          />
          <label for="hp">HP</label>
        </IftaLabel>
        <IftaLabel>
          <InputNumber
            v-model="selectedEVs[1]"
            inputId="atk"
            showButtons
            :min="0"
            :max="252"
            fluid
          />
          <label for="atk">Attack</label>
        </IftaLabel>
        <IftaLabel>
          <InputNumber
            v-model="selectedEVs[2]"
            inputId="def"
            showButtons
            :min="0"
            :max="252"
            fluid
          />
          <label for="def">Defense</label>
        </IftaLabel>
        <IftaLabel>
          <InputNumber
            v-model="selectedEVs[3]"
            inputId="spe"
            showButtons
            :min="0"
            :max="252"
            fluid
          />
          <label for="spe">Speed</label>
        </IftaLabel>
        <IftaLabel>
          <InputNumber
            v-model="selectedEVs[4]"
            inputId="sat"
            showButtons
            :min="0"
            :max="252"
            fluid
          />
          <label for="sat">Special Attack</label>
        </IftaLabel>
        <IftaLabel>
          <InputNumber
            v-model="selectedEVs[5]"
            inputId="sdf"
            showButtons
            :min="0"
            :max="252"
            fluid
          />
          <label for="sdf">Special Defense</label>
        </IftaLabel>
      </div>
      <p class="mb-5">
        Your code for the Effort Values is: {{ getEVCode(selectedEVs) }}
      </p>
      <p>
        This code modifies the Effort Values of the first Pokemon in your party.
        <br />
        If you have EVs turned off in your save settings, this will only
        determine whether your Pokemon can be hyper trained. <br />
        If you have EVs set to 510 and you have more than 510 EVs, the game will
        automatically decrease the EVs evenly until it hits 510. <br />
        If you have EVs set to All, the codes will work perfectly. <br />
        Should you wish to change the EVs of the other Pokemon in your party,
        simply swap the party order to place them first.
      </p>
    </template>
  </Card>
</template>

<style scoped></style>
