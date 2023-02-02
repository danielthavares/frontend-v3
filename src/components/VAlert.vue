<script setup lang="ts">
import { computed, watch, ref, onUnmounted } from "vue";

interface Props {
  message: string | Array<string> | null;
  show: boolean;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  message: null,
  show: false,
  /** primary, secondary, success, danger, warning, info*/
  default: "light",
});

let timeOut = ref();

const local = computed(() => props.show);

const emit = defineEmits<{
  (e: "close", value: boolean): void;
}>();

const classColor = computed(() => {
  return `alert-${props.color}`;
});

const classShow = computed(() => {
  return local.value ? "show" : "";
});

function _close() {
  emit("close", false);
  if (timeOut.value) {
    clearTimeout(timeOut.value);
    timeOut.value = null;
  }
}

watch(local, () => {
  if (local.value === true) {
    timeOut.value = setTimeout(() => {
      emit("close", false);
    }, 5000);
  } else {
    _close();
  }
});

onUnmounted(() => _close());
</script>
<template>
  <div
    class="snackbar shadow position-fixed end-0 alert alert-dismissible"
    :class="[classColor, classShow]"
  >
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      @click="_close"
    ></button>
    <span v-if="typeof message === 'string'">{{ message }}</span>
    <div v-else>
      <span v-for="(msg, index) in message" :key="index">{{ msg }}</span>
    </div>
  </div>
</template>
<style scoped>
.snackbar {
  visibility: hidden;
  z-index: 100;
}

.snackbar.show {
  visibility: visible;
}

span {
  display: block;
}
</style>
