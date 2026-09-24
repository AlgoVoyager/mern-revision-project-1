import { apiFetch } from "./client";

export async function getTasks() {
    const response = await apiFetch("/tasks");
    const data = response.json();
    if(!response.ok){
        throw new Error(data.message || "Failed to fech tasks")
    }
    return data;
}