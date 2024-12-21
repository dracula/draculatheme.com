"use client";

import "./index.scss";
import { GithubIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CommandMenu from "./commandMenu";
import PromoBanner from "./promoBanner";
import { usePathname } from "next/navigation";

const Header = ({ stars }) => {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  const Navigation = ({ children }) => (
    <nav>
      <ul>{children}</ul>
    </nav>
  );

  const NavigationItem = ({ href, children, className = "" }) => (
    <li>
      <Link
        href={href}
        onClick={() => isActive && setIsActive(false)}
        className={className}
      >
        {children}
      </Link>
    </li>
  );

  return (
    <header>
      {pathname !== "/pro" && <PromoBanner />}
      <div className="container">
        <div className="wrapper">
          <Link href={"/"} onClick={() => isActive && setIsActive(false)}>
            <div className="brand-wrapper">
              <span className="brand">Dracula</span>
              <span className="route">Theme</span>
            </div>
          </Link>
          <div className="mb-menu">
            <button type="button" onClick={() => setIsActive(!isActive)}>
              <span className="icon">
                <MenuIcon />
              </span>
            </button>
          </div>
        </div>
        <div className={`options${isActive ? " is-active" : ""}`}>
          <CommandMenu />
          <Navigation>
            <NavigationItem href="/about">
              <span>About</span>
            </NavigationItem>
            <NavigationItem href="/blog">
              <span>Blog</span>
            </NavigationItem>
            <NavigationItem href="/contribute">
              <span>Contribute</span>
            </NavigationItem>
            <NavigationItem href="/shop" className="shop">
              <span>Shop</span>
            </NavigationItem>
            <NavigationItem href="/pro" className="primary pro">
              <span>Dracula PRO</span>
            </NavigationItem>
            <li>
              <Link
                href="https://github.com/dracula/dracula-theme"
                target="_blank"
                className="github"
                onClick={() => isActive && setIsActive(false)}
              >
                <span className="icon">
                  <GithubIcon />
                </span>
                {stars ? (
                  <span className="stars">{stars.total.toLocaleString()}</span>
                ) : null}
              </Link>
            </li>
          </Navigation>
        </div>
      </div>
    </header>
  );
};

export default Header;
