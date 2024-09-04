import { useNavigate, generatePath } from "react-router-dom";
import { ROUTES } from "../router/pageRoutes"; 
import "../styles/similar_business_card.css";

const SimilarBusinessCard = ({ business }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const businessDetailsPath = generatePath(ROUTES.BUSINESS_INFO, {
      id: business._id,
    });
    navigate(businessDetailsPath);
  };

  return (
    <div className="similar_business_card" onClick={handleCardClick}>
      <div className="image_wrapper">
        <img src={business.images[0].url} alt={business.name} />
      </div>

      <div className="service_info_wrapper">
        <h4 className="service_title">{business.name}</h4>
        <p className="service_contact_person">{business.contactPerson}</p>
        <p className="service_address">{business.address}</p>
      </div>
    </div>
  );
};

export default SimilarBusinessCard;
