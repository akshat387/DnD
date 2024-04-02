my-react-dnd-app/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── App.js
│   │   ├── MainPage.js
│   │   ├── Sidebar.js
│   │   └── ...
│   │
│   ├── styles/
│   │   ├── App.css
│   │   └── ...
│   │
│   ├── App.test.js
│   └── index.js
│
├── .gitignore
├── package.json
├── README.md
└── ...

# My React DnD App

This is a React application that allows users to create draggable text elements and configure their properties.

## Features

- Draggable text elements
- Configuration modal for setting properties like position, text, and font
- Sidebar with block options for adding different types of elements

## Technologies Used

- React
- @dnd-kit/core for drag-and-drop functionality
- Modal for modal functionality

## Setup

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/my-react-dnd-app.git
Navigate to the project directory:

bash

cd my-react-dnd-app
Install dependencies:

bash

npm install
Start the development server:

bash

npm start
Open http://localhost:3000 in your browser to view the application.

How It Works

Drag and drop text elements from the sidebar to the main area.
Click on a text element to select it and open the configuration modal.
In the modal, configure properties such as position, text content, and font.
Click "Save Changes" to apply the configuration.
Press the "Delete" key to delete the selected text element.