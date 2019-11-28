# Credit Card Validation
This application simulates entering in your credit card number into a field, complete with formatting, images, error messages, and more! Here's the run down on what it will do:
1) Automatically format the credit card number as you type it.
2) Run lookups at key intervals to a BIN API to identify the type of card being entered, and display an icon of that card type within the input field.
3) After clicking away from the text field, a check mark will appear next to the input field if the card is valid. An x mark will appear if it is not.
4) If the card being entered is an American Express card, the formatting will change appropriately from 1111 1111 1111 1111 to 1111 111111 11111.
5) If the lookup to the API fails or provides no data, an error message will appear below the input field.

Try it out, and enjoy!
## How to run
1) After downloading the repository, enter into your Terminal or Command Line Interface of choice and navigate to the folder location on your computer.
2) Run either of the following commands to install the required dependencies, depending on your preference: `npm install` or `yarn install`.
3) Run either of the following commands to run the application: `npm start` or `yarn start`. The application should open in a new tab in your browser.
--You may wish to run `npm run build` or `yarn run build` to create a production build of the application.
4) Enjoy the application!
## How to run tests
This application does include a test suite to verify that all aspects of the code function as expected. Feel free to run and add your own tests!
1) In your code editor, navigate to the file `src/index.js`.
2) Follow the commented instructions within the file (towards the last 20 lines of code); this is important as the tests will fail or outright not run otherwise.
3) Enter into your Terminal or Command Line Interface of choice and navigate to the folder location on your computer.
4) Run either of the following commands to run the tests, depending on your preference: `npm run test` or `yarn run test`.
--Note that the tests can take some time to complete, as several of them require giving enough time for the BIN lookup to complete. If there are timeout issues, you may need to adjust the timeout limits within the `src/App.test.js` file.
## Known issues
1) The application does not handle copy and pasted numbers properly.
2) Deleting one character at a time from the input does not work properly; the cursor will stop moving if it hits a space.
3) Clearing the input field does not clear all images/relevant elements from the page.
4) Because of the asynchronous nature of the BIN lookup, typing a number in quickly (ie: before the application knows what type of card it is) can cause issues with formatting. This is most prevalent with American Express cards.