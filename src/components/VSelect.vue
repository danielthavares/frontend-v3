<script setup lang="ts">
import { computed } from "vue";
import VField from "./VField.vue";

interface Props {
  modelValue: any;
  valueNoSelected: any;
  msgNoSelected?: string;
  options: Array<any>;
  valueId?: string;
  description?: string;
  single?: boolean;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  failures?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  valueNoSelected: null,
  msgNoSelected: "Selecione...",
  options: () => [],
  valueId: "value",
  description: "description",
  single: true,
  disabled: false,
  required: false,
  failures: () => [],
});

const emit = defineEmits<{
  (e: "update:model-value", value: string | null): void;
}>();

function _change(value: any) {
  let changeValue =
    props.single === true
      ? value
      : props.options.find((x) => x[props.valueId] === value);

  if (!changeValue) {
    if (props.single === true) {
      changeValue = value;
    } else {
      const obj = {};

      Object.defineProperty(obj, props.valueId, {
        value: props.valueNoSelected,
      });

      Object.defineProperty(obj, props.description, {
        value: props.msgNoSelected,
      });

      changeValue = obj;
    }
  }

  emit("update:model-value", changeValue);
}

const local = computed({
  get() {
    return props.single === true
      ? props.modelValue
      : props.modelValue[props.valueId];
  },
  set(nValue) {
    _change(nValue);
  },
});
</script>
<template>
  <v-field :label="label" :required="required" :failures="failures">
    <select
      v-model="local"
      class="form-select form-select-sm"
      :class="{ 'is-invalid': failures.length > 0 }"
      :disabled="disabled"
    >
      <option :value="valueNoSelected">{{ msgNoSelected }}</option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option[valueId]"
      >
        {{ option[description] }}
      </option>
    </select>
  </v-field>
</template>
