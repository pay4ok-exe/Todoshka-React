import React, { useState } from 'react';
import MoreOptions from '../../assets/more_options.png';

function ToDo() {
  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setTodoText] = useState('To Do'); // Initial text state

  // Toggle editing state
  const toggleEditMode = () => {
    if (isEditing) {
      // When switching from editing to viewing, save the data
      console.log('Final ToDo:', todoText); // Here, you can handle the final submission logic
    }
    setIsEditing(!isEditing);
  };

  // Handle text change
  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  // Handle losing focus
  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="to-do-item">
      <img src={MoreOptions} alt="More options" />
      <input type="checkbox" id="todo-check" />

      {isEditing ? (
        <input
          type="text"
          id="todo-text"
          value={todoText}
          onChange={handleInputChange}
          autoFocus // Automatically focus the input when editing
          className="todo-input"
        />
      ) : (
        <label
          id="todo-text"
          className="todo-text"
        >
          {todoText}
        </label>
      )}

        <button className={`${isEditing ? 'save' : 'edit'}`} id="btn" onClick={toggleEditMode}>
        {isEditing ? 'Save' : 'Edit'}
        </button>
    </div>
  );
}

export default ToDo;
