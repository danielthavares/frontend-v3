<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import VField from "./VField.vue";
import IMask from "imask";

interface Props {
  modelValue: string | number | null;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  failures?: Array<string>;
  scale?: number;
  signed?: boolean;
  padFractionalZeros?: boolean;
  normalizeZeros?: boolean;
  radix?: string;
  mapToRadix?: Array<string>;
  min?: number | null;
  max?: number | null;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  disabled: false,
  required: false,
  failures: () => [],
  scale: 0,
  signed: false,
  padFractionalZeros: false,
  normalizeZeros: false,
  radix: ",",
  mapToRadix: () => ["."],
  min: null,
  max: null,
});

const el = ref();
const mask = ref();
const emit = defineEmits(["update:model-value"]);

const local = computed(() => props.modelValue);

watch(local, (nValue) => {
  mask.value.value = String(nValue);
});

function _onComplete() {
  emit(
    "update:model-value",
    mask.value.unmaskedValue ? Number(mask.value.unmaskedValue) : null
  );
}

function _init() {
  if (!el.value) return;

  //https://imask.js.org/guide.html#masked-number
  mask.value = IMask(el.value, {
    mask: Number,
    scale: props.scale,
    signed: props.signed,
    thousandsSeparator: "",
    padFractionalZeros: props.padFractionalZeros,
    normalizeZeros: props.normalizeZeros,
    radix: props.radix,
    mapToRadix: props.mapToRadix,
    min: props.min,
    max: props.max,
  }).on("complete", _onComplete);

  mask.value.value = String(local.value);
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
