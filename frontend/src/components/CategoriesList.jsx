import { FaScrewdriverWrench } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa6";
import { FaBrush } from "react-icons/fa6";
import { FaBucket } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa6";
import { PiPipeFill } from "react-icons/pi";
import { CategoryCard } from "./CategoryCard";
import "../styles/categories_list.css";

const categories = [
  { name: "shifting", icon: FaTruck, color: "#e23e40" },
  { name: "repair", icon: FaScrewdriverWrench, color: "#ecbb3a" },
  { name: "plumbing", icon: PiPipeFill, color: "#ea9319" },
  { name: "cleaning", icon: FaBucket, color: "#b12fde" },
  { name: "painting", icon: FaBrush, color: "#059e96" },
  { name: "electric", icon: FaLightbulb, color: "#1f71c5" },
];

export function CategoriesList({ isHorizontal = true, activeCategory }) {
    return (
      <div className={`categories_list_container ${isHorizontal ? "horizontal" : "vertical"}`}>
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            category={category}
            isHorizontal={isHorizontal}
            isActive={activeCategory === category.name}
          />
        ))}
      </div>
    );
  }
  
  