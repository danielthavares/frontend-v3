<script setup lang="ts">
import VInput from "@/components/VInput.vue";
import VInputDate from "@/components/VInputDate.vue";
import VInputMask from "@/components/VInputMask.vue";
import VInputNumber from "@/components/VInputNumber.vue";
import VTextArea from "@/components/VTextArea.vue";
import VCheckBox from "@/components/VCheckBox.vue";
import VRadio from "@/components/VRadio.vue";

import { ref } from "vue";

const errors = {
  with: ["error one", "error two"],
  without: [],
};

const rbItens = [
  { value: 1, label: "Um" },
  { value: 2, label: "Dois" },
  { value: 3, label: "Tres", disabled: true },
];

const inputModel = ref(null);
const inputDateModel = ref("2023-01-30T03:00:00.000Z");
const inputMaskModel = ref();
const inputNumberModel = ref(-900.99);
const textAreaModel = ref(null);
const checkBoxModel = ref();
const radioModel = ref();

const required = ref(true);
const disabled = ref(false);
</script>

<template>
  <div class="container">
    <p>home</p>
    <div class="row">
      <div class="col">
        <v-input
          v-model="inputModel"
          label="Input"
          :failures="errors['without']"
          :required="required"
          :disabled="disabled"
        />
        <v-input-date
          v-model="inputDateModel"
          label="Input Date"
          :failures="errors['without']"
          :required="required"
          :disabled="disabled"
        />
        <v-input-mask
          v-model="inputMaskModel"
          label="Input Mask"
          pattern="(00)000000000"
          :required="required"
          :disabled="disabled"
        />
        <v-input-number
          v-model="inputNumberModel"
          label="Input Number"
          :max="10000"
          :min="-1000"
          :scale="2"
          :failures="errors['without']"
          :required="required"
          :disabled="disabled"
        />
        <v-text-area
          v-model="textAreaModel"
          label="Text Area"
          :failures="errors['without']"
          :required="required"
          :disabled="disabled"
        />
        <v-check-box
          v-model="checkBoxModel"
          label="Check Box/Switch"
          description="descrição"
          :failures="errors['without']"
          :required="required"
          :disabled="disabled"
          :on-switch="false"
        />
        <v-radio
          v-model="radioModel"
          label="Radio"
          :options="rbItens"
          :failures="errors['without']"
          :required="required"
          :disabled="disabled"
          :inline="false"
        />
      </div>
      <div class="col">
        <pre>
          <p>input model: {{ inputModel }}</p>
          <p>input date model: {{ inputDateModel }}</p>
          <p>input mask model: {{ inputMaskModel }}</p>
          <p>input number model: {{ inputNumberModel }}</p>
          <p>text area model: {{ textAreaModel }}</p>
          <p>check box model: {{ checkBoxModel }}</p>
          <p> radio model: {{ radioModel }}</p>
        </pre>
      </div>
    </div>
  </div>
</template>
