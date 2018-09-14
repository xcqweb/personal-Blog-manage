import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/pages/home/main'),
      meta:{title:'首页'},
      children:[
      	{
      		path:'/',
      		name:'index',
      		component: () => import('@/pages/home/children/index'),
      		meta:{title:'首页'},
      	},
      	{
      		path:'add_article',
      		name:'add_article',
      		component: () => import('@/pages/articles/addArticle'),
      		meta:{title:'新增文章'},
      	},
      	{
      		path:'public_article',
      		name:'public_article',
      		component: () => import('@/pages/articles/publicArticle'),
      		meta:{title:'发布文章'},
      	},
      	{
      		path:'temp_edit_article',
      		name:'temp_edit_article',
      		component: () => import('@/pages/articles/tempEditArticle'),
      		meta:{title:'临时编辑文章'},
      	},
      	{
      		path:'article_list',
      		name:'article_list',
      		component: () => import('@/pages/articles/articleList'),
      		meta:{title:'文章列表'},
      	},
      	{
      		path:'edit_article_list',
      		name:'edit_article_list',
      		component: () => import('@/pages/articles/editArticleList'),
      		meta:{title:'编辑文章列表'},
      	},
      	{
      		path:'catgory_article',
      		name:'catgory_article',
      		component: () => import('@/pages/articles/catgoryArticle'),
      		meta:{title:'文章分类'},
      	},
      	{
      		path:'edit_article',
      		name:'edit_article',
      		component: () => import('@/pages/articles/editArticle'),
      		meta:{title:'编辑文章'},
      	},
      ]
    }
  ]
})
