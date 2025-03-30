import { useState, useEffect } from "react";
import MoreOptions from "../../assets/more_options.png";
import MoreOptionsModal from "./MoreOptionsModal";

function ToDo({
  id,
  text,
  isChecked,
  onTextChange,
  onToggleChecked,
  trash,
  onMoveToTrash,
  onRestore,
  onDeleteForever,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setTodoText] = useState(text);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  // Update local state when props change
  useEffect(() => {
    setTodoText(text);
  }, [text]);

  const toggleEditMode = () => {
    if (isEditing) {
      // Save changes when exiting edit mode
      onTextChange(id, todoText);
    }
    setIsEditing(!isEditing);
  };

  const handleMoreOptionsModalOpen = () => {
    setShowMoreOptions(true);
  };

  const handleMoreOptionsModalClose = () => {
    setShowMoreOptions(false);
  };

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  // Handle checkbox click
  const handleCheckboxChange = () => {
    onToggleChecked(id);
  };

  return (
    <div className={`to-do-item ${isChecked ? 'completed-item' : ''}`}>
      <img
        src={MoreOptions}
        alt="More options"
        onClick={handleMoreOptionsModalOpen}
      />
      <input
        type="checkbox"
        id={`todo-check-${id}`}
        checked={isChecked}
        onChange={handleCheckboxChange}
        disabled={trash}
      />

      {isEditing ? (
        <input
          type="text"
          id="todo-text"
          value={todoText}
          onChange={handleInputChange}
          autoFocus
          className="todo-input"
        />
      ) : (
        <label 
          id="todo-text" 
          className={isChecked ? "checked" : ""}
          onClick={() => !trash && handleCheckboxChange()}
        >
          {todoText}
        </label>
      )}

      <button
        style={{
          // Only show edit button if the task is not checked and not in trash
          display: (isChecked && !isEditing) || trash ? "none" : "inline-block",
        }}
        className={`${isEditing ? "save" : "edit"}`}
        id="btn"
        onClick={toggleEditMode}>
        {isEditing ? "Save" : "Edit"}
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