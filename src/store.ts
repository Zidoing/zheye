import { Commit, createStore } from 'vuex'
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
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  createdAt: string;
  column: string;
}

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number
}

export interface GlobalDataProps {
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}

const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: [],
    posts: [],
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
    },
    fetchColumn (state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts (state, rawData) {
      state.posts = rawData.data.list
    },
    setLoading (state, status) {
      state.loading = status
    }
  },
  // vue里面的计算属性
  getters: {

    getColumnById: (state) => (id: string) => {
      console.log(state.columns, 'sss')
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: (state) => {
      return (cid: string) => state.posts.filter(post => post.column === cid)
    }
  },

  actions: {
    // 使用 async await 方式获取数据
    async fetchColumns ({ commit }) {
      await getAndCommit('columns', 'fetchColumns', commit)
    },

    fetchColumn ({ commit }, cid) {
      getAndCommit(`columns/${cid}`, 'fetchColumn', commit)
    },

    fetchPosts ({ commit }, cid) {
      axios.get(`columns/${cid}/posts`).then(response => {
        commit('fetchPosts', response.data)
      })
    }
  }
})

export default store
