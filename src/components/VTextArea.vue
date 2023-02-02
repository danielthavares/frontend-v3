<script setup lang="ts">
import VField from "./VField.vue";

interface Props {
  modelValue: any;
  label?: string;
  cols?: number;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  failures?: string[];
}

withDefaults(defineProps<Props>(), {
  modelValue: null,
  cols: 10,
  rows: 5,
  disabled: false,
  required: false,
  failures: () => [],
});

const emit = defineEmits<{
  (e: "update:model-value", value: string | null): void;
}>();

function _onInput(e: Event) {
  let vl = (e.target as HTMLInputElement).value;
  emit("update:model-value", vl ? vl : null);
}
</script>
<template>
  <v-field :label="label" :required="required" :failures="failures">
    <textarea
      class="form-control form-control-sm"
      :class="{ 'is-invalid': failures.length > 0 }"
      :value="modelValue"
      :disabled="disabled"
      :rows="rows"
      :cols="cols"
      @input="_onInput"
    />
  </v-field>
</template>
