<template>
	<div class="tags">
		<el-tag
		  :key="tag.title"
		  v-for="(tag,index) in $store.state.tagViews"
		  size='medium'
		  closable
		  :type="$route.path==tag.path?'success':'info'"
		  :disable-transitions="false"
		  @close="handleClose(tag,index)"
		>
  		<router-link :to='{path:tag.path,query:{id:tag.id,tem:tag.tem}}' tag='span'>{{tag.title}}</router-link>
</el-tag>
	</div>
</template>

<script>
	export default{
		name:'tags',
		data(){
			return{
				
			}
		},
		created(){
			this.$store.dispatch('addTag',{path:this.$route.path,title:this.$route.query.tem?'临时编辑文章':this.$route.meta.title})
		},
		methods:{
			handleClose(val,index){
				this.$store.dispatch('delTag',index).then( (res) => {
					if(res.length){
						let last = res[res.length-1]
						this.$router.push(last.path)
					}else{
						this.$router.push('/')
					}
				})
			},
		}
	}
</script>

<style scoped="scoped" lang="less">
	.tags{
		height: 30px;
		border-bottom: 1px solid #eee;
		border-top: 1px solid #eee;
		.el-tag{
			margin-left: 6px;
		}
		
		.current{
			background-color: #429EFD;
			color: #fff;
		}
	}
</style>