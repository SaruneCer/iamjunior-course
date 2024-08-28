import { useState, useEffect } from "react";
import axios from "axios";
import { ServiceCard } from "./ServiceCard";
import "../styles/service_list.css";

export function ServiceList({ category }) {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/business")
      .then((response) => {
        setBusinesses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching businesses");
        setLoading(false);
        console.error("Error fetching businesses:", error);
      });
  }, []);

  const filteredBusinesses = category
    ? businesses.filter((business) => business.category === category)
    : businesses;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="service_list">
      {filteredBusinesses.length > 0 ? (
        filteredBusinesses.map((business) => (
          <ServiceCard key={business._id} business={business} />
        ))
      ) : (
        <div>No businesses found.</div>
      )}
    </div>
  );
}
