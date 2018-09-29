<template>
	<div class="addLink">
		<div style="margin-top: 30px;">
			<span style="margin-left: 30px;">网址</span>
			<el-input placeholder="请输入网址" v-model="v1" style='width: 60%;margin-left: 20px;'>
		    	<template slot="prepend">Http://</template>
		  	</el-input>
		</div>
		
		<div style="margin-top: 30px;">
			<span style="margin-left: 30px;">名称</span>
			<el-input placeholder="请输入名称" v-model="v2" style='width: 60%;margin-left: 20px;'>
		  	</el-input>
		</div>
		
		<div style="margin-top: 30px;">
			<span style="margin-left: 30px;">序号</span>
			<el-input-number style="margin-left: 20px;width: 60%;" v-model="num1" :min="1" label="描述文字"></el-input-number>
		</div>
	  	
	  	<el-button type="primary" style="margin-top: 30px;margin-left:86px;width: 60%;" @click='save'>保存</el-button>
	</div>
</template>

<script>
	export default{
		name:"addLink",
		data(){
			return{
				v1:'',
				v2:'',
				num1:1,
			}
		},
		methods:{
			save(){
				let params = {
					links:'http://'+this.v1,
					namer:this.v2,
					sort:this.num1,
					type:1,
				}
				this.$axios.post(this.API_URL+'/admin/add_friendLink.html',params).then( (res) => {
					if(res.status==200){
						this.$notify({
				          message: '恭喜你，新增成功!',
				          type: 'success'
				        })
						this.v1 = ''
						this.v2 = ''
						this.num1 = ''
						this.$router.push('link_list')
					}
					
				}).catch( () => {
					this.$message({
			          message: '出错啦!',
			          type: 'error'
			        })
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">

</style>