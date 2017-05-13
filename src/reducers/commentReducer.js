//action types
const INIT_COMMENT='INIT_COMMENT'
const ADD_COMMENT='ADD_COMMENT'
const DELETE_COMMENT='DELETE_COMMENT'

//reducer
export default function(state,action){//根据dispatch分发的结果，返回新的state
	if(!state){//初次渲染为空数组
		state={comments:[]}
	}
	switch(action.type){
		case INIT_COMMENT://初始化评论
			return {comments:action.comments}
		case ADD_COMMENT:
			return {comments:[...state.comments,action.comment]}
		case DELETE_COMMENT:
			return {comments:[...state.comments.slice(0,action.commentIndex),
					...state.comments.slice(action.commentIndex+1)]}
		default:
			return state
	}
}
//action creators 返回action的函数
export const initComments=(comments)=>{
	return {type:INIT_COMMENT,comments}
}
export const addComment=(comment)=>{
	return {type:ADD_COMMENT,comment}
}
export const deleteComment=(commentIndex)=>{
	return {type:DELETE_COMMENT,commentIndex}
}