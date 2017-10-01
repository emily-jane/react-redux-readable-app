import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';

class PostNew extends Component {
  onSubmit(values) {
    // this.props.createPost(values);
    console.log('hey')
    console.log(this.props.fields)
  }

  render() {
    const { fields: { title, body, author, category }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create New Post</h3>

        <div className='form-group'>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
        </div>

        <div className='form-group'>
          <label>Body</label>
          <textarea className="form-control" {...body} />
        </div>

        <div className='form-group'>
          <label>Author</label>
          <input type="text" className="form-control" {...author} />
        </div>

        <div className='form-group'>
          <label>Category</label>
          <input type="text" className="form-control" {...category} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'PostNewForm',
  fields: ['title', 'body', 'author', 'category']
}, null, { createPost })(PostNew);
