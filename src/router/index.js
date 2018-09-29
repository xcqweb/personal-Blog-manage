import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

 const router = new Router({
  mode:'history',
  routes: [
    {
    	path:'/login',
    	name:'login',
    	component: () => import('@/pages/home/login'),
    	meta:{requiresAuth:false}
    },
    {
      path: '/',
      name: 'main',
      component: () => import('@/pages/home/main'),
      meta:{title:'首页',requiresAuth:true},
      children:[
      	{
      		path:'/',
      		name:'index',
      		component: () => import('@/pages/home/children/index'),
      		meta:{title:'首页',requiresAuth:true},
      	},
      	{
      		path:'add_article',
      		name:'add_article',
      		component: () => import('@/pages/articles/addArticle'),
      		meta:{title:'新增文章',requiresAuth:true},
      	},
      	{
      		path:'public_article',
      		name:'public_article',
      		component: () => import('@/pages/articles/publicArticle'),
      		meta:{title:'发布文章',requiresAuth:true},
      	},
      	{
      		path:'temp_edit_article',
      		name:'temp_edit_article',
      		component: () => import('@/pages/articles/tempEditArticle'),
      		meta:{title:'临时编辑文章',requiresAuth:true},
      	},
      	{
      		path:'article_list',
      		name:'article_list',
      		component: () => import('@/pages/articles/articleList'),
      		meta:{title:'文章列表',requiresAuth:true},
      	},
      	{
      		path:'edit_article_list',
      		name:'edit_article_list',
      		component: () => import('@/pages/articles/editArticleList'),
      		meta:{title:'编辑文章列表',requiresAuth:true},
      	},
      	{
      		path:'catgory_article',
      		name:'catgory_article',
      		component: () => import('@/pages/articles/catgoryArticle'),
      		meta:{title:'文章分类',requiresAuth:true},
      	},
      	{
      		path:'edit_article',
      		name:'edit_article',
      		component: () => import('@/pages/articles/editArticle'),
      		meta:{title:'编辑文章',requiresAuth:true},
      	},
      	{
      		path:'add_diary',
      		name:'add_diary',
      		component: () => import('@/pages/diary/addDiary'),
      		meta:{title:'新增日记',requiresAuth:true},
      	},
      	{
      		path:'diary_list',
      		name:'diary_list',
      		component: () => import('@/pages/diary/diaryList'),
      		meta:{title:'日记列表',requiresAuth:true},
      	},
      	{
      		path:'msg_list',
      		name:'msg_list',
      		component: () => import('@/pages/msg/msgList'),
      		meta:{title:'留言列表',requiresAuth:true},
      	},
      	{
      		path:'add_link',
      		name:'add_link',
      		component: () => import('@/pages/links/addLink'),
      		meta:{title:'新增链接',requiresAuth:true},
      	},
      	{
      		path:'link_list',
      		name:'link_list',
      		component: () => import('@/pages/links/linkList'),
      		meta:{title:'链接列表',requiresAuth:true},
      	},
      	{
      		path:'manage_list',
      		name:'manage_list',
      		component: () => import('@/pages/manage/manageList'),
      		meta:{title:'管理员列表',requiresAuth:true},
      	},
      	{
      		path:'log_list',
      		name:'log_list',
      		component: () => import('@/pages/manage/logList'),
      		meta:{title:'日志列表',requiresAuth:true},
      	},
      ]
    }
  ]
})

router.beforeEach( (to,from,next) => {
	let token = sessionStorage.getItem('token')
	if(to.meta.requiresAuth){
		if(token){
			next()
		}else{
			next({
				path:'/login'
			})
		}
	}else{
		next()
	}
	
})

export default router