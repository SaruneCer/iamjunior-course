import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTES } from "../router/pageRoutes";
import "../styles/navigation.css"


export function Navigation() {
  const location = useLocation();

  const [activeLink, setActiveLink] = useState(location.pathname);

  const navigationLinks = [
    {
      href: ROUTES.HOME,
      label: "Home",
    },
    {
      href: ROUTES.SERVICES,
      label: "Services",
    },
    {
      href: ROUTES.ABOUT_US,
      label: "About Us",
    },
  ];

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <nav className="top_navigation">
      {navigationLinks.map((link) => (
        <Link
          key={link.label}
          to={link.href}
          className={`navigation_link ${
            activeLink === link.href ? "active_link" : ""
          }`}
          onClick={() => setActiveLink(link.href)}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
