import React, { Component } from 'react';
import '../App.css';
import CategoryList from './CategoryList';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={CategoryList} />
            <Route path='/:category' component={CategoryList} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
