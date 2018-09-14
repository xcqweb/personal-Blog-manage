<template>
	<div class="mains">
		<!--侧栏-->
    	<slidebar class="sidebar-container"></slidebar>
    	<!--主题部分-->
    	<div class="main-container">
	    	<!--顶部导航-->
	     	<navbar></navbar>
	     	<!--标签 -->
		    <tags></tags>
		    <!--主页面-->
		    <app-main></app-main>
	    </div>
	</div>
</template>

<script>
	import slidebar from '@/pages/home/children/slidebar'
	import tags from '@/pages/home/children/tags'
	import appMain from '@/pages/home/children/appMain'
	import navbar from '@/pages/home/children/navbar'
	export default{
		name:'mains',
		components:{
			slidebar,
			tags,
			appMain,
			navbar
		}
	}
</script>

<style scoped="scoped" lang="less">
	.mains{
		width: 100%;
		display: flex;
		.main-container{
			flex: auto;
		}
	}
	
	
</style>