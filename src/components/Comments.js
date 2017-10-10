import React, { Component } from 'react';
import CommentNew from './CommentNew';
import { connect } from 'react-redux';
import { fetchPostsComments, removeComment, changeCommentVote } from '../actions';

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
        <div>
          {comments.length >= 1 ? (
            <ul className="post-container list-group col-xs-12">
              {this.sortedComments().map((comment) => {
                return (
                  <li className="list-group-item" key={comment.id}>
                    <button className="btn btn-primary" onClick={() => {this.voteOnComment(comment.id, "upVote")}}>UP</button>
                      <button className="btn btn-primary" onClick={() => {this.voteOnComment(comment.id, "downVote")}}>DOWN</button>
                    {comment.body} - {comment.author}
                    <button className="btn-link" onClick={() => this.removeComment(comment.id)}>| DELETE |</button>
                    <span className="badge">{comment.voteScore}</span>
                  </li>
                )
              })}
            </ul>
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
