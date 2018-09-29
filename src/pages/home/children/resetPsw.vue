<template>
		<el-dialog title="修改密码" :visible.sync="status" :close-on-click-modal="false" size="tiny" @close="pwdDialogClose()" width='500px'>
	        <el-form :model="pwdForm" ref="pwdForm" :rules="pwdFormRules">
	            <el-form-item label="原密码" prop="old_password">
	              <el-input type="password" v-model="pwdForm.old_password" auto-complete="off"></el-input>
	            </el-form-item>
	            <el-form-item label="新密码"  prop="new_password">
	              <el-input type="password" v-model="pwdForm.new_password" auto-complete="off"></el-input>
	            </el-form-item>
	            <el-form-item label="确认密码"  prop="confirm_assword">
	              <el-input type="password" v-model="pwdForm.confirm_assword" auto-complete="off"></el-input>
	            </el-form-item>
	        </el-form>
	        <div slot="footer" class="dialog-footer" style="text-align: center;">
	          <el-button @click="pwdDialogClose()" style='width: 220px;'>取 消</el-button>
	          <el-button type="primary" @click="alterPwd()" style='width: 220px;'>确 定</el-button>
	        </div>
	    </el-dialog>
</template>

<script>
	export default{
		 
		data(){
			var validatePass = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.pwdForm.new_password) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		      };
			return {
				pwdForm: {
		        old_password: '',
		        new_password: '',
		        confirm_assword:''
		      },
		      pwdFormRules: {
		         old_password: [
		            { required: true, message: '请输入原密码' }
		          ],
		          new_password: [
		            { required: true, message: '请输入新密码'}
		          ],
		          confirm_assword: [
		            {  validator: validatePass}
		          ]
		      },
		      flag:true
			}
		},
		props:{
			status:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			//修改密码
	        alterPwd() {
	          let _this = this;
	          _this.$refs.pwdForm.validate((valid) => {
	            if(valid) {
	                if(this.flag){
	                	this.flag = false
	                	let params = Object.assign({username:this.user.username}, _this.pwdForm);
		                this.$axios.post(this.API_URL+'/admin/save_editpassword.html',params).then( (res) => {
		                	if(res.data.errcode==0){
		                		this.$message({
						          message: '修改成功!',
						          type: 'success'
						        });
						        this.flag = true
						        this.$parent.status = false
		                	}else if(res.data.errcode==1111){
		                		this.$message({
						          message: '新密码和确认密码不一致!',
						          type: 'warning'
						        });
						        this.flag = true
		                	}else if(res.data.errcode==1233){
		                		this.$message.error( '原密码错误!');
		                		this.flag = true
		                	}else{
		                		this.$message.error( '保存失败!');
		                		this.flag = true
		                	}
		                }).catch( () => {
		                	this.flag = true
		                })
	                }
	            }
	        })
	        },
	        pwdDialogClose() {
	          this.$parent.status = false
	          this.$refs['pwdForm'].resetFields();
	        },
		}
	}
</script>

<style>
</style>