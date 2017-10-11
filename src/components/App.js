import React, { Component } from 'react';
import '../App.css';
import CategoryList from './CategoryList';
import Post from './Post';
import PostNewForm from './PostForm';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { sortPosts } from '../actions';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link className="navbar-brand" to='/'>Readable</Link>
              </div>
              <ul className="nav navbar-nav">
                <li><Link to='/react'>React</Link></li>
                <li><Link to='/redux'>Redux</Link></li>
                <li><Link to='/udacity'>Udacity</Link></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <p className="navbar-text">Order posts by...</p>
                <li>
                  <form className="navbar-form navbar-left" role="search">
                    <div className="form-group">
                      <select className="form-control" onChange={(event) => {this.props.sortPosts(event.target.value)}}>
                        <option value="voteScore">Vote Score</option>
                        <option value="timestamp">Timestamp</option>
                      </select>
                    </div>
                  </form>
                </li>
                <li><Link to='/create'>Add Post</Link></li>
              </ul>
            </div>
          </nav>
          <Switch>
            <Route exact path="/" component={CategoryList} />
            <Route path='/edit/:postId' component={PostNewForm} />
            <Route path='/:category/:postId' component={Post} />
            <Route path='/create' component={PostNewForm} />
            <Route path='/:category' component={CategoryList} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { sortPosts })(App);
