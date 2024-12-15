# README

## How to Run the Project
1. Clone the repository to your local machine using the command:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project_directory>
   ```
3. Install all the dependencies:
   ```bash
   npm install
   ```
4. Run the app on an Android emulator, connected device, or iOS simulator:
   - For Android:
     ```bash
     npx react-native run-android
     ```
   - For iOS:
     ```bash
     npx react-native run-ios
     ```


## Design Choices
This design is very simple and the Login and Sign Up page look very Simple:
- image is at the top shows the user at login page or sign up page.
- Input fields for user details like name, email, and password are displayed.
- button at the bottom for user to submit the form.


## Assumptions and Limitations
- **Assumptions:**
  - The signup data is stored in a database, and for login the email and password as check and match with Database
  - Password strength is calculated based on at least 6 characters, uppercase letters, numbers, and symbols.

- **Limitations:**
  - Password validation is predefined and might not cover all edge cases.

