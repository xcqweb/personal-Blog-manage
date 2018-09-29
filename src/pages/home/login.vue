<template>
	<div class="login" id="particles-js">
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
	import '../../../static/particles/particles.min.js'
	particlesJS.load('particles-js','../../../static/particles/particles.json', function() {});
	import axios from 'axios'
	export default{
		name:'login',
		data(){
			
			return{
				particlesJS: particlesJS,
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
		beforeDestory(){
			removeEventListener('keyup',this.keyupLogin,false)
		},
		mounted(){
			addEventListener('keyup',this.keyupLogin,false)
		},
		methods:{
			keyupLogin(e){
				if(e.keyCode==13){
					this.submitForm('ruleForm')
				}
			},
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
		             	this.loading = false
		             	if(res.data.status==200){
		             		sessionStorage.token = res.data.token;
		             		window.localStorage.setItem('user',JSON.stringify(res.data.user[0]));
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
		background: url(../../assets/index/bg.jpg);
		.con{
			width: 30vw;
			height: 20vh;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			margin: 20vh auto;
			position: absolute;
			background-color: rgba(100,100,100,0.6);
			border-radius: 10px;
			padding: 100px 80px 100px 20px;
		}
		
	}
	.el-input__inner{
		background-color: #000 !important;
	}
	
	.el-icon-view{
		color: #000;
	}
</style>