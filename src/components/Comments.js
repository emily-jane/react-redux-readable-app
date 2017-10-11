import React, { Component } from 'react';
import CommentNew from './CommentNew';
import { connect } from 'react-redux';
import { fetchPostsComments, removeComment, changeCommentVote } from '../actions';
import { timestampToDate } from '../utils/helpers';

class Comments extends Component {
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
                          <li>Edit</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : null}
          <CommentNew postId={this.props.postId}/>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments
  }
}

export default connect(mapStateToProps, { fetchPostsComments, removeComment, changeCommentVote })(Comments);
