import React, { useState } from "react";
import axios from "axios";

function Bloc() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleNoteSubmit = (event) => {
    event.preventDefault();

    const newNote = {
      content: note,
    };

    axios
      .post("/api/notes", newNote)
      .then((res) => {
        if (res.data.success) {
          setNotes([...notes, res.data.note]);
          setNote("");
        } else {
          console.error("Error al guardar la nota:", res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error al guardar la nota:", error);
      });
  };

  return (
    <div className="font-roboto min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-3xl font-bold underline mb-6">My Notes</h1>
          <form onSubmit={handleNoteSubmit}>
            <textarea
              className="mt-4 mb-4 w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900"
              value={note}
              onChange={handleNoteChange}
            />
            <input
              className="w-full px-3 py-2 bg-purple-600 text-white rounded-md cursor-pointer hover:bg-purple-500"
              type="submit"
              value="Add Note"
            />
          </form>
          <ul>
            {notes.map((note, index) => (
              <li
                key={index}
                className="border p-4 rounded mt-4 bg-white shadow"
              >
                {note.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Bloc;
