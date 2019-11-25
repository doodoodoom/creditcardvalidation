import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from '@testing-library/react';
import App from "./index";

// Test 0 -- Ensure App renders without issue
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

// Test 1 -- Ensure credit card number formats correctly
it("formats credit card numbers correctly", () => {
  const { getByPlaceholderText } = render(<App />);
  fireEvent.change(getByPlaceholderText("1234 1234 1234 1234"), { target: { value: "1234" } });
  expect(getByPlaceholderText("1234 1234 1234 1234").value).toEqual("1234 ");
  fireEvent.change(getByPlaceholderText("1234 1234 1234 1234"), { target: { value: "1234 1234" } });
  expect(getByPlaceholderText("1234 1234 1234 1234").value).toEqual("1234 1234 ");
  fireEvent.change(getByPlaceholderText("1234 1234 1234 1234"), { target: { value: "1234 1234 1234" } });
  expect(getByPlaceholderText("1234 1234 1234 1234").value).toEqual("1234 1234 1234 ");
  fireEvent.change(getByPlaceholderText("1234 1234 1234 1234"), { target: { value: "1234 1234 1234 1234" } });
  expect(getByPlaceholderText("1234 1234 1234 1234").value).toEqual("1234 1234 1234 1234");
});