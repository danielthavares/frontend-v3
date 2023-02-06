<script setup lang="ts">
import type { LocationAsRelativeRaw, LocationQueryRaw } from "vue-router";
import VDropDownMenuItem from "./VDropDownMenuItem.vue";

export interface DropDownItem {
  link?: string;
  query?: LocationAsRelativeRaw | null;
  name?: string | null;
}

interface Props {
  index: number;
  label: string;
  open: boolean;
  itens: Array<DropDownItem>;
  query?: LocationQueryRaw;
}

const props = withDefaults(defineProps<Props>(), {
  index: 0,
  label: "Menu",
  open: false,
  itens: () => [],
  query: () => {
    return {};
  },
});

const emit = defineEmits<{
  (e: "change-visibility", value: number): void;
}>();

function _changeVisibility() {
  emit("change-visibility", props.open !== true ? props.index : -1);
}
</script>
<template>
  <li class="nav-item dropdown" :class="{ show: open }">
    <a
      class="nav-link dropdown-toggle"
      data-toggle="dropdown"
      role="button"
      @click.prevent="_changeVisibility()"
    >
      {{ label }}
      <span class="caret"></span>
    </a>
    <ul class="dropdown-menu" :class="{ show: open }">
      <template v-for="(item, idx) in itens" :key="idx">
        <VDropDownMenuItem
          :link="item.link"
          :query="query"
          :name="item.name"
          @click="_changeVisibility()"
        />
      </template>
    </ul>
  </li>
</template>
