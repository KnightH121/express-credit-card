import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt4, HiX } from "react-icons/hi";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const Navbar = () => {
  const [toggled, setToggled] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollPage = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", scrollPage);

    return () => {
      window.removeEventListener("scroll", scrollPage);
    };
  }, [isScrolled]);

  return (
    <header className={isScrolled ? "scrolled" : ""}>
      <nav className="desktop navbar">
        <a
          href="#"
          className={isScrolled ? "scrollLogo logo-name" : "logo-name"}
        >
          EXPRESSCCSHOP
        </a>
        <ul className={isScrolled ? "scrollLinks ds-links" : "ds-links"}>
          <li>
            <a href="#store">Store</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
          <li>
            <a href="#support">Support Center</a>
          </li>
        </ul>

        <div className="app-navbar-menu mobile">
          <HiMenuAlt4
            onClick={() => {
              setToggled(!toggled);
            }}
            className="icon"
          />

          <Sidebar
            onBackdropClick={() => setToggled(false)}
            toggled={toggled}
            breakPoint="all"
            rtl
            width="60%"
          >
            <ul>
              <HiX onClick={() => setToggled(!toggled)} className="icon" />
              {[{name: "Store", id: "store"}, {name: "Contact Us",  id: "contact"},{name: "Support Center", id: "support"}].map((item, index) => (
                <li key={index + item} className="app__flex link-item">
                  <a href={`#${item.id.toLocaleLowerCase()}`} onClick={() => setToggled(!toggled)}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </Sidebar>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
