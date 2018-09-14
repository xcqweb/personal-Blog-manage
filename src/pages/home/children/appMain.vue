<template>
	<div class="appMain">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
	export default{
		name:'appMain'
	}
</script>

<style scoped="scoped" lang="less">
.appMain{
	padding-bottom: 42px;
	box-sizing: border-box;
    margin: 10px;
    height: calc(100vh - 100px);
    overflow: auto;
}
</style>