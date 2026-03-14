import { useState } from 'react';

function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const[editText, setEditText] = useState(task.text);
  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  return (
    <li style={{
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px', 
      padding: '8px', 
      borderBottom: '1px solid #eee'
    }}>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => onToggle(task.id)} 
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
          style={{ flex: 1, padding: '4px' }}
        />
      ) : (
        <span 
          onDoubleClick={() => setIsEditing(true)} 
          title="Двойной клик для редактирования"
          style={{
            flex: 1,
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? '#999' : 'inherit',
            cursor: 'pointer'
          }}
        >
          {task.text}
        </span>
      )}

      <button 
        onClick={() => onDelete(task.id)}
        style={{
          background: '#ff4444', 
          color: 'white', 
          border: 'none',
          borderRadius: '4px', 
          padding: '4px 8px', 
          cursor: 'pointer'
        }}
      >
        Удалить
      </button>
    </li>
  );
}

export default TodoItem;