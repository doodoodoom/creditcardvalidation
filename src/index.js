import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <div>Credit Card Number</div>
        <input type="text" required minLength="15" maxLength="16" size="30" placeholder="1234 1234 1234 1234"></input>
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
  }
  
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
