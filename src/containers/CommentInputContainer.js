import React,{Component,PropTypes}from 'react'
import {connect}from 'react-redux'
import CommentInput from '../components/CommentInput'
import {addComment} from '../reducers/commentReducer'

//CommentInputContainer:管理用户名在LocalStorage的加载、保存；
//用户还可以点击发布按钮，因此还需要处理评论发布的逻辑
class CommentInputContainer extends Component{
	static propTypes={
		onSubmit:PropTypes.func,
		comments:PropTypes.array
	}
	constructor(){
		super()
		this.state={username:''}
	}
	componentWillMount(){
		//componentWillMount生命周期加载用户名
		this._loadUsername()
	}
	_saveUsername(username){
		//  render 方法的 onUserNameInputBlur
    	// 这个方法会在用户名输入框 blur 的时候的被调用，保存用户名
		localStorage.setItem('username', username)
	}
	_loadUsername(){
		//从localStorage加载username
		//然后在render方法中传给CommentInput
		const username=localStorage.getItem('username')
		if(username){
			this.setState({username})
		}
	}
	handleSubmitComment(comment){//评论保存到localStorage
		if (!comment) return
		if(!comment.username) return alert('请输入用户名')
		if(!comment.content) return alert('请输入评论内容')
		const comments=this.props.comments
		const newComments=[...comments,comment]
		localStorage.setItem('comments',JSON.stringify(newComments))
		//this.props.onSubmit由connect传入
		//会dispatch一个action去新增评论
		if (this.props.onSubmit) {
			this.props.onSubmit(comment)
		}
	}
	render(){
		return (
			<CommentInput 
				username={this.state.username} 
				onUsernameInputBlur={this._saveUsername.bind(this)} 
				onSubmit={this.handleSubmitComment.bind(this)} 
			></CommentInput>				
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		comments:state.comments
	}
}

const mapDispatchToProps=(dispatch)=>{
	return{
		onSubmit:(comment)=>{dispatch(addComment(comment))}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentInputContainer)