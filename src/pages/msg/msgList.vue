<template>
	<div class="msgList">
		
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
		      label="内容"
		      prop="msgcon"
		      >
		    </el-table-column>
		    <el-table-column
		      label="邮箱"
		      prop="email"
		      >
		    </el-table-column>
		    <el-table-column
		      label="名称"
		      prop="namer"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="ctime"
		      label="时间"
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
		name:'diaryList',
		data(){
			return{
				tableData:[],
				loading:true,
				page:1,
				pagesize:10,
				total:0,
				ids:''
			}
		},
		activated(){
			this.getData()
		},
		
		methods:{
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
		          
					this.$axios.post('api/admin/delete_m.html',params).then( (res) => {
						if(res.status==200){
							this.$notify({
					          message: '留言删除成功!',
					          type: 'success'
					        })
							this.getData()
						}
					})
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
			},
			handleDelete(index,item){
				
				let params = {
		          	ids:item._id
		          }
				
				this.del(params)
			},
			
			handleSelectionChange(val){
				let arr = []
				for(let v of val){
					arr.push(v._id)
				}
				this.ids = arr.join(',')
			},
			handleCurrentChange(val){
				this.page = val
				this.getData()
			},
			getData(){
				let params = {
					page:this.page,
					pagesize:this.pagesize,
					type:1
				}
				
				this.loading = true
				this.$axios.get('api/admin/msglist_m.html',{params:params}).then( (res) => {
					if(res.status==200){
						this.loading = false
						let len = res.data.length-1
						this.total = res.data[len]
						this.tableData = res.data
						if(this.tableData.length){
							this.tableData.pop()
						}
						
					}
				})
			},
			
		}
	}
</script>

<style>
</style>