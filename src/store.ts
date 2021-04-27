import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from './testData'

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: true,
      name: 'zidon',
      columnId: 1
    }
  },
  mutations: {
    login (state) {
      console.log('doing login')
      state.user = {
        ...state.user,
        isLogin: true,
        name: 'zhoulei'
      }
      console.log(state.user)
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    }
  },
  // vue里面的计算属性
  getters: {
    biggerColumnsLen (state) {
      return state.columns.filter(c => c.id > 2).length
    },
    getColumnById: (state) => (id: number) => {
      return state.columns.find(c => c.id === id)
    },
    getPostsByCid: (state) => {
      return (cid: number) => state.posts.filter(post => post.columnId === cid)
    }
  }
})

export default store
