<template>
	<div class="tempEditArticle">
		
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
  		
  		<el-button type="primary" style='margin: -60px auto;width: 86%;position: absolute;' @click='save'>保存</el-button>
	</div>
</template>

<script>
	import {debounce} from 'lodash'
	export default{
		name:'tempEditArticle',
		data(){
			return{
				content: '',
		        editorOption: {},
		        v1:'全部',
				v2:'',
				v3:'chase',
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
		methods:{
			save : debounce(function(){
				let params = {
					title : this.v2,
					imgUrl : '',
					author : 'chase',
					content : this.content,
					classify : this.v1,
					type:1
				}
				this.loading = true
				this.$axios.post(this.API_URL+'/admin/saveTem.html',params).then( (res) => {
					if(res.status==200){
						this.loading = false
						this.$notify({
				          message: '恭喜你，文章保存成功!',
				          type: 'success'
				        })
						this.v1 = ''
						this.v2 = ''
						this.content = ''
						this.$router.push('/edit_article_list')
						
					}
				}).catch( () => {
					this.loading = false
					this.$message({
			          message: '出错啦!',
			          type: 'error'
			        })
				})
			},1000)
				
		}
	}
</script>

<style scoped="scoped" lang="less">
.tempEditArticle{
	margin: 20px;
	.edit{
		margin-top: 36px;
	}
}


</style>