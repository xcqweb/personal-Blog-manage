<template>
	<div class="logList">
		<p style="width: 96%;margin: auto;">
			<el-button
		          v-show = 'ids'
		          size="mini"
		          type="danger"
		          @click="delMore">删除多项</el-button>
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
		      label="ip"
		      prop="ip"
		      >
		    </el-table-column>
		    <el-table-column
		      label="内容"
		      prop="content"
		      >
		    </el-table-column>
		    <el-table-column
		      label="操作时间"
		      prop="optime"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="username"
		      label="用户名"
		      width="120">
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
		
		<!--分页-->
		<el-pagination
		  style='text-align: center;'
	      @current-change="handleCurrentChange"
	      :current-page="page"
	      layout="total,prev, pager, next, jumper"
	      :total='total'
	      >
	    </el-pagination>
		
	</div>
</template>

<script>
	export default{
		name:'logList',
		data(){
			return{
				tableData:[],
				loading:true,
				ids:'',
				page:1,
				total:0
			}
		},
		methods:{
			getData(){
				let params = {
					pagesize:12,
					page:this.page,
					type:1
				}
				this.$axios.get(this.API_URL+'/admin/showlog.html',{params:params}).then( (res) => {
					if(res.status==200){
						this.loading = false
						let len = res.data.length-1
						this.total = res.data[len]
						this.tableData = res.data
						if(this.tableData.length){
							this.tableData.pop()
						}
					}
				}).catch( () => {
					this.loading = false
					this.$message({
			          message: '出错啦!',
			          type: 'error'
			        })
				})
			},
			delMore(){
				let params = {
					ids:this.ids
				}
				this.del(params)
			},
			del(params){
				this.$confirm('此操作将永久删除该留言, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          
					this.$axios.post(this.API_URL+'/admin/delete_log.html',params).then( (res) => {
						if(res.status==200){
							this.$notify({
					          message: '删除成功!',
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
			//分页
			handleCurrentChange(val){
				this.page = val
				this.getData()
			},
			//多选
			handleSelectionChange(val){
				let arr = []
				for(let v of val){
					arr.push(v._id)
				}
				this.ids = arr.join(',')
			},
			handleDelete(index,item){
				let params = {
		          	ids:item._id
		          }
				
				this.del(params)
			}
		},
		activated(){
			this.getData()
		}
	}
</script>

<style>
</style>