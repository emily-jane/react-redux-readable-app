import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostsComments, createComment } from '../actions';

class Comments extends Component {
  componentDidMount() {
    this.props.fetchPostsComments(this.props.postId);
  }

  handleSubmit(e) {
    e.preventDefault();
    const postId = this.props.postId;
    const author = this.refs.author.value;
    const comment = this.refs.comment.value;
    this.props.createComment(comment, author, postId);
    this.refs.commentForm.reset();
  }

  render() {
    const { comments } = this.props;

    return (
        <div>
          {comments.length >= 1 ? (
            <ul className="post-container list-group col-xs-12">
              {this.props.comments.map((comment) => {
                return (
                  <li className="list-group-item" key={comment.id}>
                    {comment.body} - {comment.author}
                    <span className="badge">{comment.voteScore}</span>
                  </li>
                )
              })}
            </ul>
          ) : null}
          <form ref="commentForm" className="input-group" onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" className="form-control" ref="comment" placeholder="comment"/>
            <input type="text" className="form-control" ref="author" placeholder="author"/>
            <input type="submit" className="btn btn-primary"/>
          </form>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments
  }
}

export default connect(mapStateToProps, { fetchPostsComments, createComment })(Comments);
