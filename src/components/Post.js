import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePost, fetchPostsComments, removePost } from '../actions';

class CategoryList extends Component {
  componentDidMount() {
    this.props.fetchSinglePost(this.props.match.params.postId);
    this.props.fetchPostsComments(this.props.match.params.postId);
  }

  handleDeletePost() {
    this.props.removePost(this.props.match.params.postId, () => {
      this.props.history.push('/');
    })
  }

  render() {
    const postId = this.props.match.params.postId;
    const { posts } = this.props;

    return (
        <div>
          {posts.length === 1 ? (
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">{posts[0].title}</h3>
                <button className="btn-link" onClick={() => {this.handleDeletePost(postId)}}>| DELETE |</button>
              </div>
              <ul className="post-container list-group col-xs-12">
                <li className="post-body"><h2>{posts[0].body}</h2></li>
                <li>({posts[0].author}, {posts[0].timestamp})</li>
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
          ) : null}
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

export default connect(mapStateToProps, { fetchSinglePost, fetchPostsComments, removePost })(CategoryList);
