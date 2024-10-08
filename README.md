# ToDo List Application

## Overview

This project is a simple ToDo list application built with React. It includes functionalities to manage tasks such as adding, editing, checking, and deleting todos. The application also includes a modal component for managing actions related to the todos.

## Features

- Add new todos
- Edit existing todos
- Check/uncheck todos to mark them as done
- Move todos to the trash
- Permanently delete todos
- Restore todos from the trash
- Filter todos by status (To Do, Done, Trash)
- Responsive UI

## File Structure

- `Main.js`: The main component that manages the state and renders the list of todos. It also handles the display of the modal and todo filtering.
- `ToDo.js`: The component representing individual todos. It allows for editing and checking/unchecking of todos.
- `Modal.js`: The modal component for adding new todos.
- `MiniModal.js`: A mini modal for additional todo actions like moving to trash or deleting forever.
- `main.css`: Styles for the main application and components.
- `add.png`: The image used for the add button.
- `more_options.png`: The image used for the more options button in each todo item.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/your-repo.git
   ```

2. Navigate to the project directory:
   ```
   cd your-repo
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the application:
   ```
   npm run dev
   ```

## Usage

- **Add Todo**: Click the "Add" button to open the modal, enter the todo text, and click \"Add\" to save.
- **Edit Todo**: Click the "Edit" button next to a todo item to edit its text.
- **Check/Uncheck Todo**: Click the checkbox to mark a todo as done or undone.
- **Move to Trash**: Click the more options button and select "Move to Trash" to move a todo to the trash.
- **Delete Forever**: In the trash view, click the more options button and select "Delete Forever" to permanently delete a todo.
- **Restore Todo**: In the trash view, click the more options button and select "Move to Back" to restore a todo to the active list.