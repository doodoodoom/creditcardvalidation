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
    if (self.state.number.length === 5 || self.state.number.length === 7) {
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
    if (this.state.type !== "/amex.svg") {
      if (this.state.number.length === 16 && (Number(this.state.number) || Number(this.state.number) >= 0) && !this.state.error) {
        this.setState({ valid: "/check.svg"});
      } else {
        this.setState({ valid: "/x.svg"});
      }
    } else {
      if (this.state.number.length === 15 && (Number(this.state.number) || Number(this.state.number) >= 0) && !this.state.error) {
        this.setState({ valid: "/check.svg"});
      } else {
        this.setState({ valid: "/x.svg"});
      }
    }
  };

  render() {
    return (
      <div className="App">
        <div id="title">Credit Card Number</div>
        <img id="type" src={this.state.type} style={{ width: "50px" }} />
        <img id="valid" src={this.state.valid} style={{width: "25px" }} />
        <input type="text" required maxLength="19" size="30" placeholder="1234 1234 1234 1234" onChange={this.handleNumberChange} onBlur={this.handleBlur}></input>
        
        {/*<img src="/discover.svg" style={{ width: "50px", marginLeft: "10px" }} />
        <img src="/generic.svg" style={{ width: "50px", marginLeft: "10px" }} />
        <img
          src="/mastercard.svg"
          style={{ width: "50px", marginLeft: "10px" }}
        />
        <img src="/visa.svg" style={{ width: "50px", marginLeft: "10px" }} />
        <img src="/check.svg" style={{ width: "35px", marginLeft: "10px" }} />
        <img src="/x.svg" style={{ width: "27px", marginLeft: "10px" }} />
        <h2>Start editing to see some magic happen!</h2> */}
      </div>
    );
  };
  
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
