import { businesses } from "../data/business";
import { ServiceCard } from "./ServiceCard";
import "../styles/service_list.css"

export function ServiceList({ category }) {
  const filteredBusiness = category
    ? businesses.filter((business) => business.category === category)
    : businesses;
  return (
    <div className="service_list">
      {filteredBusiness.map((business, index) => (
        <ServiceCard key={`${business._id}-${index}`} business={business} />
      ))}
    </div>
  );
}
