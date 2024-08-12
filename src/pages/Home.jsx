import { CiSearch } from "react-icons/ci";
import { SearchInput } from "../components/SearchInput";
import { Button } from "../components/Button";

export function Home() {
  return (
    <main>
      <div className="hero_container">
        <h1>
          Find Home <span className="purple_text">Service/Repair</span>
          <br />
          Near You
        </h1>
        <p>Explore Best Home Service & Repair near you</p>
        <div className="search_wrapper">
                  <SearchInput />
                  <Button buttonText={""} isRound>
                      <div><CiSearch fontSize={24} />
                      </div></Button>
                  
  
        </div>
      </div>
    </main>
  );
}
