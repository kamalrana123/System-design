import { useState, useEffect, useRef } from 'react';

interface NotesProps {
  pageId: string;
}

export default function Notes({ pageId }: NotesProps) {
  const [note, setNote] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const savedNote = localStorage.getItem(`note-${pageId}`);
    setNote(savedNote || '');
  }, [pageId]);

  const handleSave = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNote(value);
    localStorage.setItem(`note-${pageId}`, value);
  };

  const clearNote = () => {
    if (window.confirm('Clear all notes for this page?')) {
      setNote('');
      localStorage.removeItem(`note-${pageId}`);
    }
  };

  // Focus textarea when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen]);

  return (
    <div className={`notes-widget ${isOpen ? 'open' : ''}`}>
      {isOpen && (
        <div className="notes-window">
          <div className="notes-header">
            <div className="notes-title-area">
              <span className="notes-icon">📝</span>
              <h3>My Notes</h3>
            </div>
            <button className="close-notes" onClick={() => setIsOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <textarea
            ref={textareaRef}
            className="notes-textarea"
            placeholder="Write your personal notes here..."
            value={note}
            onChange={handleSave}
          />
          <div className="notes-footer">
            <button className="clear-notes-btn" onClick={clearNote}>Clear</button>
            <span className="save-indicator">Auto-saving...</span>
          </div>
        </div>
      )}

      <button 
        className={`notes-fab ${note.trim() ? 'has-content' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Notes"
      >
        <span className="fab-icon">{isOpen ? '✕' : '📝'}</span>
        {!isOpen && note.trim() && <span className="content-dot"></span>}
      </button>
    </div>
  );
}