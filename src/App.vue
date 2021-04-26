<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱</label>
        <validate-input
          ref="inputRef"
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

    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1专栏',
    description: '这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个',
    avatar: 'https://avatars.githubusercontent.com/u/29775873?v=4'
  }, {
    id: 2,
    title: 'test1专栏',
    description: '这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个'
  },
  {
    id: 3,
    title: 'test1专栏',
    description: '这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个',
    avatar: 'https://avatars.githubusercontent.com/u/29775873?v=4'
  }, {
    id: 4,
    title: 'test1专栏',
    description: '这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个',
    avatar: 'https://avatars.githubusercontent.com/u/29775873?v=4'
  }
]

const currentUser: UserProps = {
  isLogin: true,
  name: '周磊',
  id: 1
}
export default defineComponent({
  name: 'App',
  components: {
    ValidateForm,
    ValidateInput,
    GlobalHeader,
    ColumnList
  },
  setup () {
    const inputRef = ref<any>(null)
    const emailVal = ref('')
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const onFormSubmit = (result: boolean) => {
      console.log(inputRef.value)
      console.log(inputRef.value.validateInput())
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

    const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    const validateEmail = () => {
      if (emailRef.val.trim() === '') {
        emailRef.error = true
        emailRef.message = 'can not be empty'
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true
        emailRef.message = 'should be validate email'
      } else {
        emailRef.error = false
      }
    }
    return {
      emailRef,
      emailVal,
      passwordVal,
      passwordRules,
      inputRef,
      onFormSubmit,
      validateEmail,
      list: testData,
      user: currentUser,
      emailRules
    }
  }
})
</script>

<style></style>
