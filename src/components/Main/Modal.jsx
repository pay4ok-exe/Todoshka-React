import { useState } from "react";

function Modal({ show, handleClose, handleAdd }) {
  const [inputValue, setInputValue] = useState("");

  if (!show) {
    return null;
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddClick = () => {
    if (inputValue.trim() !== "") {
      handleAdd(inputValue);
      setInputValue("");
    }
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== "") {
      handleAddClick();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-actions">
          <h2>Add New To Do</h2>
          <button className="close-btn" onClick={handleClose}>
            ×
          </button>
        </div>
        <input
          type="text"
          placeholder="Enter your to do"
          className="modal-input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          autoFocus
          required
        />

        <button className="modal-btn" onClick={handleAddClick}>
          Add
        </button>
      </div>
    </div>
  );
}

export default Modal;