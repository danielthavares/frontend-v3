<script setup lang="ts">
export interface ColumnItem {
  field: string;
  header: string;
  size: number;
}

export interface ActionItem {
  icon?: string;
  label: string;
  click: (arg: any) => void;
}

interface Props {
  columns: ColumnItem[];
  actions: ActionItem[];
  values: any[];
}

defineProps<Props>();
</script>
<template>
  <div v-if="values.length > 0" class="table-responsive">
    <table class="table table-bordered">
      <thead class="table-primary">
        <tr>
          <th
            v-for="(col, index) in columns"
            :key="index"
            scope="col"
            :class="col.size ? `col-${col.size}` : 'col'"
          >
            {{ col.header }}
          </th>
          <th v-if="actions.length > 0" class="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, index) in values" :key="index">
          <td v-for="(col, index1) in columns" :key="index1">
            {{ value[col.field] }}
          </td>
          <td v-if="actions.length > 0">
            <div>
              <a
                v-for="(action, index2) in actions"
                :key="index2"
                class="link-primary m-1"
                role="button"
                :title="action.label"
                @click="action.click(value)"
              >
                <em v-if="action.icon" :class="action.icon"></em>
                <span v-else>{{ action.label }}</span></a
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
