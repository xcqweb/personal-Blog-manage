// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'polyfill'
import 'babel-polyfill'
import instance from './http'
import QuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(QuillEditor, /* { default global options } */)


Vue.config.productionTip = false

Vue.prototype.$axios = instance


Vue.mixin({
	data(){
		return{
			API_URL:'http://120.78.64.121',
			user:JSON.parse(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')):{}
		}
	}
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
