// MiniModal.js
import React from 'react';

const MoreOptionsModal = ({ show, onClose, todo, onMoveToTrash, onDeleteForever, onRestore }) => {
  if (!show) return null;

  return (
    <div className="mini-modal-overlay" onClick={onClose}>
      <div className="mini-modal-content">
        {todo.trash ? (
          <>
            <button className='selected' onClick={() => onRestore(todo.id)}>Move to Back</button>
            <button className='selected' onClick={() => onDeleteForever(todo.id)}>Delete Forever</button>
          </>
        ) : (
          <button  className='selected' onClick={() => onMoveToTrash(todo.id)}>Move to Trash</button>
        )}
        <button className="close-btn" onClick={onClose}>×</button>

      </div>
    </div>
  );
};

export default MoreOptionsModal;
