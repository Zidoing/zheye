<template>
  <div>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import ColumnList from '@/components/ColumnList'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

export default defineComponent({
  name: 'Home',
  components: { ColumnList },
  setup () {
    const store = useStore<GlobalDataProps>()
    const list = computed(() => store.state.columns)
    return { list }
  }
})
</script>

<style scoped>

</style>
