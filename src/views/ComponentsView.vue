<script setup lang="ts">
import { ref, reactive } from "vue";
import VButton from "@/components/VButton.vue";
import VModal from "@/components/VModal.vue";
import VAccordion from "@/components/VAccordion.vue";
import VTab from "@/components/VTab.vue";
import VAlert from "@/components/VAlert.vue";

const show = ref(false);

const accordions = [
  { id: "acc1", label: "Item 1" },
  { id: "acc2", label: "Item 2" },
  { id: "acc3", label: "Item 3" },
];

const tabs = [
  { id: "tab1", label: "Tab 1" },
  { id: "tab2", label: "Tab2" },
  { id: "tab3", label: "Tab3" },
];

interface iAlert {
  color: string;
  message: string | Array<string>;
  show: boolean;
}

const alert = reactive<iAlert>({
  color: "",
  message: "",
  show: false,
});

function _alertShow(color: string, message: string | Array<string>) {
  alert.color = color;
  alert.message = message;
  alert.show = true;
}

function _alertHide() {
  alert.color = "";
  alert.message = "";
  alert.show = false;
}
</script>
<template>
  <div class="container">
    <p>Exemplo de componentes</p>
    <div class="row">
      <!--modal-->
      <v-modal title="Modal de teste" :show="show">
        <template #body>
          <p class="text-justify">Texto que será exibido no corpo da modal</p>
        </template>
        <template #footer>
          <v-button label="Fechar" color="secondary" @click="show = false" />
        </template>
      </v-modal>
      <v-button color="primary" label="Toggle modal" @click="show = !show" />
      <!--accordion-->
      <h5 class="mt-4">Accordion:</h5>
      <v-accordion class="mt-1" :accordions="accordions" initial="acc1">
        <template #acc1>
          <p>accordion 1</p>
        </template>
        <template #acc2>
          <p>accordion 2</p>
        </template>
        <template #acc3>
          <p>accordion 3</p>
        </template>
      </v-accordion>
      <!--tabs-->
      <h5 class="mt-4">Tabs:</h5>
      <v-tab class="mb-4" :tabs="tabs" initial="tab2">
        <template #tab1>
          <p>Tab 1</p>
        </template>
        <template #tab2>
          <p>Tab 2</p>
        </template>
        <template #tab3>
          <p>Tab 3</p>
        </template>
      </v-tab>
      <!--alert-->
      <v-alert
        :color="alert.color"
        :message="alert.message"
        :show="alert.show"
        @close="_alertHide"
      />
      <h5>Alert:</h5>
      <div class="row">
        <div class="col">
          <v-button
            color="success"
            label="Sucesso"
            @click="_alertShow('success', 'Sucesso')"
          />
          <v-button
            color="warning"
            label="Atenção"
            @click="_alertShow('warning', 'Atenção')"
          />
          <v-button
            color="danger"
            label="Erro"
            @click="_alertShow('danger', 'Erro')"
          />
          <v-button
            color="primary"
            label="Informações"
            @click="_alertShow('primary', ['Info 01', 'Info 02', 'Info 03'])"
          />
        </div>
      </div>
    </div>
  </div>
</template>
