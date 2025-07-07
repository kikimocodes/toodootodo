"use client";
import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { useEffect } from "react";

type DooDooItem = {
  text: string;
  completed: boolean;
};

function toAlternatingCase(str: string) {
  return str
    .split("")
    .map((char, idx) =>
      idx % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
    )
    .join("");
}

export default function Home() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState<DooDooItem[]>([]);
  const [marqueeSpeed, setMarqueeSpeed] = useState(50);
  const [showPopup, setShowPopup] = useState(true);
  const [agreed, setAgreed] = useState(false);

  const handleAdd = () => {
    if (input.trim() !== "") {
      setItems([
        ...items,
        { text: toAlternatingCase(input.trim()), completed: true },
      ]);
      setInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAdd();
  };

  const toggleCompleted = (idx: number) => {
    setItems((items) =>
      items.map((item, i) =>
        i === idx ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const logoStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",

    transform: "translateX(-50%)",
    width: 240,
    height: 240,
    borderRadius: "50%",
    border: "0px solid #ccc",
    backgroundColor: "transparent",
    padding: 5,
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-1">
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: 32,
              borderRadius: 16,
              boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
              maxWidth: 400,
              textAlign: "center",
            }}
          >
            <h2 className="text-xl font-bold mb-4"> Warning </h2>
            <p className="mb-4">
              This is the worst to-do app ever. Thats why I decided to waste
              your time with a popup.
            </p>
            <label className="flex items-center justify-center mb-4">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed((a) => !a)}
                className="mr-2"
              />
              <span className="text-xs">
                This checkbox is also a waste of your time.
              </span>
            </label>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={!agreed}
              onClick={() => setShowPopup(false)}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <Image
          width={240}
          height={240}
          src="/newlogo.png"
          alt="logo"
          style={logoStyle}
          className="logo-image"
        />
        <p className="text-lg mt-2 align-center"> The worst to-do app ever</p>
        <div className="mt-2 w-full max-w-md">
          <form className="flex mb-4" onSubmit={handleSubmit}>
            <input
              className="flex-1 border rounded-1 px-3 py-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new task"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-r"
              onClick={handleAdd}
            >
              Add Task
            </button>
          </form>
        </div>
        <div className="flex items-stretch">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-r-1 mt-2 h-10"
            onClick={() => setMarqueeSpeed((s) => s + 50)}
          >
            Slow Down!!
          </button>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded-r-1 mt-2 w-1 h-10"
            onClick={() => setMarqueeSpeed((s) => s - 50)}
          >
            -
          </button>
          <p className="text-xs align-center mt-2 ml-2">
            careful, the box gets <br /> easily spooked.
          </p>
        </div>
      </div>
      <Marquee speed={marqueeSpeed}>
        <div className="bg-amber-200 rounded-2xl shadow-lg p-5 mt-20 w-full max-w-md">
          <ul>
            {items.map((item, idx) => (
              <li key={idx} className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  checked={!item.completed}
                  onChange={() => toggleCompleted(idx)}
                  className="mr-2"
                />
                <span className={item.completed ? "line-through" : ""}>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Marquee>
    </main>
  );
}
