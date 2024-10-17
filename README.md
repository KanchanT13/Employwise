EmployWise Application
Project Overview
EmployWise is a React application that allows users to log in, view a list of users, edit user information, and delete users. The application handles token persistence and expiration, ensuring secure access to protected routes. It utilizes Reqres.in as a mock API for authentication and user data.

Prerequisites
Before you begin, make sure you have the following installed on your system:

Node.js (version 14 or higher): Download Node.js
npm (comes with Node.js)
Installation
Follow these steps to set up the project locally:

Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/employwise.git
Navigate to the project directory:

bash
Copy code
cd employwise
Install the dependencies:

bash
Copy code
npm install
This command installs all necessary packages listed in the package.json file.

Running the Project
To start the application locally:

Start the development server:

bash
Copy code
npm start
This command runs the app in development mode. Open http://localhost:3000 to view it in your browser.

Login Credentials:

Use the following credentials to log in:

Email: eve.holt@reqres.in
Password: Any non-empty string (e.g., cityslicka)
Usage
Login:

Enter the provided email and any non-empty password to log in.

Users List:

After logging in, you'll see a list of users fetched from the API.
Use the search bar to filter users by first or last name.
Navigate through pages using the "Previous" and "Next" buttons.
Edit User:

Click on the "Edit" button on a user's card to modify their details.
Update the user's first name, last name, or email.
Click "Update" to save changes.
Delete User:

Click the "Delete" button on a user's card to remove them from the list.
Confirm the deletion when prompted.
Logout:

Click on the "Sign Out" button to log out.
This will clear your token and redirect you to the login page.
Assumptions and Considerations
Token Management
Token Storage:

The authentication token is stored in localStorage along with an expiration timestamp (tokenExpiry).
Token Expiration:

The token is set to expire 1 hour after login.
Upon expiration, the user is automatically redirected to the login page.
The token and its expiry are removed from localStorage on logout.
Protected Routes
Access Control:

Routes like /users and /edit/:id are protected.
Users cannot access these routes without a valid, non-expired token.
Attempting to access protected routes without a valid token redirects to the login page.
API Considerations
Mock API:

The application uses Reqres.in as a mock API.
Since it's a mock API, some functionalities like data persistence are simulated.
Data Handling:

Editing or deleting a user updates the state locally.
Changes are not persisted on the server due to API limitations.
Error Handling
Network Errors:

The app includes basic error handling for network requests.
Error messages are displayed to inform the user of any issues.
UI/UX
Design:

The UI is built using Material-UI (MUI).
Efforts have been made to keep the UI consistent and user-friendly.
Responsiveness:

The layout is responsive and works on various screen sizes.
Assumptions
Authentication:

Authentication is handled via a token received upon successful login.
No actual user registration is implemented.
Data Validity:

It's assumed that the data from the API is valid and correctly formatted.
User Permissions:

All users have permissions to edit or delete any user in the list.
Dependencies
The project relies on the following main dependencies:

React: Library for building user interfaces.
React Router DOM: For routing and navigation.
Axios: For making HTTP requests to the API.
Material-UI (MUI): For UI components and styling.
Project Structure
java
Copy code
employwise/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── UsersList.js
│   │   └── EditUser.js
│   ├── App.js
│   ├── index.js
│   └── ...other files
├── package.json
└── README.md
Scripts
Start the development server:

bash
Copy code
npm start
Build the app for production:

bash
Copy code
npm run build
Run tests:

bash
Copy code
npm test
Additional Notes
Port Configuration:

By default, the app runs on port 3000. If port 3000 is occupied, you may be prompted to run the app on another port.
Browser Compatibility:

The application is compatible with modern browsers like Chrome, Firefox, and Edge.
Code Formatting:

The code follows standard React and JavaScript best practices.
Contact
If you encounter any issues or have questions, feel free to reach out:

Email: your.email@example.com
GitHub Issues: GitHub Repository
Thank you for using EmployWise! We hope this application meets your needs.
