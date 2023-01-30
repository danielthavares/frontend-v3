<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import VField from "./VField.vue";

interface Props {
  modelValue: any;
  options: Array<any>;
  inline?: boolean;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  failures?: Array<string>;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  options: () => [],
  inline: false,
  disabled: false,
  required: false,
  failures: () => [],
});

const name = ref();

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

onMounted(() => {
  name.value = `rb_${Math.random().toString().replace(".", "_")}`;
});
</script>
<template>
  <v-field :label="label" :required="required" :failures="failures">
    <div
      v-for="(o, index) in options"
      :key="index"
      class="form-check"
      :class="{
        disabled: o['disabled'] === true,
        'form-check-inline': inline === true,
      }"
    >
      <input
        v-model="model"
        class="form-check-input"
        :class="{ 'is-invalid': failures.length > 0, 'ms-0': inline === true }"
        type="radio"
        :value="o.value"
        :disabled="disabled || o['disabled'] === true"
        :name="name"
      />
      <label class="form-check-label">
        {{ o.label }}
      </label>
    </div>
  </v-field>
</template>
