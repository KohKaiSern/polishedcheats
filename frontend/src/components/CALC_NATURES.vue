<script setup>
import { ref } from "vue";
import Card from "primevue/card";
import Select from "primevue/select";
import IftaLabel from "primevue/iftalabel";

const stats = [
  "Attack",
  "Defense",
  "Speed",
  "Special Attack",
  "Special Defense",
];
const natures = [
  "Hardy",
  "Lonely",
  "Brave",
  "Adamant",
  "Naughty",
  "Bold",
  "Docile",
  "Relaxed",
  "Impish",
  "Lax",
  "Timid",
  "Hasty",
  "Serious",
  "Jolly",
  "Naive",
  "Modest",
  "Mild",
  "Quiet",
  "Bashful",
  "Rash",
  "Calm",
  "Gentle",
  "Sassy",
  "Careful",
  "Quirky",
];
const selectedStats = ref([null, null]);

const calculateNature = (selectedStats) => {
  return natures[
    parseInt(
      (
        stats.indexOf(selectedStats[0]).toString() +
        stats.indexOf(selectedStats[1])
      ).toString(),
      5
    )
  ];
};
</script>

<template>
  <Card>
    <template #title>Nature Calculator</template>
    <template #content>
      <div
        class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mt-3 mb-5"
      >
        <IftaLabel>
          <Select
            inputId="up"
            v-model="selectedStats[0]"
            :options="stats"
            fluid
          />
          <label for="up">Increased Stat</label>
        </IftaLabel>
        <IftaLabel>
          <Select
            inputId="down"
            v-model="selectedStats[1]"
            :options="stats"
            fluid
          />
          <label for="down">Decreased Stat</label>
        </IftaLabel>
      </div>
      <p v-if="selectedStats[0] && selectedStats[1]">
        Your desired nature is: {{ calculateNature(selectedStats) }}
      </p>
      <p v-else>Choose a stat to increase and a stat to decrease.</p>
      <p>
        This calculator is intended to be used as a supplement to the Ability /
        Nature / Shininess Modifier.
      </p>
    </template>
  </Card>
</template>
