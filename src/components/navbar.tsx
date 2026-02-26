import { useState } from "react";
import MobileMenu from "./mobile-menu";
import HamburgerIcon from "../assets/icons/hamburger";
import NavLogo from "../assets/icons/nav-logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='flex w-full flex-row justify-between'>
      {/* Main navbar content */}
      <div className='flex w-full flex-row items-center justify-between px-4 py-4 md:px-8 lg:px-28'>
        {/* Left section with logo and navigation */}
        <div className='flex w-full flex-row items-center justify-between'>
          <NavLogo />

          {/* Navigation - hidden on mobile, 103px from logo*/}
          <div className='hidden lg:block'>
            <div className='flex items-center gap-8'>
              <a
                href='/home'
                className='text-sm text-neutral-900'
              >
                Home
              </a>
              <a
                href='/features'
                className='text-sm text-neutral-900'
              >
                Features
              </a>
              <a
                href='/pricing'
                className='text-sm text-neutral-900'
              >
                Pricing
              </a>
              <a
                href='/about-us'
                className='text-sm text-neutral-900'
              >
                About us
              </a>
              <a
                href='/contact'
                className='text-sm text-neutral-900'
              >
                Contact
              </a>
            </div>
          </div>

          {/* Cart and Hamburger pushed to the right */}
          <div className='hidden min-w-fit items-center gap-4 text-neutral-600 lg:flex'>
            <button>Learn More</button>
            <button>See Pricing</button>
          </div>
        </div>
      </div>

      {/* Cart and Hamburger pushed to the right */}
      <div className='flex min-w-fit items-center gap-4 px-4 text-neutral-600 md:px-8'>
        <button
          className='text-neutral-600 hover:text-gray-900 focus:shadow-[0_0px_0px_1px_rgba(68,76,231,1),0_0px_0px_4px_rgba(68,76,231,0.12)] focus:outline-none'
          onClick={() => setIsOpen(!isOpen)}
          aria-label='Toggle menu'
          aria-expanded={isOpen}
        >
          <HamburgerIcon />
        </button>
      </div>

      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </nav>
  );
}
