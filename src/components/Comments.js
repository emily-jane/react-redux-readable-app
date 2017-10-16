import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostsComments, removeComment, changeCommentVote, createComment, editComment } from '../actions';
import { timestampToDate } from '../utils/helpers';
import { Modal } from 'react-bootstrap';

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      currentComment: {
        body: '',
        id: ''
      }
    }
  }

  closeModal() {
    this.setState({
      showModal: false,
      currentComment: {
        body: '',
        id: ''
      }
    })
  }

  openEditModal(body, id) {
    this.setState({
      showModal: true,
      currentComment: {
        body,
        id
      }
    })
  }

  openNewModal() {
    this.setState({
      showModal: true,
      currentComment: {
        body: '',
        id: ''
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const postId = this.props.postId;
    const commentId = this.state.currentComment.id;
    const body = this.refs.comment.value;
    const author = this.refs.author.value;
    this.state.currentComment.id !== '' ? this.props.editComment(body, commentId) : this.props.createComment(body, author, postId)
    this.refs.commentForm.reset();
    this.closeModal();
  }

  componentDidMount() {
    this.props.fetchPostsComments(this.props.postId);
  }

  filteredComments() {
    return this.props.comments.filter((comment) => comment.deleted === false)
  }

  sortedComments() {
    return this.filteredComments().sort((a,b) => {
      return (a.voteScore < b.voteScore) ? 1 : ((b.voteScore < a.voteScore) ? -1 : 0);
    })
  }

  removeComment(commentId) {
    this.props.removeComment(commentId);
  }

  voteOnComment(commentId, direction) {
    this.props.changeCommentVote(commentId, direction);
  }

  render() {
    const { comments } = this.props;

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title"><p>{this.filteredComments().length} COMMENT{this.filteredComments().length === 1 ? '' : 'S'}</p></div>
          <div className="link" onClick={this.openNewModal.bind(this)}>(Add New Comment)</div>
        </div>
        <div className="not-panel-body">
          {comments.length >= 1 ? (
            <div className="post-list">
              {this.sortedComments().map((comment) => {
                return (
                  <div className="post" key={comment.id}>
                    <div className="vote-counter">
                      <div className="vote up-vote" onClick={() => {this.voteOnComment(comment.id, "upVote")}}>
                        <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                      </div>
                      <span className="vote-score">{comment.voteScore}</span>
                      <div className="vote down-vote" onClick={() => {this.voteOnComment(comment.id, "downVote")}}>
                        <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                      </div>
                    </div>
                    <div className="post-data">
                      <h4>{comment.body}</h4>
                      <div className="post-meta">
                        <p>Written by {comment.author}, at {timestampToDate(comment.timestamp)}</p>
                        <ul>
                          <li className="link" onClick={() => this.removeComment(comment.id)}>Delete</li>
                          <li className="link" onClick={() => this.openEditModal(comment.body, comment.id)}>Edit</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : null}
          <Modal show={this.state.showModal}>
            <Modal.Header>
              <Modal.Title>{this.state.currentComment.id === '' ? 'New' : 'Edit'} Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form ref="commentForm" className="input-group" onSubmit={this.handleSubmit.bind(this)}>
                <input type="textarea" className="form-control" ref="comment" placeholder="comment" defaultValue={this.state.currentComment.body}/>
                <input type={this.state.currentComment.id === '' ? "text" : "hidden"} className="form-control" ref="author" placeholder="author"/>
                <input type="submit" className="btn btn-primary"/>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments
  }
}

export default connect(mapStateToProps, { fetchPostsComments, removeComment, changeCommentVote, createComment, editComment })(Comments);
