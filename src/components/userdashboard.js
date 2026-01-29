import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import Tasks from "./task";

function UserDashboard({ goToSociety, goBack }) {
  const [societies, setSocieties] = useState([]);
  const [code, setCode] = useState("");

  const uid = auth.currentUser.uid;

  // 🔹 Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      const ref = doc(db, "users", uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setSocieties(snap.data().societies || []);
      }
    };

    fetchUser();
  }, [uid]);

  // 🔹 Join society
  const joinSociety = async () => {
    if (!code.trim()) return;

    if (code !== "CLUB123") {
      alert("Invalid society code");
      return;
    }

    const ref = doc(db, "users", uid);

    await updateDoc(ref, {
      societies: arrayUnion("clubsync"),
    });

    setSocieties((prev) => [...prev, "clubsync"]);
    setCode("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>User Dashboard</h2>

      <button
        onClick={() => signOut(auth)}
        style={{ marginBottom: "20px" }}
      >
        Logout
      </button>

      <hr />

      {/* 🧾 SOCIETIES */}
      <h3>Your Societies</h3>

      {societies.length === 0 && <p>No societies joined yet</p>}

      {societies.map((soc) => (
        <div
          key={soc}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            margin: "10px auto",
            width: "300px",
            cursor: "pointer",
          }}
          onClick={goToSociety}
        >
          <h4>{soc.toUpperCase()}</h4>
          <p>Click to open</p>
        </div>
      ))}

      <hr />

      {/* ➕ JOIN SOCIETY */}
      <h3>Join a Society</h3>

      <input
        placeholder="Enter Society Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <br /><br />

      <button onClick={joinSociety}>Join Society</button>

      <hr />

      {/* ✅ TASKS (MEMBER VIEW ONLY) */}
      <Tasks role="member" />
    </div>
  );
}

export default UserDashboard;
