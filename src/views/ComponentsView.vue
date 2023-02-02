<script setup lang="ts">
import { ref, reactive } from "vue";
import { Colors } from "@/util/EnumColors";
import VButton from "@/components/VButton.vue";
import VModal from "@/components/VModal.vue";
import VAccordion, { type AccItem } from "@/components/VAccordion.vue";
import VTab, { type TabItem } from "@/components/VTab.vue";
import VAlert, { type Props as AlertProps } from "@/components/VAlert.vue";
import VCard from "@/components/VCard.vue";

const show = ref(false);

const accordions: AccItem[] = [
  { id: "acc1", label: "Item 1" },
  { id: "acc2", label: "Item 2" },
  { id: "acc3", label: "Item 3" },
];

const tabs: TabItem[] = [
  { id: "tab1", label: "Tab 1" },
  { id: "tab2", label: "Tab2" },
  { id: "tab3", label: "Tab3" },
];

const alert: AlertProps = reactive({
  color: Colors.Secondary,
  message: "",
  show: false,
});

function _alertShow(color: Colors, message: string | string[]) {
  alert.color = color;
  alert.message = message;
  alert.show = true;
}

function _alertHide() {
  alert.color = Colors.Secondary;
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
          <v-button
            label="Fechar"
            :color="Colors.Secondary"
            @click="show = false"
          />
        </template>
      </v-modal>
      <v-button
        :color="Colors.Primary"
        label="Toggle modal"
        @click="show = !show"
      />
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
            :color="Colors.Success"
            label="Sucesso"
            @click="_alertShow(Colors.Success, 'Sucesso')"
          />
          <v-button
            :color="Colors.Warning"
            label="Atenção"
            @click="_alertShow(Colors.Warning, 'Atenção')"
          />
          <v-button
            :color="Colors.Danger"
            label="Erro"
            @click="_alertShow(Colors.Danger, 'Erro')"
          />
          <v-button
            :color="Colors.Primary"
            label="Informações"
            @click="
              _alertShow(Colors.Primary, ['Info 01', 'Info 02', 'Info 03'])
            "
          />
        </div>
      </div>
      <!--card-->
      <h5 class="mt-4">Card:</h5>
      <v-card
        header="Header"
        title="Card Title"
        text="Card text"
        :white-text="true"
        :color="Colors.Primary"
      />
    </div>
  </div>
</template>
