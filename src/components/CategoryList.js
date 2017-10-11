import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, fetchPosts, removePost, changePostVote } from '../actions';
import { Link } from 'react-router-dom';
import { timestampToDate } from '../utils/helpers';

class CategoryList extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  handleDeletePost(postId) {
    this.props.removePost(postId, () => {
      this.props.history.push('/');
    })
  }

  filteredCategories() {
    if (this.props.match.params.category) {
      return this.props.categories.filter((category) => category.name === this.props.match.params.category)
    } else {
      return this.props.categories
    }
  }

  sortedPosts() {
    const option = this.props.sortPosts;
    return this.props.posts.sort((a,b) => {
      return (a[option] < b[option]) ? 1 : ((b[option] < a[option]) ? -1 : 0);
    })
  }

  filteredPosts(categoryName) {
    return this.sortedPosts().filter((post) => post.category === categoryName && post.deleted === false)
  }

  voteOnPost(postId, direction) {
    this.props.changePostVote(postId, direction);
  }

  render() {
    return (
      <div>
        {this.filteredCategories().map((category) => {
          return (
            <div key={category.name} className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title"><Link to={`/${category.name}`}>{category.name}</Link></h3>
              </div>
              <div className="not-panel-body">
                <div className="post-list">
                  {this.filteredPosts(category.name).map(post => {
                    return (
                      <div className="post" key={post.id}>
                        <div className="vote-counter">
                          <div className="vote up-vote" onClick={() => {this.voteOnPost(post.id, "upVote")}}>
                            <span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>
                          </div>
                          <span className="vote-score">{post.voteScore}</span>
                          <div className="vote down-vote" onClick={() => {this.voteOnPost(post.id, "downVote")}}>
                            <span className="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span>
                          </div>
                        </div>
                        <div className="post-data">
                          <Link to={`/${category.name}/${post.id}`}><h4>{post.title}</h4></Link>
                          <div className="post-meta">
                            <p>Written by {post.author}, at {timestampToDate(post.timestamp)}</p>
                            <ul>
                              <li>XXX COMMENTS</li>
                              <li className="link" onClick={() => {this.handleDeletePost(post.id)}}>Delete</li>
                              <li><Link className="link" to={`/edit/${post.id}`}>Edit</Link></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    posts: (Array.isArray(state.posts) ? state.posts : [state.posts]),
    sortPosts: state.sortPosts
  }
}

export default connect(mapStateToProps, { fetchCategories, fetchPosts, removePost, changePostVote })(CategoryList);
