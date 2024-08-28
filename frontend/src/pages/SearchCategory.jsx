import { useParams } from "react-router-dom";
import { CategoriesList } from "../components/CategoriesList";
import { ServiceList } from "../components/ServiceList";
import "../styles/search_category.css";

export function SearchCategory() {
  const { category } = useParams();

  return (
    <main>
      <div className="search_category_container">
        <div className="list_wrapper">
          <h2 className="categories_list_title">Categories</h2>
          <CategoriesList isHorizontal={false} activeCategory={category} />
        </div>
        <div className="service_wrapper">
          <h2 className="category_title">{category}</h2>
          <ServiceList category={category} />
        </div>
      </div>
    </main>
  );
}
