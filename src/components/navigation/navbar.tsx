import { useState } from "react";
import MobileMenu from "./mobile-menu";
import HamburgerIcon from "../../assets/icons/hamburger";
import NavLogo from "../../assets/icons/nav-logo";
import Button from "../button";
import { navLinks } from "./navigation";

const desktopLinkClass = "rounded text-sm text-neutral-600";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = window.location.pathname;

  return (
    <nav
      className='flex w-full items-center justify-between px-4 py-8 md:px-8 lg:gap-24 lg:px-28'
      role='navigation'
      aria-label='Main navigation'
    >
      <NavLogo />

      {/* Navigation desktop */}
      <div className='hidden items-center gap-8 lg:flex lg:pr-[205px]'>
        {navLinks.map(({ href, label }) => (
          <Button
            key={href}
            as='a'
            href={href}
            label={label}
            aria-label={`Go to ${label} page`}
            aria-current={pathname === href ? "page" : undefined}
            classNames={`${desktopLinkClass} ${
              pathname === href
                ? "text-neutral-900"
                : "text-neutral-600 hover:text-neutral-900 focus:text-neutral-900"
            }`}
          />
        ))}
      </div>

      {/* CTA buttons desktop */}
      <div className='hidden items-center gap-4 lg:flex'>
        <Button
          label='Learn more'
          classNames='cursor-pointer rounded border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-[0_1px_3px_rgba(0,0,0,0.10),0_1px_2px_rgba(0,0,0,0.06)] hover:bg-neutral-50 focus:bg-neutral-200 focus:outline-none'
          aria-label='Learn more'
        />
        <Button
          label='See pricing'
          classNames='cursor-pointer rounded bg-indigo-700 px-4 py-2.5 text-sm text-white shadow-[0_1px_3px_rgba(0,0,0,0.10),0_1px_2px_rgba(0,0,0,0.06)] hover:bg-indigo-800 focus:outline-none'
          aria-label='See pricing plans'
        />
      </div>

      {/* Hamburger mobile/tablet */}
      <Button
        classNames='cursor-pointer text-neutral-600 hover:text-gray-900 focus:outline-none lg:hidden'
        icon={<HamburgerIcon className='cursor-pointer' />}
        withText={false}
        onClick={() => setIsOpen(!isOpen)}
        aria-controls='mobile-menu'
        aria-label='Toggle mobile menu'
        aria-expanded={isOpen}
      />

      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </nav>
  );
}
