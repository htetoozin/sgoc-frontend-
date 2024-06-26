"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { url } from "@/network/domain";
import SubmitButton from "@/app/common/SubmitButton";

const CreateTodoPage = () => {
  const router = useRouter();

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    is_active: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setTodo({ ...todo, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = (event) => {
    setTodo({ ...todo, is_active: event.target.checked });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch(`${url}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    setLoading(false);
    if (response.ok) {
      const data = await response.json();
      router.push("/");
    } else {
      console.error("Failed to create todo");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="w-1/2" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Sample Title"
            value={todo.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            value={todo.description}
            onChange={handleChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Sample Description"
          />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              checked={todo.is_active}
              onChange={handleCheckboxChange}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="active"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Active
          </label>
        </div>

        <SubmitButton loading={loading} label="Create" />
      </form>
    </main>
  );
};

export default CreateTodoPage;
