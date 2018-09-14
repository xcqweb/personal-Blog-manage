import {
	TOGGLE_MENU,
	ADD_TAG,
	DEL_TAG,
	DEL_SINGLE_TAG
} from './mutation-type'

export default{
	addTag({commit,state},view){
		return new Promise( (resolve) => {
			commit('ADD_TAG', view)
			resolve([...state.tagViews])
		})
	},
	delTag({commit,state},view){
		return new Promise( (resolve) => {
			commit('DEL_TAG', view)
			resolve([...state.tagViews])
		})
	},
	delSingleTag({commit,state},view){
		return new Promise( (resolve) => {
			commit('DEL_SINGLE_TAG', view)
			resolve([...state.tagViews])
		})
	}
}
