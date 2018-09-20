<template>
	<div class="slidebar" :class="{close:$store.state.isCollapse}">
		
		<el-menu 
			default-active="$route.path"
			router
			class="el-menu-vertical-demo"
			:collapse="$store.state.isCollapse"
			background-color="#545c64"
      		text-color="#fff"
      		active-text-color="#ffd04b"
      		unique-opened
			  >
		  <!--文章管理-->
		  <el-submenu index="1">
		    <template slot="title">
		      <i class="el-icon-edit" style="color: #ccc;"></i>
		      <span slot="title">文章管理</span>
		    </template>
		    <el-menu-item-group>
		      <el-menu-item index="add_article">新增文章</el-menu-item>
		      <!--<el-menu-item index="public_article">发布文章</el-menu-item>-->
		      <el-menu-item index="temp_edit_article">临时编辑文章</el-menu-item>
		      <el-menu-item index="article_list">文章列表</el-menu-item>
		      <el-menu-item index="edit_article_list">编辑文章列表</el-menu-item>
		      <!--<el-menu-item index="catgory_article">文章分类</el-menu-item>-->
		    </el-menu-item-group>
		  </el-submenu>
		  
		  <!--日记管理-->
		  <el-submenu index="2">
		    <template slot="title">
		      <i class="el-icon-message" style="color: #ccc;"></i>
		      <span slot="title">日记管理</span>
		    </template>
		    <el-menu-item-group>
		      <el-menu-item index="add_diary">新增日记</el-menu-item>
		      <el-menu-item index="diary_list">日记列表</el-menu-item>
		    </el-menu-item-group>
		  </el-submenu>
		  
		  <!--留言管理-->
		  <el-submenu index="3">
		    <template slot="title">
		      <i class="el-icon-news" style="color: #ccc;"></i>
		      <span slot="title">留言管理</span>
		    </template>
		    <el-menu-item-group>
		      <el-menu-item index="msg_list">留言列表</el-menu-item>
		    </el-menu-item-group>
		  </el-submenu>
		  
		  <!--友情链接管理-->
		  <el-submenu index="4">
		    <template slot="title">
		      <i class="el-icon-share" style="color: #ccc;"></i>
		      <span slot="title">友情链接管理</span>
		    </template>
		    <el-menu-item-group>
		      <el-menu-item index="add_link">新增链接</el-menu-item>
		      <el-menu-item index="link_list">链接列表</el-menu-item>
		    </el-menu-item-group>
		  </el-submenu>
		  
		  
		  <!--管员管理管理-->
		  <el-submenu index="5">
		    <template slot="title">
		      <i class="el-icon-setting" style="color: #ccc;"></i>
		      <span slot="title">管理员管理</span>
		    </template>
		    <el-menu-item-group>
		      <el-menu-item index="add_manage">新增管理员</el-menu-item>
		      <el-menu-item index="manage_list">管理员列表</el-menu-item>
		      <el-menu-item index="log_list">日志列表</el-menu-item>
		    </el-menu-item-group>
		  </el-submenu>
		  
		</el-menu>
	</div>
</template>

<script>
	export default{
		name:'slidebar',
		 data() {
	      return {
	      };
	    },
	    watch:{
	    	$route:function(newVal,oldVal){
	    		this.$store.dispatch('addTag',{path:newVal.path,title:newVal.meta.title,id:newVal.query.id,tem:newVal.query.tem})
	    	}
	    },
	    methods:{
	    }
	}
</script>

<style scoped="scoped" lang="less">
	.slidebar{
		background-color: #545c64;
		height: 100vh;
		position: relative;
		width: 200px;
		transition: all 0.5s ease-out;
		.el-menu{
			border: none;
		}
	}
	
	.close{
			width: 64px !important;
			transition: all 0.5s ease-in-out;
		}
</style>