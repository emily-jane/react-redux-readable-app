import React, { Component } from 'react';
import '../App.css';
import CategoryList from './CategoryList';
import Post from './Post';
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
              <ul className="nav navbar-nav navbar-right">
                <li><Link to='/create'>Add Post</Link></li>
              </ul>
            </div>
          </nav>
          <Switch>
            <Route exact path="/" component={CategoryList} />
            <Route path='/:category/:postId' component={Post} />
            <Route path='/:category' component={CategoryList} />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
