import React,{Component,PropTypes}from 'react'
import {connect}from 'react-redux'
import CommentList from '../components/CommentList'
import {initComments,deleteComment} from '../reducers/commentReducer'

//CommentListContainer:获取外部数据，为Dumb CommentList添加属性及操作
//Smart 负责评论列表的加载、初始化、删除评论
//沟通CommentList和state

class CommentListContainer extends Component{
	static propTypes={
		initComments:PropTypes.func,
		deleteComment:PropTypes.func
	}
	componentWillMount(){
		this._loadComments()
	}
	_loadComments(){//从storage加载评论
		let comments=localStorage.getItem('comments')
		comments=comments?JSON.parse(comments):[]//首次渲染时comments为空
		// this.props.initComments 是 connect 传进来的
    	// 可以帮我们把数据初始化到 state 里面去
    	this.props.initComments(comments)
	}
	handleDeleteComment(index){
		const comments=this.props.comments
		const newComments=[...comments.slice(0,index),...comments.slice(index+1)]
		localStorage.setItem('comments',JSON.stringify(newComments))
		if (this.props.deleteComment) {
		// this.props.onDeleteComment 是 connect 传进来的
      	// 会 dispatch 一个 action 去删除评论
			this.props.deleteComment(index)
		}
	}
	render(){
		return (
			<CommentList comments={this.props.comments} onDeleteComment={this.handleDeleteComment.bind(this)}></CommentList>
		)
	}
}
//从state.comments中获取comments
const mapStateToProps=(state)=>{
	return {
		comments:state.comments
	}
}
// 提供给 CommentListContainer
// 当从 LocalStorage 加载评论列表以后就会通过这个方法
// 把评论列表初始化到 state 当中
const mapDispatchToProps=(dispatch)=>{
	return {
		initComments:(comments)=>dispatch(initComments(comments)),
		deleteComment:(commentIndex)=>dispatch(deleteComment(commentIndex))
	}
}
// 将 CommentListContainer connect 到 store
// 会把 comments、initComments、onDeleteComment 传给 CommentListContainer
export default connect(mapStateToProps,mapDispatchToProps)(CommentListContainer)