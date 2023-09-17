import { defineStore } from 'pinia'
import { articlesId } from '@/services/blogService.js'

export const useStore = defineStore('store', {
  state: () => ({
    blogData: {
      title: '',
      description: ''
    }
  }),
  actions: {
    async fetchDataBlog(id) {
      try {
        const res = await articlesId(id)
        const newData = res.data
        this.blogData = newData
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    blogTitle() {
      return this.blogData.title
    },
    blogDescription() {
      return this.blogData.description
    }
  }
})
