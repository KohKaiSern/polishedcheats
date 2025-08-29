<script setup>
import { ref, onMounted, watch } from "vue";
import { useClipboard } from "@vueuse/core";
import Card from "primevue/card";
import Select from "primevue/select";
import Button from "primevue/button";

const copy = ref(null);
const copied = ref(null);
const addresses = ref(null);
const statuses = [
  "No Status",
  "Sleep",
  "Poison",
  "Burn",
  "Freeze",
  "Paralysis",
];
const selectedStatus = ref(null);

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
watch(selectedStatus, () => {
  const clipboard = useClipboard(getStatusCode(selectedStatus.value));
  copy.value = clipboard.copy;
  copied.value = clipboard.copied;
});

//Code generator
const getStatusCode = (selectedStatus) => {
  //Retrieve the right address
  let address = addresses.value["wPartyMon1Status"];

  //Status is a 8-bit binary value
  // 0000 0000 - No Status
  // 0000 0100 - Sleep
  // 0000 1000 - Poisoned
  // 0001 0000 -  Burn
  // 0010 0000 - Freeze
  // 0100 0000 - Paralysis
  // 1000 0000 - Toxic (DO NOT SUPPORT - DOES NOT WORK AS INTENDED)

  let cheatValue = "00000000";
  if (selectedStatus != "No Status") {
    cheatValue =
      cheatValue.slice(0, 6 - statuses.indexOf(selectedStatus)) +
      "1" +
      cheatValue.slice(7 - statuses.indexOf(selectedStatus));
  }

  //Convert to Hex
  cheatValue = parseInt(cheatValue, 2).toString(16);
  cheatValue = "0".repeat(2 - cheatValue.length) + cheatValue;

  return ("01" + cheatValue + address).toUpperCase();
};
</script>

<template>
  <Card v-if="addresses">
    <template #title>
      <div class="flex flex-wrap justify-between gap-5">
        <span>Status</span>
        <Button
          v-if="selectedStatus"
          @click="copy(getStatusCode(selectedStatus))"
          :label="copied.value ? 'Copied!' : 'Copy'"
          icon="pi pi-copy"
          iconPos="right"
        />
      </div>
    </template>
    <template #content>
      <Select
        class="mt-2 mb-5"
        v-model="selectedStatus"
        :options="statuses"
        filter
        placeholder="Select a Status"
      />
      <p class="mb-5" v-if="selectedStatus">
        Your code for giving your Pokemon the {{ selectedStatus }} status is:
        {{ getStatusCode(selectedStatus) }}
      </p>
      <p class="mb-5" v-else>Please choose a status.</p>
      <p>
        This code modifies the non-volatile status condition of the first
        Pokemon in your party.
        <br />
        The purpose of this code is giving Pokemon with abilities like Guts or
        Poison Heal status conditions before battles so that they can hold
        things other than Flame and Toxic Orbs. <br />
        Should you wish to change the non-volatile statuses of the other Pokemon
        in your party, simply swap the party order to place them first.
      </p>
    </template>
  </Card>
</template>

<style scoped></style>
