<script setup lang="ts">
defineProps<{
  pageNumber: number;
  nextPage?: string | null;
  previousPage?: string | null;
  totalPages: number;
}>();
defineEmits<{
  (e: "click-pagination", value: string | null): void;
}>();
</script>
<template>
  <nav aria-label="Page navigation">
    <ul v-if="totalPages > 1" class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: pageNumber === 1 }">
        <a
          class="page-link"
          :disabled="pageNumber === 1"
          @click="$emit('click-pagination', previousPage)"
        >
          <span aria-hidden="true">&laquo;</span> Anterior
        </a>
      </li>
      <li class="page-item" :class="{ disabled: pageNumber === totalPages }">
        <a
          class="page-link"
          :disabled="pageNumber === totalPages"
          @click="$emit('click-pagination', nextPage)"
        >
          Próxima
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
    <p class="text-center">
      Mostrando página {{ pageNumber }} de {{ totalPages }}.
    </p>
  </nav>
</template>

<style scoped>
a {
  cursor: pointer;
}
</style>
