"use client";
import React, { useState } from "react";
import Marquee from "react-fast-marquee";

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

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold">TooDoo To-Do</h1>
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
      </div>
      <Marquee>
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
