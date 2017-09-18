import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePost, fetchComments } from '../actions';

class CategoryList extends Component {
  componentDidMount() {
    this.props.fetchSinglePost(this.props.match.params.postId);
    this.props.fetchComments(this.props.match.params.postId);
  }

  render() {
    return (
      <div>
        HEY
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

export default connect(mapStateToProps, { fetchSinglePost, fetchComments })(CategoryList);
