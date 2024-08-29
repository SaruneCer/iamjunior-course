import { useNavigate } from "react-router-dom";
import "../styles/similar_business_card.css";

const SimilarBusinessCard = ({ business }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/details/${business._id}`);
  };

  return (
    <div className="similar_business_card" onClick={handleCardClick}>
      <div className="image_wrapper">
        {" "}
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
