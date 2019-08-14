import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { HashRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route path="/" name="Main Page" component={Landing} />
            </Switch>
            <Footer />
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
