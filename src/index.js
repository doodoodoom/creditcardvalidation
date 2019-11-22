import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      formattedNumber: "",
      number: ""
    };

    this.handleNumberChange = this.handleNumberChange.bind(this);
  };

  handleNumberChange(event) {
    // handle formatting
    let unformatted = event.target.value.replace(/ /gi, "");
    if (event.target.value.length < 4 || (event.target.value.length > 5 && event.target.value.length < 9) || (event.target.value.length > 10 && event.target.value.length < 14) || event.target.value.length > 15) {
      this.setState({ formattedNumber: event.target.value, number: unformatted });
    } else {
      event.target.value += " ";
      this.setState({ formattedNumber: event.target.value, number: unformatted });
    }

    //handle icon lookup
    var lookup = require("binlookup")();
    lookup(unformatted, function( err, data ){
      if (err) {
        console.log('Not enough data');
        return;
      }

      console.log('This is the card type: ', data.scheme);
    });

  };

  render() {
    return (
      <div className="App">
        <div>Credit Card Number</div>
        <input type="text" required maxLength="19" size="30" placeholder="1234 1234 1234 1234" onChange={this.handleNumberChange}></input>
        {/* <img src="/amex.svg" style={{ width: "50px" }} />
        <img src="/discover.svg" style={{ width: "50px", marginLeft: "10px" }} />
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
