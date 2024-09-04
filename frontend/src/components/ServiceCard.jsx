import { useNavigate, generatePath } from "react-router-dom";
import { ROUTES } from "../router/pageRoutes";
import { Button } from "./Button";
import "../styles/service_card.css";

export function ServiceCard({ business }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const businessDetailsPath = generatePath(ROUTES.BUSINESS_INFO, {
      id: business._id,
    });
    navigate(businessDetailsPath);
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="service_card" onClick={handleCardClick}>
      <img src={business.images[0].url} alt={business.name} />

      <div className="service_info_wrapper">
        <span className="service_category_title">{business.category}</span>
        <h3 className="service_title">{business.name}</h3>
        <p className="service_contact_person">{business.contactPerson}</p>
        <p className="service_address">{business.address}</p>
        <Button buttonText={"Book now"} onClick={handleButtonClick} />
      </div>
    </div>
  );
}
