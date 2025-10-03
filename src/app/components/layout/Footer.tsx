"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-columns">

          <div className="footer-column">
            <h4>Menu</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/work">Work</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Social</h4>
            <ul>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://behance.net" target="_blank" rel="noopener noreferrer">Behance</a></li>
            </ul>
          </div>


          <div className="footer-column">
            <h4>Contact</h4>
            <p><a href="riccardo.laurenti@info.com">riccardo.laurenti@info.com</a></p>


            <p><a href="riccardo.laurenti@info.com">riccardo.laurenti@info.com</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
