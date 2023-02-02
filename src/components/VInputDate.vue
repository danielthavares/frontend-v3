<script setup lang="ts">
import VField from "./VField.vue";
import IMask from "imask/esm/imask";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

interface Props {
  modelValue: string | null;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  failures?: string[];
  i18n?: any;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  disabled: false,
  required: false,
  failures: () => [],
  i18n: () => {
    return {
      pattern: "DD/MM/YYYY",
      blocks: {
        YYYY: {
          mask: IMask.MaskedRange,
          from: 1900,
          to: 2999,
        },
        MM: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
        },
        DD: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
        },
      },
      format: (f: any) => f,
      parse: (p: any) => p,
    };
  },
});

const el = ref();
const mask = ref();
const emit = defineEmits<{
  (e: "update:model-value", value: string | null): void;
}>();
const local = computed(() =>
  dayjs(props.modelValue).format(props.i18n.pattern)
);
const isValid = ref(true);

watch(local, (nValue) => {
  if (nValue !== null) mask.value.value = nValue ? nValue : "";
});

function _valid(date: any) {
  return dayjs(date, props.i18n.pattern, true).isValid();
}

function _toJson(date: any) {
  return dayjs(date, props.i18n.pattern, true).toJSON();
}

function _onAccept() {
  if (!mask.value.unmaskedValue) {
    isValid.value = true;
    emit("update:model-value", null);
  }
}

function _onComplete() {
  let result = null;
  if (_valid(mask.value.value)) {
    result = _toJson(mask.value.value);
    isValid.value = true;
  } else {
    isValid.value = false;
  }
  emit("update:model-value", result);
}

function _init() {
  if (!el.value) return;

  //https://day.js.org/en/
  dayjs.extend(customParseFormat);

  mask.value = IMask(el.value, {
    mask: Date,
    pattern: props.i18n.pattern,
    lazy: false,
    format: props.i18n.format,
    parse: props.i18n.parse,
    blocks: props.i18n.blocks,
  })
    .on("complete", _onComplete)
    .on("accept", _onAccept);

  mask.value.value = local.value ? local.value : "";
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
      :class="{ 'is-invalid': failures.length > 0 || !isValid }"
      :disabled="disabled"
    />
  </v-field>
</template>
