import React, { useState } from 'react';
import MoreOptions from '../../assets/more_options.png';
import MoreOptionsModal from './MoreOptionsModal'

function ToDo({ id, text, isChecked, onTextChange, onToggleChecked, trash, onMoveToTrash, onRestore, onDeleteForever }) {
  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setTodoText] = useState(text);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  // Toggle editing state
  const toggleEditMode = () => {
    if (isEditing) {
      // When switching from editing to viewing, notify the parent component
      onTextChange(id, todoText); // Notify parent of text change
    }
    setIsEditing(!isEditing);
  };

  const handleMoreOptionsModalOpen = () => {
    setShowMoreOptions(true);
  };

  const handleMoreOptionsModalClose = () => {
    setShowMoreOptions(false);
  };

  // Handle text change
  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  return (
    <div className="to-do-item">
      <img src={MoreOptions}  alt="More options" onClick={handleMoreOptionsModalOpen} />
      <input 
        type="checkbox" 
        id='todo-check'
        checked={isChecked && !isEditing} 
        onChange={() => onToggleChecked(id)} // Notify parent of checkbox toggle
      />

      {isEditing ? (
        <input
          type="text"
          id='todo-text'
          value={todoText}
          onChange={handleInputChange}
          autoFocus // Automatically focus the input when editing
          className="todo-input"
        />
      ) : (
        <label
          id='todo-text'
          className={isChecked ? 'checked' : ''}
          // onClick={toggleEditMode} 
        >
          {todoText}
        </label>
      )}

      <button 
        style={{ display: isChecked && !isEditing || trash? 'none' : 'inline-block' }} 
        className={`${isEditing ? 'save' : 'edit'}`} 
        id="btn" 
        onClick={toggleEditMode}
      >
        {isEditing ? 'Save' : 'Edit'}
      </button>

      <MoreOptionsModal 
        show={showMoreOptions} 
        onClose={handleMoreOptionsModalClose}
        todo={{ id, trash }}
        onMoveToTrash={onMoveToTrash}
        onRestore={onRestore}
        onDeleteForever={onDeleteForever}
      />
    </div>
  );
}

export default ToDo;
