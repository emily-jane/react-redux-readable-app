import React, { Component } from 'react';
import CommentNew from './CommentNew';
import { connect } from 'react-redux';
import { fetchPostsComments, removeComment } from '../actions';

class Comments extends Component {
  componentDidMount() {
    this.props.fetchPostsComments(this.props.postId);
  }

  filteredComments() {
    return this.props.comments.filter((comment) => comment.deleted === false)
  }

  removeComment(commentId) {
    this.props.removeComment(commentId);
  }

  render() {
    const { comments } = this.props;

    return (
        <div>
          {comments.length >= 1 ? (
            <ul className="post-container list-group col-xs-12">
              {this.filteredComments().map((comment) => {
                return (
                  <li className="list-group-item" key={comment.id}>
                    {comment.body} - {comment.author} -
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

export default connect(mapStateToProps, { fetchPostsComments, removeComment })(Comments);
