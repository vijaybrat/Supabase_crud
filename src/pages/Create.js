import { useState } from "react";
import supabase from "../config/SupabaseClient";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !method.trim() || !rating.trim()) {
      setFormError("Please fill in all fields correctly.");
      return;
    }
    try {
      const { data, error } = await supabase
        .from("userData")
        .insert([{ title, method, rating }])
        .select();
      if (error) {
        throw new Error("An error occurred while saving the data.");
      }
      if (data) {
        setTitle("");
        setMethod("");
        setRating("");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setFormError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          autoComplete="new-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="method">Method:</label>
        <input
          type="text"
          id="method"
          autoComplete="new-text"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          id="rating"
          autoComplete="new-number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button>Create Smoothie Recipe</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
