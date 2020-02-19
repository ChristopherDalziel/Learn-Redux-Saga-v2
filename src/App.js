import React, { Component } from "react";
import placeHolderImage from "./logo.png";
import "./app.css";
import { connect } from "react-redux";

class App extends Component {
  render() {
    const { fetching, dog, onRequestDog, error } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          {/* On first load, show logo.. on click show a dog! */}
          <img src={dog || placeHolderImage} className="App-logo" alt="logo" />
          <h1 className="App-title">Dog Redux Saga</h1>
        </header>

        <p className="App-intro">Get a new dog every click!</p>

        {/* While app is fetching the api request button is disabled and displays a different string */}
        {fetching ? (
          <button disabled>Fetching...</button>
        ) : (
          <button onClick={onRequestDog}>Request a Dog</button>
        )}

        {/* Error message if no dog is fetched */}
        {error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}
      </div>
    );
  }
}

// Means the most current fetched state is available to the App as props
const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    dog: state.dog,
    error: state.error
  };
};

// onRequestDog dispatches a API_CALL_REQUEST call to the store
const mapDispatchToProps = dispatch => {
  return {
    onRequestDog: () => dispatch({ type: "API_CALL_REQUEST" })
  };
};

// Connect these functions and export the redux version for usage within index.js
export default connect(mapStateToProps, mapDispatchToProps)(App);
