React Admin Dashboard
Overview
This React Admin Dashboard is a versatile web application that includes functionalities for managing tables, charts, calendar events, and Kanban tasks. It features customizable themes, interactive charts, and a dynamic calendar, providing a comprehensive suite for managing and visualizing data.

Features
Customizable Themes: Toggle between light and dark themes.
Data Table: Add, update, delete rows and columns.
Interactive Charts: Create, update, and delete charts based on table data.
Calendar: Add, remove, and rename events.
Kanban Board: Add and delete tasks, manage task statuses.
Technologies Used
React: Frontend library for building the user interface.
Material-UI: React components library for UI elements.
Chart.js: Library for rendering charts.
React Router DOM: For routing and navigation within the application.
React DnD: For drag-and-drop functionality in the Kanban board.

Usage
Navigation
Table: Manage and visualize tabular data.
Charts: Add, configure, and delete charts based on the table data.
Calendar: Add, remove, and manage events.
Kanban: Organize tasks with a drag-and-drop interface.
Theme Toggle
Use the theme toggle button in the navigation bar to switch between light and dark themes.
Table Management
Add Data: Use the form to add new rows.
Add Column: Add new columns to the table.
Delete Row: Remove specific rows from the table.
Delete Column: Remove specific columns and associated data from the table.
Update Data: Modify cell values in existing rows.
Chart Management
Add Chart: Create new charts by selecting the type and columns.
Delete Chart: Remove existing charts.
Calendar Management
Add Event: Create new events with a title and date.
Remove Event: Delete specific events.
Rename Event: Change the title of existing events.
Kanban Board
Add Task: Create new tasks in different columns (To Do, In Progress, Done).
Delete Task: Remove specific tasks from the board.
Configuration
The application’s theme and layout can be adjusted in the ThemeContext.js file. Modify createTheme to change theme settings.

Contributing
Feel free to fork the repository and submit pull requests. Ensure your changes adhere to the existing code style and include relevant tests.

#Commands to install necessary dependancies after installing the files from src folder:
# Install React and React DOM
npm install react react-dom

# Install Material-UI core and icons
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material

# Install Chart.js and its React wrapper
npm install chart.js react-chartjs-2

# Install React Router for routing
npm install react-router-dom@^6

# Install React DnD for drag-and-drop functionality
npm install react-dnd react-dnd-html5-backend
