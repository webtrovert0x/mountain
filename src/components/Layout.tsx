import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
export default function Layout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-white shadow relative z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/logo.jpg"
                alt="Covenant Of Mercy Interdenominational Mountain"
                className="h-16 w-auto object-contain"
              />
              <div className="flex flex-col hidden sm:flex">
                <span className="text-xl font-bold text-[var(--color-gold-dark)] leading-tight uppercase">
                  Covenant Of Mercy
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  Interdenominational Mountain
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-[var(--color-gold)] font-medium transition"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-[var(--color-gold)] font-medium transition"
              >
                About Us
              </Link>
              <Link
                to="/messages"
                className="text-gray-700 hover:text-[var(--color-gold)] font-medium transition"
              >
                Messages
              </Link>
              <Link
                to="/events"
                className="text-gray-700 hover:text-[var(--color-gold)] font-medium transition"
              >
                Events
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-[var(--color-gold)] font-medium transition"
              >
                Contact
              </Link>
            </nav>

            <div className="hidden md:flex">
              <Link
                to="/donate"
                className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white px-5 py-2 rounded-full font-medium transition shadow-md flex items-center space-x-2"
              >
                <Heart size={18} />
                <span>Donate</span>
              </Link>
            </div>

            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg absolute w-full left-0 top-full">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--color-gold)] hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--color-gold)] hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/messages"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--color-gold)] hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Messages
            </Link>
            <Link
              to="/events"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--color-gold)] hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--color-gold)] hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/donate"
              className="block px-3 py-2 mt-4 text-center text-base font-medium text-white bg-[var(--color-gold)] rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Donate
            </Link>
          </div>
        )}
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-gray-900 text-white py-12 mt-12 border-t-4 border-[var(--color-gold)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[var(--color-gold)] mb-4">
              Covenant Of Mercy
            </h3>
            <p className="text-gray-400">Interdenominational Mountain</p>
            <p className="text-gray-400 mt-4">
              A place of mercy, prayer, and divine encounter.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-[var(--color-gold)]"
                >
                  Our History
                </Link>
              </li>
              <li>
                <Link
                  to="/messages"
                  className="text-gray-400 hover:text-[var(--color-gold)]"
                >
                  Latest Sermons
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-gray-400 hover:text-[var(--color-gold)]"
                >
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-[var(--color-gold)]"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Connect</h3>
            <div className="text-gray-400 space-y-2 flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-xl">📧</span>{" "}
                <span>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:lincolnworldwide22@gmail.com"
                    className="hover:text-[var(--color-gold)] transition"
                  >
                    lincolnworldwide22@gmail.com
                  </a>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaWhatsapp className="text-[#25D366] text-xl" />{" "}
                <span>
                  <strong>Call/WhatsApp:</strong> 07066797513
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaFacebook className="text-[#1877F2] text-xl" />{" "}
                <span>
                  <strong>Facebook:</strong>{" "}
                  <a
                    href="https://www.facebook.com/share/1KHXbdgiRi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-gold)] transition"
                  >
                    Ogunwole Abiodun
                  </a>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaInstagram className="text-[#E4405F] text-xl" />{" "}
                <span>
                  <strong>Instagram:</strong>{" "}
                  <a
                    href="https://instagram.com/Iamlincolnworldwide"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-gold)] transition"
                  >
                    Iamlincolnworldwide
                  </a>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaTiktok className="text-white text-xl" />{" "}
                <span>
                  <strong>TikTok:</strong>{" "}
                  <a
                    href="https://tiktok.com/@Ogunwoleabiodun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-gold)] transition"
                  >
                    Ogunwoleabiodun
                  </a>
                </span>
              </div>
              <p className="mt-4 pt-2 border-t border-gray-800 text-sm block">
                Worship with us every Sunday!
              </p>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Covenant Of Mercy. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
