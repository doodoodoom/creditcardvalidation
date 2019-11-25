import React from "react";
import ReactDOM from "react-dom";
import App from "./index";

// Test 0 -- Ensure App renders without issue
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});