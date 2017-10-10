import React, { Component } from 'react';
import '../App.css';
import CategoryList from './CategoryList';
import Post from './Post';
import PostNew from './PostNew';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
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
                <li>Order posts by...</li>
                <li>
                  <form className="navbar-form navbar-left" role="search">
                    <div className="form-group">
                      <select className="form-control">
                        <option>Vote Score</option>
                        <option>Timestamp</option>
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
            <Route path='/edit/:postId' component={PostNew} />
            <Route path='/:category/:postId' component={Post} />
            <Route path='/create' component={PostNew} />
            <Route path='/:category' component={CategoryList} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
