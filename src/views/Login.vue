<template>
  <div>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          type="text"
          placeholder="请输入邮箱地址"
          class="hello there"
        >
        </validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          :rules="passwordRules"
          v-model="passwordVal"
          placeholder="请输入密码"
          class="hello there"
          type="password"
        >
        </validate-input>
      </div>
      <template v-slot:submit>
        <span class="btn btn-danger">submit</span>
      </template>

    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const emailVal = ref('')
    const router = useRouter()
    const store = useStore()

    const onFormSubmit = (result: boolean) => {
      if (result) {
        router.push({ name: 'home' })
        store.commit('login')
      }
    }
    const emailRules: RulesProp = [
      {
        type: 'required',
        message: '电子邮箱地址不能为空'
      },
      {
        type: 'email',
        message: '请输入正确的电子邮箱格式'
      }
    ]
    const passwordVal = ref('')
    const passwordRules: RulesProp = [
      {
        type: 'required',
        message: '密码不能为空'
      }
    ]

    return {
      emailVal,
      emailRules,
      passwordVal,
      passwordRules,
      onFormSubmit

    }
  }

})
</script>

<style scoped>

</style>
