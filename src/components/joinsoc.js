import { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../firebase";

function JoinSociety({ goBack }) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const joinSociety = async () => {
    if (code !== "CLUB123") {
      setMessage("Invalid society code");
      return;
    }

    const ref = doc(db, "users", auth.currentUser.uid);

    await updateDoc(ref, {
      societies: arrayUnion("clubsync"),
    });

    setMessage("Successfully joined society");

    setTimeout(() => {
      goBack();
    }, 1200);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>➕ Join a Society</h2>

      <input
        placeholder="Enter Society Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <br /><br />

      <button onClick={joinSociety}>Join</button>

      <br /><br />
      {message && <p>{message}</p>}

      <br />
      <button onClick={goBack}>⬅ Back</button>
    </div>
  );
}

export default JoinSociety;
