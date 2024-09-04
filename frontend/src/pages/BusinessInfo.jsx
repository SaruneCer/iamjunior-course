import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBusiness } from "../customHooks/useBusiness";
import { LuUpload } from "react-icons/lu";
import { LuUser } from "react-icons/lu";
import { GoClock } from "react-icons/go";
import { Button } from "../components/Button";
import { RxCalendar } from "react-icons/rx";
import SimilarBusinessCard from "../components/SimilarBusinessCard";
import { SlLocationPin } from "react-icons/sl";
import { LuMail } from "react-icons/lu";
import "../styles/business_info.css";

const BusinessInfo = () => {
  const { id } = useParams();
  const { data: businesses = [], isLoading, isError, error } = useBusiness();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const business = businesses.find((business) => business._id === id);

  const similarBusinesses = businesses.filter(
    (b) => b.category === business?.category && b._id !== id
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!business) {
    return <div>Business not found.</div>;
  }

  return (
    <main>
      <div className="top_info_section">
        <div className="left_side_container">
          <div className="image_wrapper">
            <img src={business.images[0].url} alt={business.name} />
          </div>
          <div className="basic_info_wrapper">
            <p className="service_category_title">{business.category}</p>
            <h1 className="business_title">{business.name}</h1>
            <p className="service_address">
              <SlLocationPin className="business_info_icon" />
              {business.address}
            </p>
            <p className="service_address">
              <LuMail className="business_info_icon" /> {business.email}
            </p>
          </div>
        </div>
        <div className="right_side_container">
          <Button buttonText={<LuUpload className="button_icon" />} />
          <div className="contact_person_wrapper">
            <LuUser className="business_info_icon" />
            <p className="contact_person">{business.contactPerson}</p>
          </div>
          <div className="working_hours_wrapper">
            <GoClock className="business_info_icon" />
            <p>
              Available {business.workStart} to {business.workEnd}
            </p>
          </div>
        </div>
      </div>
      <div className="bottom_info_section">
        <div className="left_side_container">
          <div className="business_description_wrapper">
            <h2 className="description_header">Description</h2>
            <p className="business_description"> {business.about}</p>
          </div>
        </div>
        <div className="right_side_container">
          <Button
            buttonText={
              <>
                <RxCalendar  className="business_info_icon"/> Book Appointment
              </>
            }
          />
          <div className="similar_business_container">
            <h3>Similar Businesses</h3>
            <div className="similar_business_list_wrapper">
              {similarBusinesses.length > 0 ? (
                similarBusinesses.map((similarBusiness) => (
                  <SimilarBusinessCard
                    key={similarBusiness._id}
                    business={similarBusiness}
                  />
                ))
              ) : (
                <p>No similar businesses found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BusinessInfo;
