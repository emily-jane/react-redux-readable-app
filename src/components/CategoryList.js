import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, fetchPosts, removePost } from '../actions';
import { Link } from 'react-router-dom';

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

  filteredPosts(categoryName) {
    return this.props.posts.filter((post) => post.category === categoryName && post.deleted === false)
  }

  render() {
    return (
      <div>
        {this.filteredCategories().map((category) => {
          return (
            <div key={category.name} className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title"><Link to={`/${category.name}`}>{category.name}</Link></h3>
              </div>
              <ul className="list-group">
                {this.filteredPosts(category.name).map(post => {
                  return (
                    <li className="list-group-item" key={post.id}>
                      <Link to={`/${category.name}/${post.id}`}>{post.title}</Link>
                      <button className="btn-link" onClick={() => {this.handleDeletePost(post.id)}}>| DELETE |</button>
                      <Link  to={`/edit/${post.id}`}>| EDIT |</Link>
                      <span className="badge">{post.voteScore}</span>
                    </li>
                  )
                })}
              </ul>
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
    posts: state.posts
  }
}

export default connect(mapStateToProps, { fetchCategories, fetchPosts, removePost })(CategoryList);
