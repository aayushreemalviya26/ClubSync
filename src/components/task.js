import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

function Tasks({ role }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const uid = auth.currentUser.uid;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const snap = await getDocs(collection(db, "tasks"));
    setTasks(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const createTask = async () => {
    if (!title) return;

    await addDoc(collection(db, "tasks"), {
      title,
      assignedTo: uid,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    setTitle("");
    fetchTasks();
  };

  const markDone = async (id) => {
    await updateDoc(doc(db, "tasks", id), {
      status: "done",
    });
    fetchTasks();
  };

  return (
    <div>
      <h3>Tasks</h3>

      {/* 🔴 ADMIN ONLY */}
      {role === "admin" && (
        <>
          <input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={createTask}>Assign Task</button>
          <hr />
        </>
      )}

      {/* 🔵 TASK LIST */}
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
          }}
        >
          <strong>{task.title}</strong>
          <p>Status: {task.status}</p>

          {/* 🔵 MEMBER ONLY */}
          {role === "member" && task.status === "pending" && (
            <button onClick={() => markDone(task.id)}>
              Mark Done
            </button>
          )}
        </div>
      ))}
    </div>
  );
}


export default Tasks;
