import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePost, fetchPostsComments } from '../actions';

class CategoryList extends Component {
  componentDidMount() {
    this.props.fetchSinglePost(this.props.match.params.postId);
    this.props.fetchPostsComments(this.props.match.params.postId);
  }

  render() {
    const { author, body, timestamp, title, voteScore } = this.props.posts;

    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title">{title}</h3>
        </div>
        <ul className="post-container list-group col-xs-12">
          <li className="post-body"><h2>{body}</h2></li>
          <li>({author}, {timestamp})</li>
        </ul>
        <ul className="post-container list-group col-xs-12">
          {this.props.comments.map((comment) => {
            return (
              <li className="list-group-item" key={comment.id}>
                {comment.body}
                <span className="badge">{comment.voteScore}</span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    posts: state.posts,
    comments: state.comments
  }
}

export default connect(mapStateToProps, { fetchSinglePost, fetchPostsComments })(CategoryList);
