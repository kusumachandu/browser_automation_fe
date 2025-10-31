"use client";

import { useEffect, useState } from "react";
import Navbar from "../UI/Navbar";
import TaskCard from "../UI/TaskCard";
import { listTasks } from "../api/task";

export default function HomePage() {
  const [tasks, setTasks] = useState<any[]>([]);
  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const t = await listTasks();
    setTasks(t);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="px-6 md:px-12 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          Your Saved Automation Tasks
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </main>
    </div>
  );
}
