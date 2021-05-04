<template>
  <div>
    <uploader action="/upload" :before-upload="beforeUpload" @file-uploaded="onFileUploaded">
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" alt="" width="500">
      </template>
    </uploader>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps, ImageProps, ResponseType } from '@/store'
import ColumnList from '@/components/ColumnList.vue'
import Uploader from '@/components/Uploader.vue'
import createMessage from '@/components/createMessage'

export default defineComponent({
  name: 'Home',
  components: {
    Uploader,
    ColumnList
  },
  setup () {
    const store = useStore<GlobalDataProps>()

    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    const list = computed(() => store.state.columns)

    const beforeUpload = (file: File) => {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        createMessage('not jpg', 'error')
      }
      return isJPG
    }

    const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
      console.log(rawData)
      createMessage(`上传图片ID ${rawData.data._id}`, 'success')
    }
    return {
      list,
      beforeUpload,
      onFileUploaded
    }
  }
})
</script>

<style scoped>

</style>
