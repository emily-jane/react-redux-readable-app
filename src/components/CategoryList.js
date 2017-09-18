import React, { Component } from 'react';
import PostList from './PostList';
import { connect } from 'react-redux';
import { fetchCategories, fetchPosts } from '../actions';

class CategoryList extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  filteredCategories() {
    if (this.props.match.params.category) {
      return this.props.categories.filter((category) => category.name === this.props.match.params.category)
    } else {
      return this.props.categories
    }
  }

  filteredPosts(categoryName) {
    return this.props.posts.filter((post) => post.category === categoryName)
  }

  render() {
    return (
      <div>
        {this.filteredCategories().map((category) => {
          return (
            <div key={category.name} className="list-group">
              <h2>{category.name}</h2>
              {this.props.posts.filter((post) => post.category === category.name).map(post => {
                return (
                  <div key={post.id} className="list-group-item">{post.title}</div>
                )
              })}
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

export default connect(mapStateToProps, { fetchCategories, fetchPosts })(CategoryList);
