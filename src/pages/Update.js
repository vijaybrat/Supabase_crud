import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/SupabaseClient";

const Update = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    const fetchSmoothieData = async () => {
      try {
        const { data, error } = await supabase
          .from("userData")
          .select()
          .eq("id", id)
          .single();

        if (error) {
          throw new Error("Failed to fetch smoothie data");
        }

        if (data) {
          setTitle(data.title);
          setMethod(data.method);
          setRating(data.rating);
        }
      } catch (error) {
        console.error("Error fetching smoothie data:", error);
        setError("Failed to fetch smoothie data");
      }
    };

    fetchSmoothieData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from("userData")
        .update({ title, method, rating })
        .eq("id", id);

      if (error) {
        throw new Error("Failed to update smoothie");
      }

      // Optionally, you can handle success (e.g., show a success message)
    } catch (error) {
      console.error("Error updating smoothie:", error);
      setError("Failed to update smoothie");
    }
  };

  return (
    <div className="page update">
      <h2>Update - Smoothie ID: {id}</h2>
      {error && <div>Error: {error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Method:</label>
        <input type="text" value={method} onChange={(e) => setMethod(e.target.value)} />
        <label>Rating:</label>
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
        <button type="submit">Update Smoothie</button>
      </form>
    </div>
  );
};

export default Update;
