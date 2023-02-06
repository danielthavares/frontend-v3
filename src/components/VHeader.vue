<script setup lang="ts">
import VDropDownMenu from "./VDropDownMenu.vue";
import type { DropDownItem } from "./VDropDownMenu.vue";
import VModal from "./VModal.vue";
import VButton from "./VButton.vue";
import { ref } from "vue";
import { Colors } from "../util/EnumColors";

export interface MenuItem {
  label: string;
  itens: DropDownItem[];
}

interface Props {
  sistema: string;
  informacao: string;
  usuario?: string;
  menus: MenuItem[];
  logoff: () => Promise<void>;
}

withDefaults(defineProps<Props>(), {
  sistema: "Nm. Sistema",
  informacao: "Informação do Sistema",
  menus: () => [],
});

const infoSystem = ref(false);
const collapse = ref(false);
const visible = ref(-1);

function closeMenu() {
  visible.value = -1;
}

function changeCollapse() {
  closeMenu();
  collapse.value = !collapse.value;
}

function changeVisibility(index: number) {
  visible.value = index;
}
</script>
<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-custom">
    <v-modal :show="infoSystem" title="Sobre">
      <template #body>
        <p class="text-justify">{{ informacao }}</p>
      </template>
      <template #footer>
        <v-button
          label="Fechar"
          :color="Colors.Secondary"
          @click="infoSystem = false"
        />
      </template>
    </v-modal>
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">{{ sistema }}</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="changeCollapse()"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        id="navbarSupportedContent"
        class="collapse navbar-collapse"
        :class="{ show: collapse }"
        @mouseleave="closeMenu()"
      >
        <ul class="nav navbar-nav me-auto mb-2 mb-lg-0">
          <v-drop-down-menu
            v-for="(item, index) in menus"
            :key="index"
            :label="item.label"
            :index="index"
            :open="visible == index"
            :itens="item.itens"
            @change-visibility="changeVisibility($event)"
          />
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <a class="btn btn-primary bg-custom me-3" @click="infoSystem = true">
            <em class="bi bi-info-circle"></em>
          </a>
          <span class="navbar-text me-3">
            <em class="bi bi-person-circle"></em>
            {{ usuario }}
          </span>
          <a class="btn btn-primary bg-custom" @click="logoff()">
            <em class="bi bi-power"></em>
          </a>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.navbar-dark .navbar-text {
  color: #fff;
}

.bg-custom {
  background-color: #008cba !important;
  border-color: #008cba !important;
}
</style>
