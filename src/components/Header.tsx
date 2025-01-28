import type React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "../components/ui/drawer";
import { RxHamburgerMenu } from "react-icons/rx";

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/add-hotel", label: "Add Hotel" },
    { path: "/add-chain", label: "Add Chain" },
  ];

  return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-900">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            HotelRanking
          </Link>
        </div>

        <div className="hidden sm:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={` hover:text-blue-600 transition duration-200 ease-in-out font-medium ${
                isActive(link.path)
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden sm:block ml-4">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 hover:text-blue-600"
          >
            Contact Us
          </Button>
        </div>

        {/* Mobile Menu - Hamburger Icon and Drawer */}
        <div className="sm:hidden flex items-center">
          <Drawer>
            <DrawerTrigger>
              <button className="text-gray-600 hover:text-blue-600">
                <RxHamburgerMenu />
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex flex-col space-y-4 px-4 py-6 text-sm">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-gray-600 hover:text-blue-600 ${
                      isActive(link.path) ? "text-blue-600 font-semibold" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-gray-600 hover:text-blue-600 mt-4"
                >
                  Contact Us
                </Button>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  );
};

export default Header;
