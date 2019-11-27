import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, wait, waitForElement, waitForDomChange } from '@testing-library/react';
import App from "./index";
import { JestEnvironment } from "@jest/environment";

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
it("gets and renders the card type correctly", async () => {
  jest.setTimeout(20 * 1000);
  const { getByPlaceholderText, getByAltText } = render(<App />);
  fireEvent.change(getByPlaceholderText("1234 1234 1234 1234"), { target: { value: "6011 00" } });
  await waitForElement(() => getByAltText("Type").getAttribute("src") === "/discover.svg", { timeout: 20 * 1000 });
  expect(getByAltText("Type").getAttribute("src")).toEqual("/discover.svg");
});

// Test 3 -- Ensure check mark appears when card is valid
it("renders a check mark correctly when the credit card is valid", () => {
  const { getByPlaceholderText, getByAltText } = render(<App />);
  fireEvent.change(getByPlaceholderText("1234 1234 1234 1234"), { target: { value: "6011 0017 2222 2222" } });
  fireEvent.blur(getByPlaceholderText("1234 1234 1234 1234"));
  expect(getByAltText("Valid").getAttribute("src")).toEqual("/check.svg");
});

// Test 4 -- Ensure x mark appears when card is invalid
it("renders a check mark correctly when the credit card is valid", () => {
  const { getByPlaceholderText, getByAltText } = render(<App />);
  fireEvent.change(getByPlaceholderText("1234 1234 1234 1234"), { target: { value: "6011 0017 2222 22" } });
  fireEvent.blur(getByPlaceholderText("1234 1234 1234 1234"));
  expect(getByAltText("Valid").getAttribute("src")).toEqual("/x.svg");
  // reset to valid
  fireEvent.change(getByPlaceholderText("1234 1234 1234 1234"), { target: { value: "6011 0017 2222 2222" } });
  fireEvent.blur(getByPlaceholderText("1234 1234 1234 1234"));
  expect(getByAltText("Valid").getAttribute("src")).toEqual("/check.svg");
  // test invalid again
  fireEvent.change(getByPlaceholderText("1234 1234 1234 1234"), { target: { value: "6011 0017 2222 22AB" } });
  fireEvent.blur(getByPlaceholderText("1234 1234 1234 1234"));
  expect(getByAltText("Valid").getAttribute("src")).toEqual("/x.svg");
});

// Test 5 -- Ensure amex cards format correctly *WORK IN PROGRESS*
xit("formats amex cards correctly", async () => {
  const { getByPlaceholderText } = render(<App />);
  fireEvent.change(getByPlaceholderText("1234 1234 1234 1234"), { target: { value: "3712" } });
  await expect(getByPlaceholderText("1234 1234 1234 1234").value).toEqual("3712 ");
  fireEvent.change(getByPlaceholderText("1234 1234 1234 1234"), { target: { value: "3712 3456" } });
  await expect(getByPlaceholderText("1234 1234 1234 1234").value).toEqual("3712 3456");
  fireEvent.change(getByPlaceholderText("1234 1234 1234 1234"), { target: { value: "3712 345678" } });
  await expect(getByPlaceholderText("1234 1234 1234 1234").value).toEqual("3712 345678 ");
  fireEvent.change(getByPlaceholderText("1234 1234 1234 1234"), { target: { value: "3712 345678 95004" } });
  await expect(getByPlaceholderText("1234 1234 1234 1234").value).toEqual("3712 345678 95004");
});