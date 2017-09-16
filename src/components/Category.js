import React, { Component } from 'react';
import PostList from './PostList';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions';

class Category extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    console.log(this.props.categories);
  }

  render() {
    const { categories } = this.props;

    return (
      <div>
        {categories.map((category) => {
          return <h2>{category}</h2>
        })}
        <PostList />
        }
      </div>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(mapStateToProps, { fetchCategories })(Category);
