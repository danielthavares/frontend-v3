<script setup lang="ts">
import { ref, onMounted } from "vue";

export interface AccItem {
  id: string;
  label: string;
}

interface Props {
  accordions: AccItem[];
  initial: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  accordions: () => [],
  initial: null,
});

const id = ref();
const collapse = ref();

function _init() {
  id.value = `acc_${Math.random().toString().replace(".", "_")}`;
  collapse.value = props.initial;
}

function _toggle(id: any) {
  if (collapse.value === id) collapse.value = null;
  else collapse.value = id;
}

onMounted(_init);
</script>
<template>
  <div :id="id" class="accordion">
    <div v-for="(acc, index) in accordions" :key="index" class="accordion-item">
      <h2 :id="`heading${index}_${acc.id}`" class="accordion-header">
        <button
          class="accordion-button"
          :class="{ collapsed: collapse !== acc.id }"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="`#${acc.id}`"
          aria-expanded="true"
          :aria-controls="acc.id"
          @click="_toggle(acc.id)"
        >
          {{ acc.label }}
        </button>
      </h2>
      <div
        :id="acc.id"
        class="accordion-collapse"
        :class="{ collapse: collapse !== acc.id }"
        :aria-labelledby="`heading${index}_${acc.id}`"
        :data-bs-parent="`#${id}`"
      >
        <div class="accordion-body">
          <slot :name="acc.id"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>
