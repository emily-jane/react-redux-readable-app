import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../actions';

class CommentNew extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const postId = this.props.postId;
    const author = this.refs.author.value;
    const comment = this.refs.comment.value;
    this.props.createComment(comment, author, postId);
    this.refs.commentForm.reset();
  }

  render() {
    return (
      <div>
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

export default connect(mapStateToProps, { createComment })(CommentNew);
