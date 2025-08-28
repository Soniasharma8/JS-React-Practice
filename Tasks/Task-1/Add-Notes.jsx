import { useState, useEffect, useActionState } from "react";

export default function NotesApp() {
  // load from localStorage once on mount
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem("notes");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  useEffect(() => {
    try {
      localStorage.setItem("notes", JSON.stringify(notes));
    } catch {}
  }, [notes]);

  async function addNoteAction(prevState, formData) {
    const newNote = formData.get("note");
    if (!newNote || !newNote.toString().trim()) return prevState;

    const noteObj = {
      id: Date.now(),
      text: newNote.toString().trim(),
    };
    
    let saved = [];
    try {
      const raw = localStorage.getItem("notes");
      saved = raw ? JSON.parse(raw) : [];
    } catch {
      saved = prevState || [];
    }

    const updated = [...saved, noteObj];

    try {
      localStorage.setItem("notes", JSON.stringify(updated));
    } catch {}

    return updated;
  }

  const [currentNotes, formAction, isPending] = useActionState(addNoteAction, notes);


  useEffect(() => {
    try {
      const a = JSON.stringify(currentNotes || []);
      const b = JSON.stringify(notes || []);
      if (a !== b) setNotes(currentNotes || []);
    } catch {
      setNotes(currentNotes || []);
    }
  }, [currentNotes]);

  function deleteNote(id) {
    setNotes((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      try {
        localStorage.setItem("notes", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }

  function clearAll() {
    setNotes([]);
    try {
      localStorage.removeItem("notes");
    } catch {}
  }

  return (
    <>
      <style>{`
        /* make page full screen */
        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
        }

        /* full-screen gradient */
        .app-container {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #6a5acd, #ff69b4);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
        }

        /* centered card (like login/signup) */
        .card {
          width: 100%;
          max-width: 520px;
          background: rgba(255,255,255,0.98);
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          padding: 28px;
          box-sizing: border-box;
        }

        .card-header {
          text-align: center;
          margin-bottom: 18px;
        }

        .card-header h1 {
          margin: 0;
          font-size: 22px;
          color: #222;
        }

        /* small centered input row */
        .add-row {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: center;
          margin: 12px 0 20px;
        }

        .add-box {
          width: 100%;
          max-width: 420px;
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .add-box input {
          flex: 1;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 15px;
        }

        .add-box button {
          padding: 10px 14px;
          border: none;
          border-radius: 8px;
          background: #6a5acd;
          color: #fff;
          cursor: pointer;
          font-weight: 600;
        }
        .add-box button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* actions (clear all) */
        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-bottom: 8px;
        }
        .clear-btn {
          background: transparent;
          border: 1px solid #e0e0e0;
          padding: 6px 10px;
          border-radius: 8px;
          cursor: pointer;
        }

        /* notes container inside card (scrollable if many) */
        .notes-container {
          max-height: calc(80vh - 220px);
          overflow-y: auto;
          padding-right: 6px;
        }

        .notes-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .note-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f9fbff;
          border-radius: 10px;
          padding: 12px 14px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
          color: #151515;
          font-size: 15px;
        }

        .note-text {
          word-break: break-word;
          margin-right: 10px;
          flex: 1;
        }

        .note-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .note-actions button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 18px;
        }

        .no-notes {
          text-align: center;
          color: #666;
          padding: 30px 12px;
          font-size: 16px;
        }

        /* responsive */
        @media (max-width: 520px) {
          .card { padding: 18px; }
          .add-box input { font-size: 14px; }
        }

        .clear-btn {
  background: #ff4d4f;         /* red background */
  color: #fff;                 /* white text */
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: background 0.25s ease, transform 0.2s ease;
}

.clear-btn:hover {
  background: #d9363e;        /* darker red on hover */
  transform: translateY(-2px);
}

.clear-btn:active {
  transform: translateY(0);   /* normal position on click */
}

.clear-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

      `}</style>

      <div className="app-container">
        <div className="card" role="region" aria-label="Notes App Card">
          <div className="card-header">
            <h1>📝 My Notes</h1>
            <div style={{fontSize:12, color:'#555', marginTop:6}}>Add quick notes — saved locally</div>
          </div>

          {/* centered small add form like login */}
          <div className="add-row">
            <div className="add-box">
              <form action={formAction} style={{display:'contents'}}>
                <input
                  name="note"
                  type="text"
                  placeholder="Write a note..."
                  autoComplete="off"
                />
                <button type="submit" disabled={isPending}>
                  {isPending ? "Adding..." : "Add"}
                </button>
              </form>
            </div>
          </div>

          <div className="actions">
  {notes.length > 0 && (
    <button className="clear-btn" onClick={clearAll} title="Clear all notes">
      Clear All
    </button>
  )}
</div>


          <div className="notes-container">
            {notes.length === 0 ? (
              <div className="no-notes">No notes yet — add one from above.</div>
            ) : (
              <ul className="notes-list">
                {notes.map((note) => (
                  <li className="note-item" key={note.id}>
                    <div className="note-text">{note.text}</div>
                    <div className="note-actions">
                      <button
                        onClick={() => {
                          
                          deleteNote(note.id);
                        }}
                        aria-label="Delete note"
                        title="Delete"
                      >
                        ❌
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}





