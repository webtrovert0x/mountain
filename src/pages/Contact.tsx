import { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { MapPin, Navigation } from "lucide-react";
import { subscribeMapAddress } from "../lib/firestore";

export default function Contact() {
  const [mapAddress, setMapAddress] = useState("");

  useEffect(() => {
    const unsub = subscribeMapAddress(
      (address) => setMapAddress(address),
      () => setMapAddress(""),
    );
    return () => unsub();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 text-[var(--color-gold-dark)]">
        Contact Us
      </h1>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
          <p className="text-gray-600 mb-6">
            We would love to hear from you. Feel free to reach out to us with
            any questions or prayer requests.
          </p>
          <div className="space-y-4 text-gray-700 flex flex-col">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📧</span>
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
            <div className="flex items-center space-x-3">
              <FaWhatsapp className="text-[#25D366] text-2xl" />
              <span>
                <strong>Call / WhatsApp:</strong> 07066797513
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <FaFacebook className="text-[#1877F2] text-2xl" />
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
            <div className="flex items-center space-x-3">
              <FaInstagram className="text-[#E4405F] text-2xl" />
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
            <div className="flex items-center space-x-3">
              <FaTiktok className="text-black text-2xl" />
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
          </div>
        </div>
        <div>
          <form
            action="mailto:lincolnworldwide22@gmail.com"
            method="POST"
            encType="text/plain"
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)] sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)] sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows={4}
                name="message"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)] sm:text-sm p-2 border"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white font-bold py-2 px-4 rounded transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="max-w-3xl mx-auto mt-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <MapPin className="text-[var(--color-gold-dark)]" size={24} />
            Our Location
          </h3>

          {mapAddress ? (
            <>
              <p className="text-gray-600 mb-4">{mapAddress}</p>
              <div className="rounded-xl overflow-hidden border border-gray-200 mb-4">
                <iframe
                  title="Church Location"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    mapAddress,
                  )}&output=embed`}
                ></iframe>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  mapAddress,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white font-bold py-3 px-6 rounded-xl transition"
              >
                <Navigation size={18} />
                Get Directions
              </a>
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <MapPin className="mx-auto w-12 h-12 text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">
                Church location will be updated soon.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Please check back later or contact us directly for directions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
