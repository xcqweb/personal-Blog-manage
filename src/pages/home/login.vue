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
			    <el-button type="primary" @click="submitForm('ruleForm')" style='width: 100%;'>登录</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default{
		name:'login',
		data(){
			
			return{
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
		          	let parmas = {
		          		username:this.ruleForm.username,
		          		password:this.ruleForm.password,
		          		type:1
		          	}
		             this.$axios.post('api/admin/login_p.html',parmas).then( (res) => {
		             	if(res.status==200){
		             		console.log(res)
		             	}
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
			padding: 100px 80px 100px 40px;
		}
	}
</style>