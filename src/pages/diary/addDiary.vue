<template>
	<div class="addDiary" v-loading='loading'>
		<quill-editor
			v-model="content"
            :options="editorOption"
            >
  		</quill-editor>
  		<el-button type="primary" style='margin: 20px auto;width: 88%;position: absolute;' @click='save'>保存</el-button>
	</div>
</template>

<script>
	export default{
		name:'addDiary',
		data(){
			return{
				content: '',
		        editorOption: {},
		        loading:false
			}
		},
		activated(){
			if(this.$route.query.tem){
				let params = {
					id:this.$route.query.id,
					type:1
				}
				this.$axios.get(this.API_URL+'/admin/edit_d.html',{params:params}).then( (res) => {
					if(res.status==200){
						this.content = res.data.content
					}
				})
			}
			
		},
		methods:{
			save(){
				this.loading = true
				let url,params;
				if(this.$route.query.tem){
					url = this.API_URL+'/admin/save_diaryedit.html'
					params = {
						editid:this.$route.query.id,
						content:this.content,
						type:1
					}
				}else{
					url = this.API_URL+'/admin/add_diary.html'
					params = {
						content:this.content,
						type:1
					}
				}
				
				this.$axios.post(url,params).then( (res) => {
					if(res.status==200){
						this.loading = false
						this.$notify({
				          message: '恭喜你，日记发表成功!',
				          type: 'success'
				        })
						this.content = ''
						
						this.$store.dispatch('delSingleTag','/add_diary').then( () => {
							this.$router.push('/diary_list')
						})
					}
				}).catch( () => {
					this.loading = false
					this.$notify({
			          message: '发表失败!',
			          type: 'success'
			        })
				})
			}
		}
	}
</script>

<style>
</style>