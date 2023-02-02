<script setup lang="ts">
import VLabel from "./VLabel.vue";
import VFailures from "./VFailures.vue";

export interface Props {
  label?: string;
  required?: boolean;
  failures?: string[];
}
withDefaults(defineProps<Props>(), {
  failures: () => [],
});
</script>
<template>
  <div class="mb-3">
    <v-label :label="label" :required="required" />
    <slot></slot>
    <v-failures :failures="failures" />
  </div>
</template>
