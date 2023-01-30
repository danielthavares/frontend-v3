<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import VField from "./VField.vue";
import IMask from "imask/esm/imask";

interface Props {
  modelValue: string | null;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  failures?: Array<string>;
  pattern?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  disabled: false,
  require: false,
  failures: () => [],
  pattern: "00000",
});

const el = ref();
const mask = ref();
const emit = defineEmits<{
  (e: "update:model-value", value: string | null): void;
}>();
const local = computed(() => props.modelValue);

watch(local, (nValue) => {
  mask.value.value = nValue;
});

function _update() {
  emit("update:model-value", mask.value.unmaskedValue);
}

function _init() {
  if (!el.value) return;

  mask.value = IMask(el.value, {
    mask: props.pattern,
    lazy: false,
  })
    .on("accept", _update)
    .on("complete", _update);

  if (local.value !== null) mask.value.value = local.value;
}

function _destroy() {
  if (mask.value) {
    mask.value.destroy();
    mask.value = null;
  }
}

onMounted(_init);
onUnmounted(_destroy);
</script>
<template>
  <v-field :label="label" :required="required" :failures="failures">
    <input
      ref="el"
      class="form-control form-control-sm"
      :class="{ 'is-invalid': failures.length > 0 }"
      :disabled="disabled"
    />
  </v-field>
</template>
