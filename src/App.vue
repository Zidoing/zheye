<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'

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
  }, {
    id: 5,
    title: 'test1专栏',
    description: '这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个这是一个',
    avatar: 'https://avatars.githubusercontent.com/u/29775873?v=4'
  }, {
    id: 6,
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
    GlobalHeader,
    ColumnList
  },
  setup () {
    return {
      list: testData,
      user: currentUser
    }
  }
})
</script>

<style>

</style>
