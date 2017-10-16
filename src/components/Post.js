import React, { Component } from 'react';
import Comments from './Comments'
import { connect } from 'react-redux';
import { fetchSinglePost, removePost } from '../actions';
import { Link } from 'react-router-dom';
import { timestampToDate } from '../utils/helpers';

class CategoryList extends Component {
  componentDidMount() {
    this.props.fetchSinglePost(this.props.match.params.postId);
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
              <div className="panel panel-default">
                <div className="panel-heading">
                  <div className="panel-title"><p>{posts.title}    <span className="badge">{posts.voteScore}</span></p></div>
                  <div className="post-data">
                    <div className="post-meta">
                      <ul>
                        <li className="link" onClick={() => {this.handleDeletePost(postId)}}>Delete</li>
                        <li><Link className="link" to={`/edit/${posts.id}`}>Edit</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="post-data">
                    <h2>{posts.body}</h2>
                    <p>Written by {posts.author}, at {timestampToDate(posts.timestamp)}</p>
                </div>
              </div>
              <Comments postId={postId} />
            </div>
          ) :
            <h1>
              <span className="glyphicon glyphicon-fire"></span>
              THIS POST IS UNAVAILABLE
              <span className="glyphicon glyphicon-fire"></span>
            </h1>
          }
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    posts: state.posts
  }
}

export default connect(mapStateToProps, { fetchSinglePost, removePost })(CategoryList);
