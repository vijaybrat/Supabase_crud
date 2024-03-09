import { useEffect, useState } from "react";
import supabase from "../config/SupabaseClient";
import Card from "../components/Card";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      try {
        const { data, error } = await supabase.from("userData").select();
        if (error) {
          throw new Error("Could not fetch the data");
        }
        if (data) {
          setSmoothies(data);
          setFetchError(null);
        }
      } catch (error) {
        console.error("Error fetching smoothies:", error);
        setFetchError("Could not fetch the data");
        setSmoothies(null);
      }
    };

    fetchSmoothies();
  }, []);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="page home">
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <Card key={smoothie.id} smoothie={smoothie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
