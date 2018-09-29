<template>
	<div class="linkList">
		<p class="delAll" v-show="ids">
				<el-button
		          size="mini"
		          type="danger"
		          @click="delMore">
		          	删除多项
		          </el-button>
			</p>
		<!--表格-->
	  		<el-table
		    ref="multipleTable"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 96%;margin: 10px  auto 36px auto;text-align: center;min-width: 1000px;"
		    border
		    stripe
		    show-overflow-tooltip
		    v-loading='loading'
		    @selection-change="handleSelectionChange"
		    >
		    <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
		    <el-table-column
		      type="index"
		      width="55"
		      >
		    </el-table-column>
		    <el-table-column
		      label="链接"
		      prop="links"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="namer"
		      label="名称"
		      width="120">
		    </el-table-column>
		    
		    <el-table-column
		      prop="ltime"
		      label="发布时间"
		      width='150'
		      >
		    </el-table-column>
		    
		    
		    
		    <el-table-column label="操作" width='160'>
		      <template slot-scope="scope">
		        <el-button
		          v-show = '!ids'
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default{
		name:'linkList',
		data(){
			return{
				tableData:[],
				loading:false,
				ids:''
			}
		},
		methods:{
			getData(){
				this.$axios.get(this.API_URL+'/admin/linkList_m.html').then( (res) => {
						if(res.status==200){
							this.tableData = res.data
						}
						
					}).catch( () => {
						this.$message({
				          message: '出错啦!',
				          type: 'error'
				        })
					})
			},
			handleDelete(index,item){
				let params = {
		          	ids:item._id,
					type:1
		          }
				
				this.del(params)
			},
			del(params){
				this.$confirm('此操作将永久删除该链接, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          
					this.$axios.post(this.API_URL+'/admin/delete_link.html',params).then( (res) => {
						if(res.status==200){
							this.$notify({
					          message: '链接删除成功!',
					          type: 'success'
					        })
							this.getData()
						}
					}).catch( () => {
						this.loading = false
						this.$message({
				          message: '出错啦!',
				          type: 'error'
				        })
					})
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
			},
			handleSelectionChange(val){
				let arr = []
				for(let v of val){
					arr.push(v._id)
				}
				this.ids = arr.join(',')
			},
			
			delMore(){
				let params = {
					ids:this.ids,
					type:1
				}
				this.del(params)
			},
		},
		
		activated(){
			this.getData()
		}
	}
</script>

<style scoped="scoped" lang="less">
</style>