import { useNavigate, generatePath } from "react-router-dom";
import { ROUTES } from "../router/pageRoutes";
import "../styles/category_card.css";

export function CategoryCard({ category, isHorizontal, isActive }) {
  const { name, icon } = category;
  const Icon = icon;
  const navigate = useNavigate();
  const categoryPath = generatePath(ROUTES.SEARCH_CATEGORY, { category: name });

  return (
    <div
      className={`category_card ${isHorizontal ? "horizontal" : "vertical"} ${isActive ? "active_category_card" : ""}`}
      onClick={() => navigate(categoryPath)}
    >
      <Icon fontSize={48} color={category.color} />
      <p className="category_name">{name}</p>
    </div>
  );
}
