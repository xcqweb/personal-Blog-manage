<template>
	<div class="navbar">
		<ul class="content">
			<li>
				<i class="el-icon-more closeMenu" :class="{'rotate':$store.state.isCollapse}" @click="close"></i>
			</li>
			<li>
				<el-breadcrumb separator-class="el-icon-arrow-right">
				  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				  <el-breadcrumb-item :to="{path:$route.path}" v-show="$route.path!='/'">{{$route.meta.title}}</el-breadcrumb-item>
				</el-breadcrumb>
			</li>
			<li>
				<div class="right-menu">
			      <!-- <error-log class="errLog-container right-menu-item"></error-log> -->
		
			      <el-tooltip effect="dark" content="全屏" placement="bottom">
			        <screenfull class="screenfull right-menu-item"></screenfull>
			      </el-tooltip>
		
			      <!-- <lang-select class="international right-menu-item"></lang-select> -->
			      <el-dropdown class="avatar-container right-menu-item" trigger="click">
			        <div class="avatar-wrapper">
			          <!-- <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'"> -->
			          {{user.username}}
			          <i class="el-icon-caret-bottom"></i>
			        </div>
			        <el-dropdown-menu slot="dropdown" placement='top'>
			          <router-link to="/">
			            <el-dropdown-item>
			              	首页
			            </el-dropdown-item>
			          </router-link>
			          <el-dropdown-item divided>
			            <span @click="logout" style="display:block;">退出</span>
			          </el-dropdown-item>
			          <el-dropdown-item divided>
			            <span @click="status=true" style="display:block;">修改密码</span>
			          </el-dropdown-item>
			        </el-dropdown-menu>
			      </el-dropdown>
			    </div>
			</li>
		</ul>
		<reset-psw
			:status='status'
		></reset-psw>
	</div>
</template>

<script>
	import Screenfull from '@/components/Screenfull'
	import resetPsw from './resetPsw'
	export default{
		name:'bavbar',
		data(){
			return{
				status:false,
				name:'admin'
			}
		},
		components:{Screenfull,resetPsw},
		methods:{
			logout(){
				sessionStorage.clear('token')
				localStorage.clear('user')
		      	location.reload()
			},
			close(){
				this.$store.state.isCollapse = !this.$store.state.isCollapse
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.navbar{
		height: 70px;
		border-bottom: 1px solid #eee;
		.rotate{
			transform: rotateZ(90deg);
		}
		.content{
			display: flex;
		}
		.content li{
			display: flex;
			height: 60px;
			line-height: 36px;
			align-items: center;
			margin-top: 10px;
		}
		.content li:nth-child(1){
			flex: 1;
			font-size: 20px;
			margin-left: 10px;
		}
		.content li:nth-child(2){
			margin-left: 10px;
			flex: 10000;
		}
	}
	
	.right-menu {
    float: right;
    height: 100%;
    .right-menu-item {
      vertical-align: middle;
      display: inline-block;
      margin: 0 4px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        line-height: 54px;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -16px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
</style>