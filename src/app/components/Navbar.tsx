import Link from "next/link";
import './hero.css';

export default function Navbar() {
  return (
      <header className="header">
        <div className="header-content">
          <div className="logo">Noyan Marketing</div>
          <nav className="nav">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Products</a>
            <a href="#">Contact</a>
          </nav>
          <input type="search" className="search-input" placeholder="Search..." />
        </div>
      </header>
  );
}

