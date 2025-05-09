// components/notes/NoteEditor.tsx
import React from 'react';

interface NoteEditorProps {
    value: string;
    onChange: (value: string) => void;
    readOnly: boolean;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ value, onChange, readOnly }) => {
    // This is a simplified version of what your NoteEditor might look like
    // Replace with your actual implementation if needed
    return (
        <div className="note-editor-container">
      <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readOnly}
          rows={8}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
              !readOnly ? 'focus:border-blue-500 focus:ring-blue-500' : ''
          } sm:text-sm`}
          placeholder={readOnly ? "" : "Write your note here..."}
      />
        </div>
    );
};

export default NoteEditor;