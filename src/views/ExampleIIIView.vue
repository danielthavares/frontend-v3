<script setup lang="ts">
import VCheckBox from "@/components/VCheckBox.vue";
import VUpload, { type FileItem } from "@/components/VUpload.vue";
import VButton from "@/components/VButton.vue";
import { Colors } from "@/util/EnumColors";
import { ref, computed } from "vue";

const required = ref(false);
const disabled = ref(false);
const errors = {
  with: ["error one", "error two"],
  without: [],
};
const contemErro = ref(false);
const erro = computed(() => (contemErro.value ? "with" : "without"));

const files = ref<FileItem[]>([
  {
    id: "abc123456",
    name: "arquivo01.pdf",
  },
  {
    id: "abc123987",
    name: "arquivo02.pdf",
  },
]);

const itensForm = new Map<string, string>([
  ["className", "Documentos"],
  ["documentTitle", "arquivo"],
]);

function _upload(file: File, data: Map<string, string>): Promise<FileItem> {
  console.log("upload", { file, data });
  return new Promise((resolve, reject) => {
    try {
      /**
       * Chamada ao serviço de upload de sua aplicação e transforma o retorno em um FileItem
       */
      setTimeout(
        () =>
          resolve({
            id: Math.random().toString().replace(".", "_"),
            name: file.name,
          }),
        3000
      );
    } catch {
      reject("Não foi possível enviar o arquivo!");
    }
  });
}

function _download(identificador: string, nome: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(
        () => resolve(console.log("download", { identificador, nome })),
        3000
      );
    } catch {
      reject("Não foi possível baixar o arquivo!");
    }
  });
}

function _remove(identificador: string): Promise<void> {
  console.log("remove", identificador);
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => resolve(console.log("remove", { identificador })), 3000);
    } catch {
      reject("Não foi possível remover o arquivo!");
    }
  });
}
</script>
<template>
  <div class="container">
    <p>Exemplo de componentes III - Upload</p>
    <div class="row">
      <div class="col-2">
        <v-check-box
          v-model="required"
          label="Requerido"
          :description="required ? 'Sim' : 'Não'"
        />
        <v-check-box
          v-model="disabled"
          label="Desabilitado"
          :description="disabled ? 'Sim' : 'Não'"
        />
        <v-button
          :color="Colors.Danger"
          label="Erro?"
          @click="contemErro = !contemErro"
        />
      </div>
      <div class="col">
        <v-upload
          v-model="files"
          label="Arquivos"
          :max="4"
          :itens-form="itensForm"
          :download-fn="_download"
          :upload-fn="_upload"
          :remove-fn="_remove"
          :required="required"
          :disabled="disabled"
          :failures="errors[erro]"
        />
      </div>
      <div class="col">
        <pre>
             {{ files }}
        </pre>
      </div>
    </div>
  </div>
</template>
