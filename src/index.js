import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <img src="/amex.svg" style={{ width: "50px" }} />
      <img src="/discover.svg" style={{ width: "50px", marginLeft: "10px" }} />
      <img src="/generic.svg" style={{ width: "50px", marginLeft: "10px" }} />
      <img
        src="/mastercard.svg"
        style={{ width: "50px", marginLeft: "10px" }}
      />
      <img src="/visa.svg" style={{ width: "50px", marginLeft: "10px" }} />
      <img src="/check.svg" style={{ width: "35px", marginLeft: "10px" }} />
      <img src="/x.svg" style={{ width: "27px", marginLeft: "10px" }} />
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
