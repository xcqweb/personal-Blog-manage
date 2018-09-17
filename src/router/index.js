import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
    	path:'/login',
    	name:'login',
    	component: () => import('@/pages/home/login')
    },
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
      	{
      		path:'add_diary',
      		name:'add_diary',
      		component: () => import('@/pages/diary/addDiary'),
      		meta:{title:'新增日记'},
      	},
      	{
      		path:'diary_list',
      		name:'diary_list',
      		component: () => import('@/pages/diary/diaryList'),
      		meta:{title:'日记列表'},
      	},
      	{
      		path:'msg_list',
      		name:'msg_list',
      		component: () => import('@/pages/msg/msgList'),
      		meta:{title:'留言列表'},
      	},
      	{
      		path:'add_link',
      		name:'add_link',
      		component: () => import('@/pages/links/addLink'),
      		meta:{title:'新增链接'},
      	},
      	{
      		path:'link_list',
      		name:'link_list',
      		component: () => import('@/pages/links/linkList'),
      		meta:{title:'链接列表'},
      	},
      	{
      		path:'add_manage',
      		name:'add_manage',
      		component: () => import('@/pages/manage/addManage'),
      		meta:{title:'新增管理员'},
      	},
      	{
      		path:'manage_list',
      		name:'manage_list',
      		component: () => import('@/pages/manage/manageList'),
      		meta:{title:'管理员列表'},
      	},
      	{
      		path:'log_list',
      		name:'log_list',
      		component: () => import('@/pages/manage/logList'),
      		meta:{title:'日志列表'},
      	},
      ]
    }
  ]
})
