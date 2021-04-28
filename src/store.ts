import { createStore } from 'vuex'
import { testPosts } from './testData'
import axios from 'axios'

interface ImageProps {
  _id?: string;
  url?: string;
  createAt?: string
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: string;
}

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
    columns: [],
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
    },

    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    }
  },
  // vue里面的计算属性
  getters: {

    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: (state) => {
      return (cid: string) => state.posts.filter(post => post.columnId === cid)
    }
  },

  actions: {
    fetchColumns (context) {
      axios.get('columns?currentPage=1&pageSize=5').then(response => {
        context.commit('fetchColumns', response.data)
      })
    }
  }
})

export default store
