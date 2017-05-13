import React, {	Component,PropTypes} from 'react'

class Comment extends Component {
	static propTypes={
		comment:PropTypes.object.isRequired,
		onDeleteComment:PropTypes.func,
		index:PropTypes.number
	}
	// constructor(){
	// 	super()
	// 	this.state={timeString:''}
	// }
	// componentWillMount(){
	// 	this._updateTimeString()
	// 	this._timer=setInterval(this._updateTimeString(),5000)
	// }
	// componentWillUnmount(){
	// 	clearInterval(this._timer)
	// }
	// _updateTimeString(){
	// 	const comment=this.props.comment
	// 	let duration=(+Date.now()-comment.createdTime)/1000//持续时间
	// 	this.setState({
	// 		timeString:duration>60?`${Math.round(duration/60)}分钟前`:`${Math.max(duration,1)}秒前`
	// 	})
	// }
	_getProcessedContent(content){
		return content
			.replace(/&/g,'&amp;')//将<,>,",',进行转义变成对应的字符，避免XSS攻击
			.replace(/</g,'&lt;')
			.replace(/>/g,'&gt;')
			.replace(/"/g,'&quot;')
			.replace(/'/g,'&#039;')
			.replace(/`([\S\s]+?)`/g,'<code>$1</code>')//匹配`开始，`结束，中间多个非空白或空白字符
	}
	handleDeleteComment(){//删除这条评论，并将该评论的index向上传
		if (this.props.onDeleteComment) {
			this.props.onDeleteComment(this.props.index)//commentList传进来的i
		}
	}
	render() {
		//console.log(`${this.props.comment.username}的持续时间是${this.state.timeString}`)
		//console.log(`${this.props.comment.username}的创建时间是${this.props.comment.createdTime}`)
		return (<div className='comment'>
			<div className="comment-user">
				<span className='comment-username'>{this.props.comment.username} </span>:
			</div>
			<p dangerouslySetInnerHTML={{__html:this._getProcessedContent(this.props.comment.content)}}></p>
			{/*<span className='comment-createdtime'>{this.state.timeString}</span>*/}
			<span className="comment-delete" onClick={this.handleDeleteComment.bind(this)}>删除</span>
		</div>)
	}
}

export default Comment