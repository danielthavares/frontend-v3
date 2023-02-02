<script setup lang="ts">
import { computed } from "vue";
import { Colors } from "@/util/EnumColors";

interface Props {
  header: string;
  title: string;
  text: string;
  whiteText?: boolean;
  color?: Colors;
}

const props = withDefaults(defineProps<Props>(), {
  header: "Header",
  title: "Title",
  text: "Text",
  whiteText: false,
  color: Colors.Secondary,
});

const classColor = computed(() =>
  props.color ? `bg-${props.color}` : "bg-secondary"
);
const classTextWhite = computed(() =>
  props.whiteText === true ? "text-white" : ""
);
</script>
<template>
  <div class="card custom-card mb-3" :class="[classColor, classTextWhite]">
    <div class="card-header">{{ header }}</div>
    <div class="card-body">
      <h4 class="card-title">{{ title }}</h4>
      <p class="card-text">{{ text }}</p>
    </div>
  </div>
</template>
<style>
.row > .card {
  padding-left: 0px;
  padding-right: 0px;
}

.custom-card {
  width: 20rem;
}
</style>
