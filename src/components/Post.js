import React, { Component } from 'react';
import Comments from './Comments'
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
          {posts.id ? (
            <div>
              <div className="panel panel-info">
                <div className="panel-heading">
                  <h3 className="panel-title">{posts.title}</h3>
                  <button className="btn-link" onClick={() => {this.handleDeletePost(postId)}}>| DELETE |</button>
                </div>
                <div className="panel-body">
                  <ul className="post-container list-group col-xs-12">
                    <li className="post-body"><h2>{posts.body}</h2></li>
                    <li>({posts.author}, {posts.timestamp})</li>
                  </ul>
                </div>
              </div>
              <div className="panel panel-info">
                <div className="panel-heading">
                  <h3 className="panel-title">COMMENTS</h3>
                </div>
                <Comments postId={postId} />
              </div>
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
