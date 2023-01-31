<script setup lang="ts">
import { computed } from "vue";

interface Props {
  icon?: string | null;
  label?: string;
  size?: number | null;
  color?: string;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  icon: null,
  label: "label",
  size: null,
  color: "default",
  disabled: false,
});

const classColor = computed(() => {
  return props.color ? `btn-${props.color}` : "btn-default";
});
const classSize = computed(() => {
  return props.size ? `w-${props.size}` : "";
});
</script>
<template>
  <button class="btn" :class="[classColor, classSize]" :disabled="disabled">
    <em v-if="icon" :class="icon"></em>
    {{ label }}
  </button>
</template>
