import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      formattedNumber: "",
      number: "",
      type: "",
      valid: "",
      error: false
    };

    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  };

  handleNumberChange(event) {
    //handle icon lookup
    let unformatted = event.target.value.replace(/ /gi, "");
    const self = this;
    const lookup = require("binlookup")();
    if (unformatted.length === 6 || unformatted === 8) {
      lookup(unformatted, function( err, data ){
        if (err) {
          self.setState({ error: true });
          return;
        }
        self.setState({ type: `/${data.scheme}.svg`, error: false });
      });
    }

    // handle formatting
    if (this.state.type !== "/amex.svg") {
      const input = document.querySelector("input");
      input.setAttribute("maxLength", "19");
      if (event.target.value.length < 4 || (event.target.value.length > 5 && event.target.value.length < 9) || (event.target.value.length > 10 && event.target.value.length < 14) || event.target.value.length > 15) {
        this.setState({ formattedNumber: event.target.value, number: unformatted });
      } else {
        event.target.value += " ";
        this.setState({ formattedNumber: event.target.value, number: unformatted });
      }
    } else {
      const input = document.querySelector("input");
      input.setAttribute("maxLength", "17");
      if (event.target.value.length < 4 || (event.target.value.length > 5 && event.target.value.length < 11) || event.target.value.length > 12) {
        this.setState({ formattedNumber: event.target.value, number: unformatted });
      } else {
        event.target.value += " ";
        this.setState({ formattedNumber: event.target.value, number: unformatted });
      }
    }
  };

  handleBlur() {
    const error = document.querySelector("div#error");
    if (this.state.type !== "/amex.svg") {
      if (this.state.number.length === 16 && (Number(this.state.number) || Number(this.state.number) >= 0) && !this.state.error) {
        this.setState({ valid: "/check.svg"});
        error.setAttribute("hidden", true);
      } else {
        this.setState({ valid: "/x.svg"});
        error.removeAttribute("hidden");
      }
    } else {
      if (this.state.number.length === 15 && (Number(this.state.number) || Number(this.state.number) >= 0) && !this.state.error) {
        this.setState({ valid: "/check.svg"});
        error.setAttribute("hidden", true);
      } else {
        this.setState({ valid: "/x.svg"});
        error.removeAttribute("hidden");
      }
    }
  };

  render() {
    return (
      <div title="Credit Card Validation" className="App">
        <div id="title">Credit Card Number</div>
        <img id="type" alt="Type" src={this.state.type} style={{ width: "50px" }} />
        <img id="valid" alt="Valid" src={this.state.valid} style={{width: "25px" }} />
        <input type="text" required maxLength="19" size="30" placeholder="1234 1234 1234 1234" onChange={this.handleNumberChange} onBlur={this.handleBlur}></input>
        <div id="error" hidden>Oops! I have a bad feeling about this!</div>
      </div>
    );
  };
  
};

const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement); // Comment out this line to run tests
export default App;