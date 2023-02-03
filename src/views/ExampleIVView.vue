<script setup lang="ts">
import { ref } from "vue";
import VAutoComplete from "@/components/VAutoComplete.vue";

const data = [
  { id: 1, name: "Daniel", status: true },
  { id: 2, name: "Mirabel", status: false },
  { id: 3, name: "Davi", status: true },
  { id: 4, name: "Valéria", status: true },
  { id: 5, name: "Arimatéia", status: false },
  { id: 6, name: "Alex", status: true },
  { id: 7, name: "Maria", status: true },
  { id: 8, name: "José", status: false },
  { id: 9, name: "Joana", status: true },
  { id: 10, name: "Tiago", status: true },
];

const mockSearch = (param: string): Promise<object[]> => {
  if (param) {
    param = param.toLowerCase();
    const result = data.filter((x) => x.name.toLowerCase().includes(param));
    if (result && result.length > 0) return Promise.resolve(result);
    else return Promise.reject("Nenhum registro encontrado.");
  } else {
    return Promise.resolve(data);
  }
};

const autoCompleteModel = ref({ id: 8, name: "José" });
</script>
<template>
  <div class="container">
    <p>Exemplo de componentes IV - autocomplete</p>
    <div class="row">
      <div class="col">
        <v-auto-complete
          id="id"
          v-model="autoCompleteModel"
          label="Auto Complete"
          description="name"
          :search-fn="mockSearch"
        />
      </div>
      <div class="col">
        <p>auto complete model:</p>
        <pre>{{ autoCompleteModel }}</pre>
      </div>
    </div>
  </div>
</template>
