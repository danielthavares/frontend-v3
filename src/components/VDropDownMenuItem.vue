<script setup lang="ts">
import type { LocationQueryRaw } from "vue-router";

interface Props {
  divider?: boolean;
  name?: string | null;
  icon?: string | null;
  link?: string;
  query?: LocationQueryRaw;
}
withDefaults(defineProps<Props>(), {
  divider: false,
  icon: null,
  link: "/",
  query: () => {
    return {};
  },
});

defineEmits<{
  (e: "click"): void;
}>();
</script>
<template>
  <li v-if="name == null" role="separator" class="dropdown-divider"></li>

  <li v-else @click="$emit('click')">
    <router-link :to="{ path: link, query: query }" class="dropdown-item">
      <span v-if="icon" :class="icon"></span>
      {{ name }}
    </router-link>
  </li>
</template>
