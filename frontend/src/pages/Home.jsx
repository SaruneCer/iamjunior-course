import { CiSearch } from "react-icons/ci";
import { SearchInput } from "../components/SearchInput";
import { Button } from "../components/Button";
import { CategoriesList } from "../components/CategoriesList";
import { ServiceList } from "../components/ServiceList";
import "../styles/home.css";

export function Home() {
  return (
    <main>
      <div className="hero_container">
        <h1 className="hero_title">
          Find Home <span className="purple_text">Service/Repair</span>
          <br />
          Near You
        </h1>
        <p className="subtitle">Explore Best Home Service & Repair near you</p>
        <div className="search_wrapper">
          <SearchInput />
          <Button buttonText={<CiSearch fontSize={24} />} isRound />
        </div>
      </div>
      <CategoriesList />
      <h2>Popular businesses</h2>
      <ServiceList />
    </main>
  );
}
