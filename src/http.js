import axios from 'axios'
import router from './router'
axios.defaults.headers.common['Content-Type'] = 'application/json'
let instance = axios.create({
	baseURL: '', // api的base_url
    timeout: 5000 // request timeout
})
let token = localStorage.getItem('token')
instance.interceptors.request.use( (config) => {
	if(config.method === 'post' || config.method === 'put'){
        let _data = ''
        for(let it in config.data){
            _data += encodeURIComponent(it) + '=' + encodeURIComponent(config.data[it]) + '&';
        }
        config.data = _data
    }
	
	if(token){
		config.headers['Authorization'] = token;
	}else{
		router.push('login')
	}
	return config
},error => {
	Promise.reject(error)
})


instance.interceptors.response.use( (response) => {
	return response
}, error => {
	return Promise.reject(error)
})

export default instance