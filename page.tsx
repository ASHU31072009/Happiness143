"use client";

import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDj_-SFYnJ67xIgJa2iJXDnYzoUux3vniw",
  authDomain: "happy-birthday-happiness-7748f.firebaseapp.com",
  projectId: "happy-birthday-happiness-7748f",
  storageBucket: "happy-birthday-happiness-7748f.firebasestorage.app",
  messagingSenderId: "252016765535",
  appId: "1:252016765535:web:7e560684f18bece0e749ea"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [content, setContent] = useState("");
  const [dataList, setDataList] = useState([]);

  const handleLogin = () => {
    if (username === "Ashish_verma_jii" && password === "Happiness") {
      setIsLoggedIn(true);
      fetchData();
    } else {
      alert("Invalid credentials");
    }
  };

  const handleAddData = async () => {
    if (content.trim()) {
      await addDoc(collection(db, "userContent"), { text: content });
      setContent("");
      fetchData();
    }
  };

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "userContent"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDataList(data);
  };

  return (
    <main className="p-4 max-w-md mx-auto min-h-screen bg-gray-100">
      {!isLoggedIn ? (
        <div className="space-y-4 mt-20">
          <h1 className="text-2xl font-bold text-center">Welcome Back 💖</h1>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
          >
            Login
          </button>
        </div>
      ) : (
        <div className="space-y-4 mt-10">
          <h2 className="text-xl font-bold text-center text-green-700">Hi, Ashish_verma_jii 🎉</h2>
          <input
            type="text"
            placeholder="Write something..."
            className="w-full p-2 border rounded"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <button
            onClick={handleAddData}
            className="bg-green-600 text-white py-2 px-4 rounded"
          >
            Add
          </button>
          <div>
            <h3 className="font-semibold text-gray-700">Your Entries:</h3>
            <ul className="list-disc pl-5 text-gray-800">
              {dataList.map(item => (
                <li key={item.id}>{item.text}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
