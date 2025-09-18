import { navbarLinks } from "../../data/navbarLinks.js";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaPhone } from "react-icons/fa";
import { FACEBOOK_URL, INSTAGRAM_URL, PHONE_NUMBER } from "../../consts.js";
import logo from "../../assets/mcfly-logo-nav.png";

const Navbar = ({ pathname }) => {
  const [openMobile, setOpenMobile] = useState(false);
  const [navBar, setNavbar] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  const handleHamburgerClick = () => {
    setOpenMobile(() => !openMobile);
    if (!openMobile) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackgroundAndLogo);
    return () => {
      window.removeEventListener("scroll", changeBackgroundAndLogo);
    };
  }, []);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [subHoveredIndex, setSubHoveredIndex] = useState(null);

  const isActive = (menuItem, pathname) => {
    let selected =
      menuItem?.submenu?.some(
        (item) =>
          item.link === pathname ||
          item.link + "/" === pathname ||
          item.subsubmenu?.some(
            (subItem) =>
              subItem.link === pathname || subItem.link + "/" === pathname,
          ),
      ) ||
      menuItem?.subsubmenu?.some(
        (item) => item.link === pathname || item.link + "/" === pathname,
      ) ||
      menuItem.link === pathname ||
      menuItem.link + "/" === pathname;
    return selected;
  };

  const changeBackgroundAndLogo = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const handleItemClick = (index) => {
    if (hoveredIndex == index) {
      setHoveredIndex(null);
      setSubHoveredIndex(null);
    } else setHoveredIndex(index);
  };

  const handleSubItemClick = (event, subIndex) => {
    event.stopPropagation();
    if (subHoveredIndex == subIndex) setSubHoveredIndex(null);
    else setSubHoveredIndex(subIndex);
  };

  return (
    <nav className="fixed top-0 z-50 h-0 w-full tracking-wider">
      <div
        className={`${navBar || openMobile ? "bg-accent-950/80 backdrop-blur-md" : "pt-8"} ${showNavbar ? "-translate-y-28" : ""}`}
      >
        <div className="mx-auto max-w-[98rem] px-14 py-4">
          <div
            className={`relative flex h-18 items-center justify-between gap-3 transition-all lg:h-24`}
            id="navbar"
          >
            <div className="flex w-[80%] items-center justify-between gap-10">
              <a
                href="/"
                className={`${navBar || openMobile ? "" : "w-auto duration-200 md:pt-8"}`}
              >
                <img
                  src={logo.src}
                  alt="TruFlight Academy Logo"
                  loading="eager"
                  decoding="async"
                  fetchPriority="auto"
                  width="397"
                  height="128"
                  className={`${navBar || openMobile ? "h-12 w-12 rounded-full object-contain md:h-20 md:w-20" : "h-18 w-18 rounded-full object-contain md:h-32 md:w-32"} duration-300`}
                ></img>
              </a>
              <div className="hidden flex-1 gap-10 lg:flex">
                <ul className="text-accent-50 flex justify-center gap-10 md:text-lg">
                  {navbarLinks.map((item, index) => (
                    <li
                      key={index}
                      className={`${
                        isActive(item, pathname)
                          ? "decoration-primary-500 underline decoration-2 underline-offset-[10px]"
                          : ""
                      } group relative last:no-underline`}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {item.link ? (
                        <a
                          href={item.link}
                          className="group-last:btn-primary decoration-primary-500 py-14 font-medium tracking-tight whitespace-nowrap decoration-2 underline-offset-[10px] duration-300 hover:underline group-last:hover:no-underline"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <span className="decoration-primary-500 cursor-default py-12 font-medium tracking-tight whitespace-nowrap decoration-2 underline-offset-[10px] duration-300 hover:underline">
                          {item.name}
                        </span>
                      )}
                      {item.submenu && item.submenu.length > 0 && (
                        <ul
                          className={`bg-accent-500 absolute top-[40px] left-0 z-10 overflow-hidden rounded whitespace-nowrap text-white duration-300 ${
                            hoveredIndex === index
                              ? "h-auto w-auto opacity-100"
                              : "h-0 w-0 overflow-hidden opacity-0"
                          }`}
                        >
                          {item.submenu.map((subitem, subIndex) => (
                            <li
                              key={subIndex}
                              className={`${
                                isActive(subitem, pathname)
                                  ? "bg-primary-500 text-white"
                                  : ""
                              } hover:bg-primary-500 relative duration-300 hover:text-white`}
                              onMouseEnter={() => setSubHoveredIndex(subIndex)}
                              onMouseLeave={() => setSubHoveredIndex(null)}
                            >
                              {subitem.link ? (
                                <a
                                  className="block px-4 py-2 font-bold tracking-tight"
                                  href={subitem.link}
                                >
                                  {subitem.name}
                                </a>
                              ) : (
                                <span className="block cursor-default p-3">
                                  {subitem.name}
                                </span>
                              )}

                              {subitem.subsubmenu &&
                                subitem.subsubmenu.length > 0 && (
                                  <ul
                                    className={`absolute top-0 left-full z-20 bg-black whitespace-nowrap duration-500 ${
                                      subHoveredIndex === subIndex
                                        ? "h-auto w-auto opacity-100"
                                        : "h-0 w-0 overflow-hidden opacity-0"
                                    }`}
                                  >
                                    {subitem.subsubmenu.map(
                                      (subsubitem, subsubIndex) => (
                                        <li
                                          key={subsubIndex}
                                          className={`${
                                            isActive(subsubitem, pathname)
                                              ? "bg-blue-800"
                                              : ""
                                          } relative hover:bg-blue-800/90`}
                                        >
                                          <a
                                            href={subsubitem.link}
                                            className="block p-3"
                                          >
                                            {subsubitem.name}
                                          </a>
                                        </li>
                                      ),
                                    )}
                                  </ul>
                                )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-accent-50 hidden w-[20%] justify-center gap-4 lg:flex">
              <a
                href="/contact"
                target="_blank"
                className="btn-transparent bg-transparent! hover:bg-primary-500/20! hover:text-accent-50! flex-1 whitespace-nowrap"
              >
                Get in Touch
              </a>
              <a
                href="/enrollment"
                className="btn-primary group flex-1 whitespace-nowrap"
              >
                Enroll Now
              </a>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
              <button
                type="button"
                className="mobile-menu-button relative inline-flex items-center justify-center rounded p-2"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={handleHamburgerClick}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className={`${openMobile ? "hidden" : "block"} text-primary-500 size-8`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  id="x-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  ></path>
                </svg>

                <svg
                  className={`${openMobile ? "block" : "hidden"} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  id="hamburger-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          openMobile ? "max-h-screen" : "max-h-0 delay-300"
        } bg-accent-500 absolute top-0 z-50 h-screen w-full overflow-x-hidden duration-300 ease-in-out lg:hidden`}
        id="mobile-menu"
      >
        <div className="flex justify-end py-6 pr-[26px] pl-5">
          <svg
            className={`h-6 w-6 cursor-pointer text-white`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.0"
            stroke="currentColor"
            aria-hidden="true"
            id="hamburger-icon"
            onClick={handleHamburgerClick}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>

        <a href="/" className="relative z-10 mx-auto mt-3 block h-20 w-fit">
          <img
            src={logo.src}
            alt="TruFlight Academy Logo"
            loading="eager"
            decoding="async"
            fetchPriority="auto"
            width="397"
            height="128"
            className="h-full w-full object-contain"
          ></img>
        </a>

        <div
          className={`absolute top-16 z-0 h-32 w-full bg-white duration-300 ${
            openMobile ? "translate-x-0 delay-300" : "-translate-x-full"
          }`}
        ></div>

        <ul className="mt-12 flex flex-col px-4 pt-2 pb-3">
          {navbarLinks.map((item, index) => (
            <li
              key={index}
              className="group relative"
              onClick={() => handleItemClick(index)}
            >
              {item.link ? (
                <a
                  href={item.link}
                  className="group-last:bg-primary-500 block border-blue-800 p-4 text-lg font-semibold whitespace-nowrap text-white duration-300 group-last:mx-5 group-last:mt-4 group-last:rounded-full group-last:px-8 group-last:py-4 group-last:text-center"
                >
                  {item.name}
                </a>
              ) : (
                <div className="flex w-full cursor-pointer justify-between border-blue-800 p-4 text-lg font-semibold whitespace-nowrap text-white duration-300">
                  <p>{item.name}</p>
                  <div
                    className={`pointer-events-none p-1 duration-300 ${
                      hoveredIndex === index
                        ? "-rotate-90 bg-white"
                        : "bg-primary-500 rotate-90"
                    } `}
                  >
                    <IoIosArrowForward
                      className={`${
                        hoveredIndex === index
                          ? "text-primary-500"
                          : "text-white"
                      } size-5`}
                    />
                  </div>
                </div>
              )}
              {item.submenu && item.submenu.length > 0 && (
                <ul
                  className={`left-0 z-10 ml-5 overflow-hidden whitespace-nowrap text-white duration-500 ${
                    hoveredIndex === index ? "max-h-[28rem]" : "max-h-0"
                  }`}
                >
                  {item.submenu.map((subitem, subIndex) => (
                    <li
                      key={subIndex}
                      className="relative"
                      onClick={(event) => handleSubItemClick(event, subIndex)}
                    >
                      {subitem.link ? (
                        <a
                          className="block p-5 font-semibold"
                          href={subitem.link}
                        >
                          {subitem.name}
                        </a>
                      ) : (
                        <div className="flex w-full cursor-pointer justify-between border-blue-800 p-5 text-lg font-semibold whitespace-nowrap text-white duration-300">
                          <p>{subitem.name}</p>
                          <div
                            className={`pointer-events-none rounded-full p-1 duration-300 ${
                              subHoveredIndex === subIndex
                                ? "rotate-90 bg-white"
                                : "bg-primary-500 -rotate-90"
                            } `}
                          >
                            <IoIosArrowForward
                              className={`${
                                subHoveredIndex === subIndex
                                  ? "text-primary-500"
                                  : "text-white"
                              } size-5`}
                            />
                          </div>
                        </div>
                      )}

                      {subitem.subsubmenu && subitem.subsubmenu.length > 0 && (
                        <ul
                          className={`left-full z-20 ml-8 overflow-hidden bg-black whitespace-nowrap duration-500 ${
                            subHoveredIndex === subIndex
                              ? "max-h-32"
                              : "max-h-0"
                          }`}
                        >
                          {subitem.subsubmenu.map((subsubitem, subsubIndex) => (
                            <li key={subsubIndex} className="relative">
                              <a
                                href={subsubitem.link}
                                className="block p-5 font-semibold"
                              >
                                {subsubitem.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <a
              href="/enrollment-form"
              className="bg-primary-500 mx-5 mt-4 block rounded-full p-5 px-8 py-4 text-center text-lg font-semibold whitespace-nowrap text-white uppercase duration-300"
            >
              Enroll Now
            </a>
          </li>
          <li>
            <a
              href="https://truflight.azurewebsites.net/identity/account/login"
              target="_blank"
              className="border-primary-500 text-primary-500 mx-5 mt-4 block rounded-full border p-5 px-8 py-4 text-center text-lg font-semibold whitespace-nowrap uppercase duration-300"
            >
              Log In
            </a>
          </li>
        </ul>

        <div className="flex flex-col gap-3 overflow-hidden p-5 px-10 text-white">
          <div className="flex items-center gap-3">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="w-fit rounded-full border border-white bg-white p-2"
              aria-label="Call TruFlight Academy"
            >
              <FaPhone className="text-primary-500 size-3" />
            </a>
            <a href={`tel:${PHONE_NUMBER}`} aria-label="Call TruFlight Academy">
              {PHONE_NUMBER}
            </a>
          </div>

          <div className="mt-2 flex gap-3">
            <a href={INSTAGRAM_URL} target="_blank">
              <span className="sr-only">Instagram</span>
              <svg
                className="text-primary-500 size-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href={FACEBOOK_URL} target="_blank">
              <span className="sr-only">Facebook</span>
              <svg
                className="text-primary-500 size-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
