<script setup lang="ts">
import VInput from "@/components/VInput.vue";
import VInputDate from "@/components/VInputDate.vue";
import VInputMask from "@/components/VInputMask.vue";
import VInputNumber from "@/components/VInputNumber.vue";
import VTextArea from "@/components/VTextArea.vue";
import VCheckBox from "@/components/VCheckBox.vue";
import VRadio from "@/components/VRadio.vue";
import VTooltip from "@/components/VTooltip.vue";
import VSelect from "@/components/VSelect.vue";
import VButton from "@/components/VButton.vue";
import VAutoComplete from "@/components/VAutoComplete.vue";

import { names } from "@/services/examples/nomes";

import { ref, computed } from "vue";

const errors = {
  with: ["error one", "error two"],
  without: [],
};

const rbItens = [
  { value: 1, label: "Um" },
  { value: 2, label: "Dois" },
  { value: 3, label: "Tres", disabled: true },
];

const options = [
  {
    id: 1,
    description: "teste 1",
  },
  {
    id: 2,
    description: "teste 2",
  },
  {
    id: 3,
    description: "teste 3",
  },
];

const inputModel = ref(null);
const inputDateModel = ref("2023-01-30T03:00:00.000Z");
const inputMaskModel = ref();
const inputNumberModel = ref(-900.99);
const textAreaModel = ref(null);
const checkBoxModel = ref();
const radioModel = ref();
const selectModel = ref();
const autoCompleteModel = ref({ id: 8, name: "João" });

const required = ref(true);
const disabled = ref(false);
const contemErro = ref(false);
const erro = computed(() => (contemErro.value ? "with" : "without"));
</script>

<template>
  <div class="container">
    <p>Tela com componentes de formulário</p>
    <div class="row">
      <div class="col">
        <v-button
          color="primary"
          label="Requerido?"
          @click="required = !required"
        />
        <v-button color="success" label="Habilitar" @click="disabled = false" />
        <v-button color="danger" label="Desabilitar" @click="disabled = true" />
        <v-button
          color="warning"
          label="Contém erro?"
          @click="contemErro = !contemErro"
        />
        <hr />
        <v-input
          v-model="inputModel"
          label="Input"
          :failures="errors[erro]"
          :required="required"
          :disabled="disabled"
        />
        <v-input-date
          v-model="inputDateModel"
          label="Input Date"
          :failures="errors[erro]"
          :required="required"
          :disabled="disabled"
        />
        <v-input-mask
          v-model="inputMaskModel"
          label="Input Mask"
          pattern="(00)000000000"
          :failures="errors[erro]"
          :required="required"
          :disabled="disabled"
        />
        <v-input-number
          v-model="inputNumberModel"
          label="Input Number"
          :max="10000"
          :min="-1000"
          :scale="2"
          :failures="errors[erro]"
          :required="required"
          :disabled="disabled"
        />
        <v-text-area
          v-model="textAreaModel"
          label="Text Area"
          :rows="3"
          :cols="3"
          :failures="errors[erro]"
          :required="required"
          :disabled="disabled"
        />
        <v-check-box
          v-model="checkBoxModel"
          label="Check Box"
          description="descrição"
          :failures="errors[erro]"
          :required="required"
          :disabled="disabled"
        />
        <v-check-box
          v-model="checkBoxModel"
          label="Switch"
          description="descrição"
          :failures="errors[erro]"
          :required="required"
          :disabled="disabled"
          as-switch
        />
        <v-radio
          v-model="radioModel"
          label="Radio"
          :options="rbItens"
          :failures="errors[erro]"
          :required="required"
          :disabled="disabled"
          inline
        />
        <v-select
          v-model="selectModel"
          label="Select"
          value-id="id"
          description="description"
          :options="options"
          :failures="errors[erro]"
          :required="required"
          :disabled="disabled"
          :value-no-selected="null"
        />
        <v-auto-complete
          id="id"
          v-model="autoCompleteModel"
          label="Auto Complete"
          description="name"
          :search-fn="names"
          :failures="errors[erro]"
          :required="required"
          :disabled="disabled"
        />
      </div>
      <div class="col">
        <v-tooltip message="State">
          <p class="fw-bold">State <small>com tooltip</small></p>
        </v-tooltip>
        <pre>
          <p>input model: {{ inputModel }}</p>
          <p>input date model: {{ inputDateModel }}</p>
          <p>input mask model: {{ inputMaskModel }}</p>
          <p>input number model: {{ inputNumberModel }}</p>
          <p>text area model: {{ textAreaModel }}</p>
          <p>check box model: {{ checkBoxModel }}</p>
          <p>radio model: {{ radioModel }}</p>
          <p>select model: {{ selectModel }}</p>
          <p>auto complete model: {{ autoCompleteModel }}</p>
        </pre>
      </div>
    </div>
  </div>
</template>
