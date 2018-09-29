<template>
	<div class="manageList">
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
		    >
		    <el-table-column
		      type="index"
		      width="55"
		      >
		    </el-table-column>
		    <el-table-column
		      label="用户名"
		      prop="username"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="role"
		      label="角色"
		      width="120">
		    </el-table-column>
		    
		    <el-table-column
		      prop="sort"
		      label="序号"
		      width='150'
		      >
		    </el-table-column>
		    
		    
		    
		    <el-table-column label="操作" width='260'>
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		          <el-button
		          size="mini"
		          type="primary"
		          @click="handleEdit(scope.$index, scope.row,true)">编辑</el-button>
		          <el-button
		          size="mini"
		          type="primary"
		          @click="handleAdd(scope.$index, scope.row,false)">新增</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		
		<!--编辑-->
		<el-dialog title="编辑" :visible.sync="status" :close-on-click-modal="false" size="tiny" @close="pwdDialogClose()" width='500px'>
			<el-form :model="editData" ref="Form" :rules="FormRules">
				<el-form-item label="用户名"  prop="username">
	              <el-input type="text" v-model="editData.username" auto-complete="off"></el-input>
	            </el-form-item>
	            <el-form-item label="密码"  prop="password">
	              <el-input type="password" v-model="editData.password" auto-complete="off"></el-input>
	            </el-form-item>
	            <el-form-item v-if='isEdit' label="角色"  prop="role">
	              <el-input  type="text" v-model="editData.role" auto-complete="off" disabled></el-input>
	            </el-form-item>
	            
	            <el-form-item v-else label="角色"  prop="role">
	              <el-select  v-model="editData.role" placeholder="请选择" style='width: 100%;'>
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
	            </el-form-item>
	            
	            <el-form-item label="序号"  prop="sort">
	              <el-input type="number" v-model="editData.sort" auto-complete="off"></el-input>
	            </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center;">
	          <el-button @click="pwdDialogClose()" style='width: 220px;'>取 消</el-button>
	          <el-button v-if='isEdit' type="primary" @click="save()" style='width: 220px;'>确 定</el-button>
	          <el-button v-else type="primary" @click="add()" style='width: 220px;'>保存</el-button>
	        </div>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		name:'manageList',
		data(){
			return{
				tableData:[],
				loading:true,
				status:false,
				isEdit:true,
				editData:{},
				options: [{
		          value: '超级管理员',
		          label: '超级管理员'
		        }, {
		          value: '普通管理员',
		          label: '普通管理员'
		        }],
				FormRules:{
					username: [
			            { required: true, message: '请输入用户名' }
			        ],
			        password: [
			            { required: true, message: '请输入密码' }
			        ],
			        role: [
			            { required: true, message: '请输入角色' }
			        ],
			        sort: [
			            { required: true, message: '请输入序号' }
			        ],
				}
			}
		},
		activated(){
			this.getData()
		},
		methods:{
			handleAdd(index,item,flag){
				this.isEdit = flag
				this.editData = {}
				this.status = true
			},
			add(){
				let params = {
					username:this.editData.username,
					password:this.editData.password,
					role:this.editData.role,
					sort:this.editData.sort,
					type:1,
				}
				this.$axios.post(this.API_URL+'/admin/add_user.html',params).then( (res) => {
					if(res.status==200){
						this.$notify({
				          message: '保存成功!',
				          type: 'success'
				        })
						this.status = false
						this.getData()
					}
				}).catch( () => {
					this.$message({
			          message: '出错啦!',
			          type: 'error'
			        })
				})
			},
			save(){
				let params = {
					username:this.editData.username,
					password:this.editData.password,
					editid:this.editData._id,
					role:this.editData.role,
					sort:this.editData.sort,
					type:1,
				}
				this.$axios.post(this.API_URL+'/admin/save_edituser.html',params).then( (res) => {
					if(res.status==200){
						this.$notify({
				          message: '保存成功!',
				          type: 'success'
				        })
						this.status = false
					}
				}).catch( () => {
					this.$message({
			          message: '出错啦!',
			          type: 'error'
			        })
				})
			},
			//关闭编辑弹窗
			pwdDialogClose(){
				this.status = false
			},
			getData(){
				this.loading = true
				let params = {
					type:1
				}
				this.$axios.get(this.API_URL+'/admin/userlist.html',{params:params}).then( (res) => {
					if(res.status==200){
						this.loading = false
						this.tableData = res.data
					}
				})
			},
			//编辑
			handleEdit(index,item,flag){
				this.isEdit = flag
				this.editData = item
				this.status = true
			},
			//删除
			handleDelete(index,item){
				this.$confirm('此操作将永久删除该链接, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
					let params = {
						type:1,
						id:item._id
					}
					this.$axios.get(this.API_URL+'/admin/delete_u.html').then( (res) => {
						if(res.status==200){
							this.$notify({
					          message: '链接删除成功!',
					          type: 'success'
					        })
							this.getData()
						}
					}).catch( () => {
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
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
</style>