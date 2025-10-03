'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();


  useEffect(() => {
    setMenuOpen(false);
    document.body.classList.remove('menu-open');
  }, [pathname]);


  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
  }, [menuOpen]);

  return (
  
    <header className="header">
      <div className="header__container">
          <div className="header__left">  
                 <span><Link href="/">Riccardo Laurenti DEV</Link></span>
          </div>

          <div className="header__center">
                <span>Digital Designer & Creative Developer</span>
          </div>

          <div className="header__right">
              <nav>
                <ul className={clsx('header__menu', menuOpen && 'header__menu--open')}>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/about">About</Link></li>
                  <li><Link href="/work">Work</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                </ul>
              </nav>

              <div
                  className={clsx('header__hamburger', menuOpen && 'is-active')}
                  onClick={() => setMenuOpen(prev => !prev)}
                  aria-label="Toggle menu"
                  >
                  <span></span>
                  <span></span>
          </div>
        </div>
      </div>
  </header>

  );
}
