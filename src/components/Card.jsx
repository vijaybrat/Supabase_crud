import React from "react";
import { Link } from "react-router-dom";
import supabase from "../config/SupabaseClient";

const Card = ({ smoothie }) => {
  const handleDelete = async () => {
    try {
      const { data, error } = await supabase
        .from("userData")
        .delete()
        .eq("id", smoothie.id)
        .select();

      if (error) {
        throw new Error(`Error deleting smoothie: ${error.message}`);
      }

      if (data) {
        console.log("Smoothie deleted successfully:", data);
        // Optionally, you can handle success (e.g., show a success message)
      }
    } catch (error) {
      console.error("Error deleting smoothie:", error);
      // Optionally, you can set an error state to display an error message
    }
  };

  return (
    <div className="smoothie-card">
      <h3 className="smoothie-title">{smoothie.title}</h3>
      <p className="smoothie-method">{smoothie.method}</p>
      <div className="smoothie-rating">{smoothie.rating}</div>
      <div className="button">
        <Link to={`/${smoothie.id}`} className="view-details-link">
          <i className="material-icons">edit</i>
        </Link>
        <i onClick={handleDelete} className="material-icons">
          delete
        </i>
      </div>
    </div>
  );
};

export default Card;
