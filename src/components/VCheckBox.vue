<script setup lang="ts">
import { computed } from "vue";
import VField from "./VField.vue";

interface Props {
  modelValue: any;
  description: string;
  inline?: boolean;
  onSwitch?: boolean;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  failures?: Array<string>;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  description: "description",
  inline: false,
  onSwitch: false,
  disabled: false,
  required: false,
  failures: () => [],
});

const emit = defineEmits<{
  (e: "update:model-value", value: boolean | null): void;
}>();

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:model-value", value);
  },
});
</script>
<template>
  <v-field :label="label" :required="required" :failures="failures">
    <div
      class="form-check"
      :class="{
        disabled: disabled,
        'form-check-inline': inline === true,
        'form-switch': onSwitch === true,
      }"
    >
      <input
        v-model="model"
        type="checkbox"
        class="form-check-input"
        :class="{ 'is-invalid': failures.length > 0, 'ms-0': inline === true }"
        :disabled="disabled"
      />
      <label class="form-check-label">
        {{ description }}
      </label>
    </div>
  </v-field>
</template>
