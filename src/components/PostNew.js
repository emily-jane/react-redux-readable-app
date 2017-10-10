import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { createPost, fetchSinglePost, editPost } from '../actions';
import { connect } from 'react-redux';

class PostNewForm extends Component {
  componentWillMount() {
    if (this.props.match.params.postId) {
      this.props.fetchSinglePost(this.props.match.params.postId);
    }
  }

  onSubmit(values) {
    const postId = this.props.match.params.postId;
    if (postId) {
      const data = {title: values.title, body: values.body};
      this.props.dispatch(editPost(postId, data, () => {
        this.props.history.push('/');
      }))
    } else {
      this.props.dispatch(createPost(values, () => {
        this.props.history.push('/');
      }))
    }
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

    return (
      <form className="col-xs-6" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>{this.props.match.params.postId ? 'Edit' : 'Create New'} Post</h3>

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
        {!this.props.match.params.postId ? (
        <div>
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
        </div>
        ) : null}

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const postId = ownProps.match.params.postId;
  return {
    posts: state.posts,
    initialValues: {
      title: postId ? state.posts.title : '',
      body: postId ? state.posts.body : '',
      author: '',
      category: ''
    }
  }
}

let formComponent = reduxForm({
  enableReinitialize: true,
  form: 'PostNewForm',
  fields: ['title', 'body', 'author', 'category']
})(PostNewForm);

export default connect(mapStateToProps, { createPost, fetchSinglePost, editPost })(formComponent);
