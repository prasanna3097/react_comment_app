import {Component} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {commentsList: [], nameInput: '', commentInput: ''}

  ontoggleLikeButton = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  render() {
    const {commentsList, nameInput, commentInput} = this.state
    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="main-heading">Comments</h1>
          <div className="input-container">
            <form className="form-container" onSubmit={this.onAddComment}>
              <p className="label">Say Something about 4.0 Technologies</p>

              <input
                type="text"
                id="input"
                className="input"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />

              <textarea
                className="textarea"
                placeholder="Your comment"
                value={commentInput}
                onChange={this.onChangeCommentInput}
              />

              <button className="button-btn" type="submit">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="image"
            />
          </div>
          <p>
            <span className="comments-count">{commentsList.length}</span>
            Comments
          </p>

          <ul className="comment-items">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                ontoggleLikeButton={this.ontoggleLikeButton}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Comments
