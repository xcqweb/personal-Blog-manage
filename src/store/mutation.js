import {
	TOGGLE_MENU,
	ADD_TAG,
	DEL_TAG,
	DEL_SINGLE_TAG
} from './mutation-type'

export default{
	//侧栏收缩
	TOGGLE_MENU(state,val){
		state.isCollapse = val
	},
	//tags
	ADD_TAG(state,val){
		
		if(state.tagViews.some(v => v.path === val.path)) return
		state.tagViews.push(val)
	},
	
	DEL_TAG(state,val){
		state.tagViews.splice(val,1)
		
	},
	
	DEL_SINGLE_TAG(state,val){
		state.tagViews = state.tagViews.filter( (v) => {
			return v.path != val
		})
	},
	
}
