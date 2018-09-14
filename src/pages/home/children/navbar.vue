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
			<li></li>
		</ul>
	</div>
</template>

<script>
	export default{
		name:'bavbar',
		data(){
			return{
				status:false
			}
		},
		methods:{
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
			flex: 6;
		}
		.content li:nth-child(3){
			flex: 16;
		}
	}
</style>