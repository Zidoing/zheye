<template>
  <div>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import ColumnList from '@/components/ColumnList'
import { defineComponent } from 'vue'
import { testData as list } from '../../testData'

export default defineComponent({
  name: 'Home',
  components: { ColumnList },
  setup () {
    return { list }
  }
})
</script>

<style scoped>

</style>
