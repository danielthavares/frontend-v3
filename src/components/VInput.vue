<script setup lang="ts">
import VField from "./VField.vue";

interface Props {
  modelValue: string | null;
  maxlength?: number;
  disabled?: boolean;
  password?: boolean;
  label?: string;
  required?: boolean;
  failures?: Array<string>;
}

withDefaults(defineProps<Props>(), {
  modelValue: null,
  maxlength: 50,
  disabled: false,
  required: false,
  password: false,
  failures: () => [],
});

const emit = defineEmits<{
  (e: "update:model-value", value: string): void;
}>();

function _onInput(e: Event) {
  emit("update:model-value", (e.target as HTMLInputElement).value);
}
</script>
<template>
  <v-field :label="label" :required="required" :failures="failures">
    <input
      class="form-control form-control-sm"
      :class="{ 'is-invalid': failures.length > 0 }"
      :value="modelValue"
      :type="password ? 'password' : 'text'"
      :maxlength="maxlength"
      :disabled="disabled"
      @input="_onInput"
    />
  </v-field>
</template>
