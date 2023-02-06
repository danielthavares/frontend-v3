<script setup lang="ts">
import { reactive } from "vue";
import VTable from "@/components/VTable.vue";
import VPagination from "@/components/VPagination.vue";

const pagination = reactive({
  pageNumber: 2,
  nextPage: "http://page?id=3",
  previousPage: "http://page?id=1",
  totalPages: 3,
});

const columns = [
  { field: "nome", header: "Nome", size: 4 },
  { field: "descricao", header: "Descrição", size: 4 },
  { field: "categoriaNome", header: "Categoria", size: 3 },
];

const actions = [
  {
    icon: "bi bi-binoculars-fill",
    click: visualizar,
    label: "Visualizar",
  },
  {
    icon: "bi bi-pencil-fill",
    click: editar,
    label: "Editar",
  },
  {
    icon: "bi bi-trash-fill",
    click: antesDeExcluir,
    label: "Excluir",
  },
];

const values = reactive([
  {
    id: 1,
    nome: "Nome 01",
    descricao: "descrição",
    categoriaNome: "Categoria 1",
  },
  {
    id: 2,
    nome: "Nome 02",
    descricao: "descrição",
    categoriaNome: "Categoria 2",
  },
  {
    id: 3,
    nome: "Nome 03",
    descricao: "descrição",
    categoriaNome: "Categoria 3",
  },
  {
    id: 4,
    nome: "Nome 04",
    descricao: "descrição",
    categoriaNome: "Categoria 4",
  },
  {
    id: 5,
    nome: "Nome 05",
    descricao: "descrição",
    categoriaNome: "Categoria 5",
  },
]);

function visualizar(item: any) {
  console.log("visualizar", { item });
}

function editar(item: any) {
  console.log("editar", { item });
}

function antesDeExcluir(item: any) {
  console.log("antesDeExcluir", { item });
}

function pesquisar(event: string | null) {
  console.log("pesquisando", { event });
}
</script>
<template>
  <div class="container">
    <p>Exemplo de componentes V - Tabela e paginação</p>
    <v-table :columns="columns" :values="values" :actions="actions" />
    <v-pagination
      :page-number="pagination.pageNumber"
      :next-page="pagination.nextPage"
      :previous-page="pagination.previousPage"
      :total-pages="pagination.totalPages"
      @click-pagination="pesquisar($event)"
    />
  </div>
</template>
