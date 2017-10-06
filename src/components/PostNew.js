import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { createPost, fetchSinglePost } from '../actions';

class PostNew extends Component {
  componentDidMount() {
    if (this.props.match.params.postId) {
      this.props.dispatch(fetchSinglePost(this.props.match.params.postId));
    }
  }

  onSubmit(values) {
    this.props.dispatch(createPost(values, () => {
      this.props.history.push('/');
    }))
  }

  renderTextField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          type="text"
          className="form-control"
          {...field.input}
        />
      </div>
    )
  }

  renderTextareaField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <textarea
          className="form-control"
          {...field.input}
        />
      </div>
    )
  }

  renderCategoryField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <select className="form-control" {...field.input}>
          <option></option>
          <option value="react">React</option>
          <option value="redux">Redux</option>
          <option value="udacity">Udacity</option>
        </select>
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props;

    const myInitalValues = {
      initialValues: {
        title: 'hello',
        body: 'woah there'
      }
    }

    return (
      <form {...myInitalValues} className="col-xs-6" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create New Post</h3>

        <Field
          name="title"
          label="Title"

          component={this.renderTextField}
        />

        <Field
          name="body"
          label="Body"
          component={this.renderTextareaField}
        />

        <Field
          name="author"
          label="Author"
          component={this.renderTextField}
        />

        <Field
          name="category"
          label="Category"
          component={this.renderCategoryField}
        />

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'PostNewForm',
  fields: ['title', 'body', 'author', 'category']
}, null, { createPost, fetchSinglePost })(PostNew);
