<script setup lang="ts">
import { Colors } from "@/util/EnumColors";
import { ref, onMounted } from "vue";
import VField from "./VField.vue";

export interface FileItem {
  id: string;
  name: string;
}

interface Props {
  modelValue: FileItem[];
  accept?: string;
  labelArquivo?: string;
  cssClass?: Colors;
  max?: number;
  multiple?: boolean;
  size?: number;
  itensForm?: Map<string, string>;
  uploadFn: (file: File, data: Map<string, string>) => Promise<FileItem>;
  downloadFn: (identificador: string, nome: string) => Promise<void>;
  removeFn: (identificador: string) => Promise<void>;
  label: string;
  disabled?: boolean;
  required?: boolean;
  failures?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  accept: "*",
  labelArquivo: "Selecionar",
  cssClass: Colors.Primary,
  max: 1,
  multiple: false,
  size: 20 * 1024 * 1024,
  itensForm: () => new Map<string, string>(),
  label: "Label",
  disabled: false,
  required: false,
  failures: () => [],
});

const id = ref();
const isBusy = ref(false);
const error = ref<string | null>(null);

const emit = defineEmits<{
  (e: "update:model-value", value: FileItem[]): void;
}>();

function _init() {
  id.value = `up_${Math.random().toString().replace(".", "_")}`;
}

function _clear() {
  error.value = null;
  isBusy.value = false;
}

async function _uploadFiles(e: Event) {
  let vl = (e.target as HTMLInputElement).files;
  _clear();
  let updatedlist: FileItem[] = [];
  const files = [];

  if (vl === null) return;
  files.push(...vl);

  let maximo = props.modelValue
    ? props.modelValue.length + files.length
    : files.length;
  if (maximo > props.max) {
    error.value = `Máximo de ${props.max} arquivos.`;
    return;
  }

  files.forEach(async (file) => {
    isBusy.value = true;

    if (
      props.modelValue &&
      props.modelValue.find((x) => x.name === file.name)
    ) {
      error.value = `Arquivo "${file.name}" já adicionado.`;
      isBusy.value = false;
      return;
    }

    if (file.size > props.size) {
      error.value = `O tamanho do arquivo "${file.name}" é maior que o máximo permitido.`;
      isBusy.value = false;
      return;
    }

    try {
      const response = await props.uploadFn(file, props.itensForm);
      updatedlist.push({ id: response.id, name: file.name });
    } catch (err: any) {
      error.value =
        typeof err === "string" ? err : "Erro no upload do arquivo.";
    } finally {
      emit("update:model-value", [
        ...(props.modelValue ? props.modelValue : []),
        ...updatedlist,
      ]);
      isBusy.value = false;
    }
  });

  (e.target as HTMLInputElement).value = "";
}

async function _downloadFile(identificador: string, name: string) {
  _clear();
  isBusy.value = true;

  try {
    await props.downloadFn(identificador, name);
  } catch (err: any) {
    error.value =
      typeof err === "string" ? err : "Erro no download do arquivo.";
  } finally {
    isBusy.value = false;
  }
}

async function _removeFile(identificador: string) {
  _clear();
  isBusy.value = true;

  try {
    await props.removeFn(identificador);
    const list = props.modelValue.filter((x) => x.id !== identificador);
    emit("update:model-value", [...list]);
  } catch (err: any) {
    error.value = typeof err === "string" ? err : "Erro ao remover o arquivo.";
  } finally {
    isBusy.value = false;
  }
}

onMounted(_init);
</script>
<template>
  <v-field :label="label" :required="required" :failures="failures">
    <br />
    <label
      :class="['btn', `btn-${cssClass}`, disabled ? 'label-disabled' : '']"
      :disabled="disabled"
      :for="id"
    >
      <div v-if="isBusy" class="spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <em v-else class="bi bi-upload"></em>
      {{ labelArquivo }}
    </label>
    <input
      :id="id"
      :accept="accept"
      type="file"
      :multiple="multiple"
      :disabled="disabled || isBusy"
      @change="_uploadFiles($event)"
    />
    <p v-if="error" class="text-sm-start text-danger msg-font">{{ error }}</p>
    <ul>
      <li v-for="(file, index) in modelValue" :key="index">
        <a
          class="me-2 link-primary"
          href="#"
          @click.prevent="_downloadFile(file.id, file.name)"
        >
          {{ file.name }}
        </a>
        <span
          v-if="!disabled"
          class="delete-file"
          @click="_removeFile(file.id)"
        >
          <em class="bi bi-x-lg me-1"></em>
        </span>
      </li>
    </ul>
  </v-field>
</template>
<style scoped>
input[type="file"] {
  display: none;
}

.delete-file {
  color: red;
  cursor: pointer;
}

.label-disabled {
  cursor: not-allowed;
  opacity: 0.65;
}
</style>
