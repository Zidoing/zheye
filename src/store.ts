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
  nickName?: string;
  id?: number;
  column?: string
}

export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

export interface GlobalDataProps {
  error: GlobalErrorProps;
  token: string;
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}

const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}
const store = createStore<GlobalDataProps>({
  state: {
    error: {
      status: false
    },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: [],
    posts: [],
    user: {
      isLogin: false,
      nickName: 'zidon',
      column: '1'
    }
  },
  mutations: {
    // login (state) {
    //   console.log('doing login')
    //   state.user = {
    //     ...state.user,
    //     isLogin: true,
    //     name: 'zhoulei'
    //   }
    //   console.log(state.user)
    // },
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
    },
    login (state, rawData) {
      state.token = rawData.data.token
      axios.defaults.headers.common.Authorization = `Bearer ${state.token}`
      localStorage.setItem('token', state.token)
    },
    fetchCurrentUser (state, rawData) {
      state.user = {
        isLogin: true,
        ...rawData.data
      }
    },
    setError (state, e: GlobalErrorProps) {
      state.error = e
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
    },
    login ({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload)
    },
    fetchCurrentUser ({ commit }) {
      getAndCommit('user/current', 'fetchCurrentUser', commit)
    },
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  }
})

export default store
