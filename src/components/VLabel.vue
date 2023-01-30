<script setup lang="ts">
defineProps<{
  label?: string;
  required?: boolean;
}>();
</script>
<template>
  <label class="form-label fw-bold">
    <span v-if="required" class="text-danger">*</span>{{ label }}
  </label>
</template>
