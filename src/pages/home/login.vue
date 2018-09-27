<template>
	<div class="login">
		<div class="con">
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="用户名" prop="username">
			    <el-input type="text" v-model="ruleForm.username" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="password" style='padding: 20px 0 !important; '>
			    <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')" style='width: 100%;' :loading='loading'>登录</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		name:'login',
		data(){
			
			return{
				loading:false,
				ruleForm: {
		          password: '',
		          username: ''
		        },
		        rules: {
		          password: [
		            {required: true, message: '请输入密码',trigger: 'blur' }
		          ],
		          username: [
		            { required: true, message: '请输入用户名',trigger: 'blur' }
		          ],
		        }
			}
		},
		methods:{
			submitForm(formName){
				
				this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	this.loading = true
		          	let parmas = {
		          		username:this.ruleForm.username,
		          		password:this.ruleForm.password,
		          		type:1
		          	}
		             axios.post(this.API_URL+'/admin/login_p.html',parmas).then( (res) => {
		             	console.log(res.data)
		             	this.loading = false
		             	if(res.data.status==200){
		             		sessionStorage.token = res.data.token;
		             		this.$message.success('登录成功!');
		             		this.$router.push('/')
		             	}else if(res.data.status==126001){
		             		this.$message.error('用户名或密码错误!');
		             	}
		             }).catch( () => {
		             	this.loading = false
		             })
		          }
		        })
			},
			
		}
	}
</script>

<style scoped="scoped" lang="less">
	.login{
		width: 100vw;
		height: 100vh;
		position: fixed;
		background: #eee;
		.con{
			width: 30vw;
			height: 20vh;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			margin: 20vh auto;
			background-color: #fff;
			border-radius: 10px;
			padding: 100px 80px 100px 20px;
		}
	}
</style>