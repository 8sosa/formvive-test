"use client";
import { useState } from "react";

const ProductForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [form, setForm] = useState({
    productName: "",
    problem: "",
    audience: "General Users",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4 text-black">
      <h2 className="text-2xl font-bold">Product Feedback Form</h2>
      <input
        name="productName"
        placeholder="Product Name"
        value={form.productName}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        required
      />
      <textarea
        name="problem"
        placeholder="What problem does this solve?"
        value={form.problem}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        required
      />
      <select
        name="audience"
        value={form.audience}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      >
        <option>General Users</option>
        <option>Tech Enthusiasts</option>
        <option>Students</option>
        <option>Startups</option>
      </select>
      <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
        Submit
      </button>
    </form>
  );
};

export default ProductForm;