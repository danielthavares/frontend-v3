<script setup lang="ts">
import VInput from "@/components/VInput.vue";
import VInputDate from "@/components/VInputDate.vue";
import { ref } from "vue";

const inputModel = ref<string>();
const inputDateModel = ref<string | null>(null);
const errors = {
  com: ["erro 1", "erro 2"],
  sem: [],
};
</script>

<template>
  <div class="container">
    <p>home</p>
    <v-input v-model="inputModel" label="Input" :failures="errors['com']" />
    <v-input-date v-model="inputDateModel" label="Input Date" />
    <pre>
      {{ inputModel }}
      {{ inputDateModel }}
    </pre>
  </div>
</template>
