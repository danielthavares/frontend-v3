<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import VField from "./VField.vue";

interface Props {
  modelValue: any;
  id: string;
  description: string;
  maxlength?: number;
  width?: number;
  searchFn?: Function;
  successFn?: Function;
  errorFn?: Function;
  interval?: number;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  failures?: Array<string>;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  id: "id",
  description: "description",
  maxlength: 50,
  width: 250,
  searchFn: (param: string) => param,
  successFn: (res: any) => res,
  errorFn: (err: any) => err,
  interval: 2,
  disabled: false,
  required: false,
  failures: () => [],
});

const emit = defineEmits<{
  (e: "update:model-value", value: boolean | null): void;
}>();

const termo = ref();
const local = computed(() =>
  props.modelValue ? props.modelValue[props.description] : null
);
const items = ref([]);
const isBusy = ref(false);
const error = ref(null);

watch(local, (nValue) => {
  termo.value = nValue;
});

function _pesquisando(value: Event) {
  let vl = (value.target as HTMLInputElement).value;
  termo.value = vl;
  error.value = null;

  if (!vl) {
    items.value = [];
    return;
  }

  if (vl.length >= props.interval && vl.length % props.interval === 0) {
    items.value = [];
    isBusy.value = true;
    props
      .searchFn(vl)
      .then((res: any) => {
        items.value = props.successFn(res);
      })
      .catch((err: any) => {
        items.value = [];
        error.value = props.errorFn(err) || "Erro ao pesquisar.";
      })
      .finally(() => {
        isBusy.value = false;
      });
  }
}

function _selecionado(item: any) {
  termo.value = item[props.description];
  items.value = [];
  emit("update:model-value", item);
}

function _limpando() {
  termo.value = null;
  items.value = [];
  error.value = null;
  emit("update:model-value", null);
}

function _init() {
  termo.value = local.value;
}

onMounted(_init);
</script>
<template>
  <v-field :label="label" :required="required" :failures="failures">
    <div class="input-group">
      <input
        class="form-control form-control-sm"
        :class="{ 'is-invalid': failures.length > 0 }"
        type="text"
        :value="termo"
        :maxlength="maxlength"
        :disabled="disabled"
        @input="_pesquisando($event)"
        @keyup.esc="_limpando()"
      />
      <button
        v-if="termo"
        class="btn btn-sm btn-outline-secondary"
        type="button"
        :disabled="disabled"
        @click="_limpando()"
      >
        <em class="bi bi-x-lg me-1"></em>
      </button>
      <button
        v-else
        class="btn btn-sm btn-outline-secondary"
        type="button"
        readonly
        :disabled="disabled"
        @click.prevent
      >
        <em class="bi bi-search me-1"></em>
      </button>
    </div>
    <p v-if="isBusy" class="text-sm-start msg-font">Pesquisando...</p>
    <p v-if="error" class="text-sm-start text-danger msg-font">{{ error }}</p>
    <transition name="autocompletefade">
      <ul
        v-if="items.length > 0"
        class="autocomplete"
        :style="{ 'min-width': `${width}px` }"
      >
        <li
          v-for="(item, index) in items"
          :key="index"
          @click="_selecionado(item)"
        >
          <span class="item">{{ item[description] }}</span>
        </li>
      </ul>
    </transition>
  </v-field>
</template>
<style scoped>
.autocomplete {
  list-style-type: none;
  border: 1px solid #ccc;
  z-index: 99;
  background-color: white;
  position: absolute;
}

li {
  margin-top: 0.1rem;
  cursor: pointer;
  padding: 1px;
}

li:hover {
  background-color: #1e90ff;
  color: white;
}

ul {
  padding: 0;
  margin-left: 0;
  text-indent: 1rem;
  max-height: 20rem;
  overflow: auto;
}

.autocompletefade-enter-active,
.autocompletefade-leave-active {
  transition: opacity 0.5s;
}

.autocompletefade-enter,
.autocompletefade-leave-to {
  opacity: 0;
}

.form-control {
  border-right: none !important;
}

.btn {
  border-left: none !important;
}

.btn-outline-secondary {
  border-color: #ced4da !important;
}

.item {
  margin-top: 1px;
  padding: 1px;
}

.msg-font {
  font-size: 14px;
}
</style>
