import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaScrewdriverWrench,
  FaTruck,
  FaBrush,
  FaBucket,
  FaLightbulb,
} from "react-icons/fa6";
import { PiPipeFill } from "react-icons/pi";
import { CategoryCard } from "./CategoryCard";
import "../styles/categories_list.css";

const iconMapping = {
  FaTruck: FaTruck,
  FaScrewdriverWrench: FaScrewdriverWrench,
  PiPipeFill: PiPipeFill,
  FaBucket: FaBucket,
  FaBrush: FaBrush,
  FaLightbulb: FaLightbulb,
};

export function CategoriesList({ isHorizontal = true, activeCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/category")
      .then((response) => {
        const fetchedCategories = response.data.map((category) => ({
          ...category,
          icon: iconMapping[category.icon] || FaLightbulb,
        }));
        setCategories(fetchedCategories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div
      className={`categories_list_container ${
        isHorizontal ? "horizontal" : "vertical"
      }`}
    >
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          category={category}
          isHorizontal={isHorizontal}
          isActive={activeCategory === category.name}
        />
      ))}
    </div>
  );
}
