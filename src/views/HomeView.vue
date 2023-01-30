<script setup lang="ts">
import VInput from "@/components/VInput.vue";
import VInputDate from "@/components/VInputDate.vue";
import VInputMask from "@/components/VInputMask.vue";

import { ref } from "vue";

const inputModel = ref<string | null>(null);
const inputDateModel = ref<string | null>(null);
const inputMaskModel = ref<string | null>(null);
const errors = {
  with: ["erro 1", "erro 2"],
  without: [],
};
</script>

<template>
  <div class="container">
    <p>home</p>
    <v-input v-model="inputModel" label="Input" :failures="errors['with']" />
    <v-input-date v-model="inputDateModel" label="Input Date" />
    <v-input-mask
      v-model="inputMaskModel"
      label=" Input Mask"
      pattern="(00)000000000"
    />
    <pre>
      {{ inputModel }}
      {{ inputDateModel }}
      {{ inputMaskModel }}
    </pre>
  </div>
</template>
