<template>
  <div class="index">
		<el-carousel :interval="5000" arrow="always">
	    <el-carousel-item v-for="(item,index) in items" :key="index">
	      <img :src="item.imgSrc"/>
	    </el-carousel-item>
	  </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
    	items:[
    		{imgSrc:require('../../../assets/index/bg.jpg')},
    		{imgSrc:require('../../../assets/index/bg.jpg')},
    		{imgSrc:require('../../../assets/index/bg.jpg')},
    		{imgSrc:require('../../../assets/index/bg.jpg')},
    		{imgSrc:require('../../../assets/index/bg.jpg')},
    		{imgSrc:require('../../../assets/index/bg.jpg')},
    	]
    }
  },
  computed: {
  },
  created() {
  	console.dir(_)
  }
}
</script>
<style  lang="less" scoped="scoped">
  .index{
  	width: 100%;
  	height: 100%;
  	background: url(../../../assets/index/bg.jpg);
  }
  
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 78vh;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  
</style>
