<template>
	<div class="tempEditArticle">
		
		<span style="font-size: 14px;margin-right: 10px;">类别 :</span>
		<el-select v-model="v1" filterable placeholder="请选择" size='mini'>
		    <el-option
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		</el-select>
		
		<span style="font-size: 14px;margin: 0 10px 0 10px;">标题 :</span>
		<el-input v-model="v2" style='width: 200px;margin-right: 10px;' size='mini'></el-input>
		
		<quill-editor
			class='edit'
			:content="content"
            :options="editorOption"
            @change="onEditorChange($event)">
  		</quill-editor>
	</div>
</template>

<script>
	export default{
		name:'tempEditArticle',
		data(){
			return{
				content: '<h2>I am Example</h2>',
		        editorOption: {
		        	
		        },
		        v1:'全部',
				v2:'',
				v3:'chase',
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
		methods:{
			onEditorChange(){
				
			}
				
		}
	}
</script>

<style scoped="scoped" lang="less">
.tempEditArticle{
	margin: 20px;
	.edit{
		margin-top: 36px;
	}
}


</style>