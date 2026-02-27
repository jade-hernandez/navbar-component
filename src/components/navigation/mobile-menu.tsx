import { useEffect, useRef } from "react";
import CloseIcon from "../../assets/icons/close-icon";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import Portal from "../portal";
import NavLogo from "../../assets/icons/nav-logo";
import Button from "../button";
import { navLinks } from "./navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const mobileLinkBaseClass =
  "cursor-pointer gap-3 rounded p-3 text-sm focus:outline-none justify-start";

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const headerId = "mobile-menu-header";
  const pathname = window.location.pathname;

  useFocusTrap(menuRef as React.RefObject<HTMLElement>, isOpen);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      const mainContent = document.querySelector(".gfe-main");
      mainContent?.classList.add("blur-sm", "brightness-90");
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
      const mainContent = document.querySelector(".gfe-main");
      mainContent?.classList.remove("blur-sm", "brightness-90");
    };
  }, [isOpen, onClose]);

  return (
    <Portal>
      <div
        id='mobile-menu'
        role='dialog'
        aria-modal='true'
        aria-label='Mobile navigation menu'
        aria-labelledby={headerId}
        className={`fixed left-0 z-50 lg:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Background overlay */}
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
          aria-hidden='true'
        />

        {/* Menu panel */}
        <div
          ref={menuRef}
          className={`fixed inset-y-0 left-0 z-50 flex w-fit min-w-[359px] transform flex-col gap-6 bg-white p-4 pt-8 transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header with logo and close button */}
          <div className='flex items-center justify-between'>
            <h2
              id={headerId}
              className='sr-only'
            >
              Main navigation menu
            </h2>
            <NavLogo aria-hidden='true' />
            <Button
              classNames='group cursor-pointer justify-center rounded text-neutral-600 hover:text-gray-900 focus:shadow-[0_0px_0px_1px_rgba(68,76,231,1),0_0px_0px_4px_rgba(68,76,231,0.12)] focus:outline-none'
              icon={<CloseIcon />}
              withText={false}
              onClick={onClose}
              aria-label='Close mobile menu'
            />
          </div>

          {/* Navigation links */}
          <nav
            role='navigation'
            aria-label='Mobile navigation'
            className={`flex flex-1 flex-col gap-2 transition-all duration-300 ${
              isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? "150ms" : "0ms" }}
          >
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Button
                  key={href}
                  as='a'
                  href={href}
                  label={label}
                  onClick={onClose}
                  aria-label={`Go to ${label} page`}
                  aria-current={isActive ? "page" : undefined}
                  classNames={`${mobileLinkBaseClass} ${
                    isActive
                      ? "bg-neutral-50 text-neutral-900"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 focus:bg-neutral-50 focus:text-neutral-900"
                  }`}
                />
              );
            })}
          </nav>

          {/* Bottom CTA buttons */}
          <div className='flex flex-col gap-4'>
            <Button
              label='Learn more'
              classNames='w-full cursor-pointer rounded border border-neutral-200 bg-white px-4 py-2.5 text-base text-neutral-900 shadow-[0_1px_3px_rgba(0,0,0,0.10),0_1px_2px_rgba(0,0,0,0.06)] hover:bg-neutral-50 focus:bg-neutral-200 focus:text-neutral-950 focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400'
              onClick={onClose}
              aria-label='Learn more about our product'
            />
            <Button
              label='Try it out'
              classNames='w-full cursor-pointer rounded bg-indigo-700 px-4 py-2.5 text-base text-white shadow-[0_1px_3px_rgba(0,0,0,0.10),0_1px_2px_rgba(0,0,0,0.06)] hover:bg-indigo-800 focus:shadow-[0_0px_0px_1px_rgba(68,76,231,1),0_0px_0px_4px_rgba(68,76,231,0.12)] focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400'
              onClick={onClose}
              aria-label='Try it out'
            />
          </div>
        </div>
      </div>
    </Portal>
  );
}
