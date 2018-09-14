<template>
		<div class="articleList">
			<!--搜索-->
			<div class="search">
				<span style="font-size: 14px;margin-right: 10px;">类别 :</span>
				<el-select v-model="v1" filterable placeholder="请选择" size='mini'>
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
				
				<span style="font-size: 14px;margin: 0 10px 0 10px;">关键词搜索 :</span>
				<el-input v-model="v2" style='width: 200px;margin-right: 10px;' size='mini' placeholder="请输入关键词"></el-input>
				
				<el-button
		          size="mini"
		          type='primary'
		          icon="el-icon-search"
		          @click="search">
		                         搜索
		          </el-button>
			</div>
			
			<!--表格-->
	  		<el-table
		    ref="multipleTable"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 96%;margin: 36px auto;text-align: center;min-width: 1000px;"
		    border
		    stripe
		    show-overflow-tooltip
		    v-loading='loading'
		    @selection-change="handleSelectionChange">
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
		      label="标题"
		      prop="title"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="author"
		      label="作者"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="classify"
		      label="类别"
		      width='150'
		      >
		    </el-table-column>
		    
		    <el-table-column
		      prop="ctime"
		      label="发布时间"
		      >
		    </el-table-column>
		    
		    <el-table-column
		      prop="discuss"
		      label="评论"
		      width='120'
		      >
		    </el-table-column>
		    
		    <el-table-column
		      prop="help"
		      label="赞赏"
		      width='120'
		      >
		    </el-table-column>
		    
		    <el-table-column label="操作" width='160'>
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          type='primary'
		          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		        <el-button
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
	      :current-page="currentPage"
	      layout="total, prev, pager, next, jumper"
	      :total="pageSzie">
	    </el-pagination>
		
	</div>
</template>

<script>
	export default{
		name:'articleList',
		data(){
			return{
				tableData:[],
				currentPage:1,
				pageSzie:0,
				loading:true,
				v1:'全部',
				v2:'',
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
		created(){
			this.search()
		},
		activated(){
			this.search()
		},
		methods:{
			getData(params){
				this.$axios.get('api/admin/temlist.html',{params:params}).then( (res) => {
					if(res.status==200){
						this.loading = false
						let len = res.data.length-1
						this.tableData = res.data
						this.pageSzie = len<10?res.data[len]:res.data[len]*10
						if(this.tableData.length){
							this.tableData.pop()
						}
						
					}
				})
			},
			search(){
				let params = {
					pagesize:10,
					page:1,
					keyword:this.v2,
					classify:this.v1
				}
				this.getData(params)
			},
			handleSelectionChange(val){
				
			},
			handleEdit(index,item){
				console.log(index,item)
			},
			handleDelete(index,item){
				
			},
			handleCurrentChange(val){
				this.loading = true
				let params = {
					pagesize:10,
					page:val,
					keyword:this.v2,
					classify:this.v1
				}
				this.getData(params)
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.articleList{
		box-sizing: border-box;
		margin: 10px;
		height: calc(100vh - 100px);
		overflow: auto;
		.search{
			width: 96%;
			margin: 20px auto;
		}
	}
</style>