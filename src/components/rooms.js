import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase";

function Rooms() {
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "rooms"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setRooms(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    return () => unsub();
  }, []);

  const createRoom = async () => {
    if (!roomName.trim()) return;

    await addDoc(collection(db, "rooms"), {
      name: roomName,
      createdBy: auth.currentUser.email,
      createdAt: serverTimestamp(),
    });

    setRoomName("");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h3>Rooms</h3>

      <input
        placeholder="Room name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        style={{ width: "70%" }}
      />
      <button onClick={createRoom}>Create Room</button>

      <hr />

      {rooms.length === 0 && <p>No rooms yet</p>}

      {rooms.map((room) => (
        <div
          key={room.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "8px",
            cursor: "pointer",
          }}
          onClick={() => alert(`Joined ${room.name}`)}
        >
          <strong>{room.name}</strong>
          <p style={{ margin: 0, fontSize: "12px" }}>
            Created by {room.createdBy}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Rooms;
