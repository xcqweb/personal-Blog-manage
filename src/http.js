import router from './router'
axios.defaults.headers.common['Content-Type'] = 'application/json'
let instance = axios.create({
	baseURL: '', // api的base_url
    timeout: 500000 // request timeout
})

instance.interceptors.request.use( (config) => {
	let token = sessionStorage.getItem('token')
	if(config.method === 'post' || config.method === 'put'){
        let _data = ''
        for(let it in config.data){
            _data += encodeURIComponent(it) + '=' + encodeURIComponent(config.data[it]) + '&';
        }
        config.data = _data
    }
	
	if(token){
		config.headers['Authorization'] = token;
	}
	return config
},error => {
	Promise.reject(error)
})


instance.interceptors.response.use( (response) => {
	if(response.data.status==401){
		router.push('login')
		return
	}else{
		return response
	}
	
}, error => {
	return Promise.reject(error)
})

export default instance