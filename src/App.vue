<script setup lang="ts">
import { RouterView } from "vue-router";
import type { MenuItem } from "@/components/VHeader.vue";
import VHeader from "@/components/VHeader.vue";

const sistema = "Sistema";
const informacao = "Informação sobre o sistema";
const usuario = "Usuário";
const menus: MenuItem[] = [
  {
    label: "Exemplos",
    itens: [
      {
        name: "Exemplo I",
        link: "/examplei",
      },
      {
        name: "Exemplo II",
        link: "/exampleii",
      },
      {
        name: "Exemplo III",
        link: "/exampleiii",
      },
      {
        name: null, //divider
      },
      {
        name: "Exemplo IV",
        link: "/exampleiv",
      },
      {
        name: "Exemplo V",
        link: "/examplev",
      },
    ],
  },
  {
    label: "Informações",
    itens: [
      {
        name: "About",
        link: "/about",
      },
    ],
  },
];

function _logoff(): Promise<void> {
  return Promise.resolve(console.log("Implementar ação de logoff."));
}
</script>

<template>
  <header>
    <v-header
      :sistema="sistema"
      :informacao="informacao"
      :usuario="usuario"
      :menus="menus"
      :logoff="_logoff"
    ></v-header>
  </header>

  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
