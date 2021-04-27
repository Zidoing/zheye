<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="" class="form-label">文章标题:</label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text">
        </validate-input>
      </div>
      <div class="mb-3">
        <label for="" class="form-label">文章详情:</label>
        <validate-input
          tag="textarea"
          rows="10"
          :rules="contentRules"
          v-model="contentVal"
          placeholder="请输入文章标题"
          type="text">
        </validate-input>
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary">创建</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { PostProps } from '@/testData'

export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const titleVal = ref('')
    const router = useRouter()
    const store = useStore()

    const titleRules: RulesProp = [
      {
        type: 'required',
        message: '文章标题不能为空'
      }
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      {
        type: 'required',
        message: '文章详情不能为空'
      }
    ]

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user
        const newPost: PostProps = {
          id: new Date().getTime(),
          createdAt: '12321',
          columnId,
          title: titleVal.value,
          content: contentVal.value
        }
        store.commit('createPost', newPost)
        router.push({
          name: 'column',
          params: { id: columnId }
        })
      }
    }

    return {
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      onFormSubmit

    }
  }
})

</script>
