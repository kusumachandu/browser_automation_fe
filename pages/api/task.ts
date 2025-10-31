import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

const API = (path: string) => `${API_BASE}/api${path}`;
console.log(API);

export async function listTasks() {
  try {
    const res = await axios.get(API("/tasks"), {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data;
  } catch (err: any) {
    console.error("Error fetching tasks:", err.message);
    throw new Error(err.response?.data?.message || "Failed to fetch tasks");
  }
}

export async function createTask(task: any) {
  try {
    const res = await axios.post(API("/tasks"), task, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err: any) {
    console.error("Error creating task:", err.message);
    throw new Error(err.response?.data?.message || "Failed to create task");
  }
}

export async function getTask(id: string) {
  try {
    const res = await axios.get(API(`/tasks/${id}`), {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data;
  } catch (err: any) {
    console.error("Error fetching task:", err.message);
    throw new Error(err.response?.data?.message || "Failed to fetch task");
  }
}

export async function runTask(id: string) {
  try {
    const res = await axios.post(API(`/tasks/${id}/run`));
    return res.data;
  } catch (err: any) {
    console.error("Error running task:", err.message);
    throw new Error(err.response?.data?.message || "Failed to run task");
  }
}

export async function getRun(id: string) {
  try {
    const res = await axios.get(API(`/runs/${id}`), {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data;
  } catch (err: any) {
    console.error("Error fetching run:", err.message);
    throw new Error(err.response?.data?.message || "Failed to fetch run");
  }
}

export async function updateTask(id, data) {
  return axios.put(`${API(`/tasks/${id}`)}`, data).then((res) => res.data);
}

export async function deleteTask(id) {
  return axios.delete(`${API(`/tasks/${id}`)}`).then((res) => res.data);
}
