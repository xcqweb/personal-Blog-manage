<template>
	<div class="addArticle" v-loading='loading'>
		
		<span style="font-size: 14px;margin-right: 10px;">类别 :</span>
		<el-select v-model="v1" filterable placeholder="请选择" size='mini'>
		    <el-option
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		</el-select>
		
		<span style="font-size: 14px;margin: 0 10px 0 10px;">标题 :</span>
		<el-input v-model="v2" style='width: 200px;margin-right: 10px;' size='mini' placeholder="请输入标题"></el-input>
		
		<quill-editor
			class='edit'
			v-model="content"
            :options="editorOption"
            >
  		</quill-editor>
  		
  		<el-button type="primary" style='margin-top: 20px;width: 100%;' @click='save'>保存</el-button>
	</div>
</template>

<script>
	export default{
		name:'addArticle',
		data(){
			return{
				loading:true,
				content: '',
		        editorOption: {},
		        v1:'全部',
				v2:'',
				v3:'chase',
				reData:{},
				options: [{
		          value: '全部',
		          label: '全部'
		        },{
		          value: 'javascript',
		          label: 'javascript'
		        }, {
		          value: 'html',
		          label: 'html'
		        }, {
		          value: 'css',
		          label: 'css'
		        }, {
		          value: '框架',
		          label: '框架'
		        }, {
		          value: 'nodejs',
		          label: 'nodejs'
		        }, {
		          value: '爱生活',
		          label: '爱生活'
		        },{
		          value: '其他',
		          label: '其他'
		        }],
			}
		},
		activated(){
			
			if(!this.$route.query.id)return
			let params = {
				id:this.$route.query.id,
				type:1
			}
			this.loading = true
			let url = this.$route.query.tem?this.API_URL+'/admin/temedit.html':this.API_URL+'/admin/vedit.html'
			this.$axios.get(url,{params:params}).then( (res) => {
				if(res.status==200){
					this.loading = false
					this.v1 = res.data.classify
					this.v2 = res.data.title
					this.content = res.data.content
					this.reData = res.data
				}
				
			})
		},
		
		methods:{
			save : _.debounce(function(){
				let params = {
					title : this.v2,
					imgUrl : this.reData.imgUrl,
					author : this.reData.author,
					content : this.content,
					classify : this.v1,
					id : this.$route.query.id,
					type:1
				}
				this.loading = true
				let url = this.$route.query.tem?this.API_URL+'/admin/temsave_edit.html':this.API_URL+'/admin/save_edit.html'
				this.$axios.post(url,params).then( (res) => {
					if(res.data.status==200){
						this.loading = false
						this.$notify({
				          message: '恭喜你，文章保存成功!',
				          type: 'success'
				        })
						this.$store.dispatch('delSingleTag','/edit_article').then( () => {
							if(this.$route.query.tem){
								this.$router.push('/edit_article_list')
							}else{
								this.$router.push('/article_list')
							}
							
						})
						
					}
				})
			},1000)
		}
	}
</script>

<style scoped="scoped" lang="less">
.addArticle{
	margin: 20px;
	.edit{
		margin-top: 36px;
	}
	
}

</style>