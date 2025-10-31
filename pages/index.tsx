"use client";

import { useEffect, useState } from "react";
import {
  createTask,
  getRun,
  listTasks,
  runTask,
  updateTask,
  deleteTask,
} from "./api/task";

const exampleTask = {
  name: "HSRP Example",
  description: "Example HSRP application steps",
  steps: [
    { type: "goto", url: "[https://example.com](https://example.com)" },
    { type: "waitFor", selector: "input[name='q']" },
    { type: "fill", selector: "input[name='q']", value: "{{search}}" },
    { type: "click", selector: "input[type='submit']" },
    { type: "screenshot", path: "out/result.png" },
  ],
  variables: { search: "Playwright" },
  options: { headless: false },
};

export default function Page() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [editor, setEditor] = useState(JSON.stringify(exampleTask, null, 2));
  const [logs, setLogs] = useState<string[]>([]);
  const [selectedRun, setSelectedRun] = useState<string | null>(null);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const t = await listTasks();
    setTasks(t);
  }

  async function saveTask() {
    const obj = JSON.parse(editor);
    await createTask(obj);
    setEditor(JSON.stringify(exampleTask, null, 2));
    await loadTasks();
  }

  async function updateExistingTask() {
    if (!editTaskId) return;
    const obj = JSON.parse(editor);
    await updateTask(editTaskId, obj);
    setEditTaskId(null);
    setEditor(JSON.stringify(exampleTask, null, 2));
    await loadTasks();
  }

  async function startRun(taskId: string) {
    const r = await runTask(taskId);
    setSelectedRun(r.runId);
    setLogs(["Run started: " + r.runId]);
    pollRun(r.runId);
  }

  async function pollRun(runId: string) {
    const interval = setInterval(async () => {
      const r = await getRun(runId);
      setLogs(r.logs || []);
      if (r.status === "success" || r.status === "failed") {
        clearInterval(interval);
      }
    }, 2000);
  }

  async function handleEdit(task: any) {
    setEditTaskId(task._id);
    setEditor(JSON.stringify(task, null, 2));
  }

  async function handleDelete(taskId: string) {
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteTask(taskId);
      await loadTasks();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {" "}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Browser Automation — Dashboard{" "}
      </h1>{" "}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Tasks Section */}{" "}
        <div className="bg-white rounded-xl shadow p-5">
          {" "}
          <div className="flex justify-between items-center mb-4">
            {" "}
            <h2 className="text-xl font-semibold">Tasks</h2>{" "}
            <button
              onClick={loadTasks}
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded"
            >
              Refresh{" "}
            </button>{" "}
          </div>{" "}
          <ul className="space-y-3">
            {tasks.map((t) => (
              <li
                key={t._id}
                className="border border-gray-200 rounded-lg p-3 flex justify-between items-center"
              >
                {" "}
                <div>
                  {" "}
                  <p className="font-medium text-gray-800">{t.name}</p>{" "}
                  <p className="text-sm text-gray-500">{t.description}</p>{" "}
                </div>{" "}
                <div className="flex gap-2">
                  <button
                    onClick={() => startRun(t._id)}
                    className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded"
                  >
                    Run{" "}
                  </button>
                  <button
                    onClick={() => handleEdit(t)}
                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded"
                  >
                    Edit{" "}
                  </button>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded"
                  >
                    Delete{" "}
                  </button>{" "}
                </div>{" "}
              </li>
            ))}{" "}
          </ul>{" "}
        </div>
        {/* Task Editor */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-semibold mb-3">
            {editTaskId ? "Edit Task" : "Create Task"} (JSON)
          </h2>
          <textarea
            value={editor}
            onChange={(e) => setEditor(e.target.value)}
            className="w-full h-80 border border-gray-300 rounded-lg p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {editTaskId ? (
            <div className="flex gap-3 mt-3">
              <button
                onClick={updateExistingTask}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 rounded-lg"
              >
                Update Task
              </button>
              <button
                onClick={() => {
                  setEditTaskId(null);
                  setEditor(JSON.stringify(exampleTask, null, 2));
                }}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={saveTask}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
            >
              Save Task
            </button>
          )}
        </div>
      </div>
      {/* Logs Section */}
      <div className="mt-8 bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-semibold mb-3">Run Logs</h2>
        <div className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg min-h-[150px] text-sm font-mono text-gray-700">
          {logs.length > 0 ? logs.join("\n") : "No logs yet."}
        </div>
      </div>
    </div>
  );
}
