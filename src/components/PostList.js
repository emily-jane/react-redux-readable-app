import React, { Component } from 'react';

class PostList extends Component {
  render() {
    return (
      <div className="list-group">
        <button className="list-group-item">Post 1</button>
        <button className="list-group-item">Post 2</button>
        <button className="list-group-item">Post 3</button>
        <button className="list-group-item">Post 4</button>
        <button className="list-group-item">Post 5</button>
      </div>
    )
  }
}

export default PostList;
