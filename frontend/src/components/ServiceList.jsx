import { useBusiness } from "../customHooks/useBusiness";
import { ServiceCard } from "./ServiceCard";
import "../styles/service_list.css";

export function ServiceList({ category }) {
  const { data: businesses = [], isLoading, isError, error } = useBusiness();

  const filteredBusinesses = category
    ? businesses.filter((business) => business.category === category)
    : businesses;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
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
