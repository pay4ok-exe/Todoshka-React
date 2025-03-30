import { useEffect } from 'react';
import './moreOptionsModal.css';

function MoreOptionsModal({ show, onClose, todo, onMoveToTrash, onDeleteForever, onRestore }) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (show) {
      document.addEventListener('keydown', handleEscape);
      // Prevent scrolling of background content
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [show, onClose]);

  if (!show) return null;

  // Prevent click events from propagating to the overlay
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="more-options-overlay" onClick={onClose}>
      <div className="more-options-content" onClick={handleContentClick}>
        <div className="more-options-header">
          <h3>Task Options</h3>
          <button className="more-options-close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="more-options-body">
          {todo.trash ? (
            <>
              <button 
                className="more-options-btn restore-btn"
                onClick={() => {
                  onRestore(todo.id);
                  onClose();
                }}
              >
                Restore Task
              </button>
              
              <button 
                className="more-options-btn delete-btn"
                onClick={() => {
                  onDeleteForever(todo.id);
                  onClose();
                }}
              >
                Delete Forever
              </button>
            </>
          ) : (
            <button 
              className="more-options-btn trash-btn"
              onClick={() => {
                onMoveToTrash(todo.id);
                onClose();
              }}
            >
              Move to Trash
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MoreOptionsModal;