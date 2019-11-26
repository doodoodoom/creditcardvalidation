import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, wait } from '@testing-library/react';
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

// Test 2 -- Ensure correct card type is received from API and renders *WORK IN PROGRESS*
xit("gets and renders the card type correctly", () => {
  const { getByPlaceholderText, getByAltText } = render(<App />);
  fireEvent.change(getByPlaceholderText("1234 1234 1234 1234"), { target: { value: "6011 00" } });
  let imgSrc = getByAltText("Type");
  expect(imgSrc.getAttribute("src")).toEqual("/discover.svg")
});

// Test 3 -- Ensure check mark appears when card is valid
it("renders a check mark correctly when the credit card is valid", () => {
  const { getByPlaceholderText, getByAltText } = render(<App />);
  fireEvent.change(getByPlaceholderText("1234 1234 1234 1234"), { target: { value: "6011 0017 2222 2222" } });
  fireEvent.blur(getByPlaceholderText("1234 1234 1234 1234"));
  expect(getByAltText("Valid").getAttribute("src")).toEqual("/check.svg");
});