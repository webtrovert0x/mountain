import { ArrowRight, BookOpen, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-24 lg:py-32 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/logo.jpg')" }}
      >
        <div className="absolute inset-0 bg-white opacity-90"></div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white to-transparent h-1/2 opacity-95"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center text-center">
          <img
            src="/logo.jpg"
            alt="Covenant Of Mercy Logo"
            className="h-40 w-40 object-cover rounded-full border-4 border-[var(--color-gold)] shadow-xl mb-8 transform hover:scale-105 transition duration-500"
          />
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 mt-4">
            Welcome to{" "}
            <span className="text-[var(--color-gold-dark)]">
              Covenant Of Mercy
            </span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-700 max-w-3xl leading-relaxed font-light">
            Interdenominational Mountain.
            <br />A mountain of prayer, worship, and experiencing God's unending
            mercy.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/about"
              className="px-8 py-4 bg-[var(--color-gold-dark)] text-white rounded-full font-bold shadow-lg hover:bg-[var(--color-gold)] transition transform hover:-translate-y-1"
            >
              Discover Our History
            </Link>
            <Link
              to="/events"
              className="px-8 py-4 bg-transparent border-2 border-[var(--color-gold-dark)] text-[var(--color-gold-dark)] rounded-full font-bold hover:bg-[var(--color-gold-dark)] hover:text-white transition transform hover:-translate-y-1 flex items-center justify-center"
            >
              Join Our Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Core Pillars
            </h2>
            <div className="w-24 h-1 bg-[var(--color-gold)] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition flex flex-col items-center text-center group">
              <div className="bg-[var(--color-gold-light)] p-4 rounded-full mb-6 group-hover:bg-[var(--color-gold)] transition">
                <Users className="h-8 w-8 text-[var(--color-gold-dark)] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Community
              </h3>
              <p className="text-gray-600">
                A welcoming family of believers united in faith, love, and
                spiritual growth.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition flex flex-col items-center text-center group">
              <div className="bg-[var(--color-gold-light)] p-4 rounded-full mb-6 group-hover:bg-[var(--color-gold)] transition">
                <BookOpen className="h-8 w-8 text-[var(--color-gold-dark)] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Spirituality
              </h3>
              <p className="text-gray-600">
                Deep diving into the Word of God through dedicated sermons and
                spiritual disciplines.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition flex flex-col items-center text-center group">
              <div className="bg-[var(--color-gold-light)] p-4 rounded-full mb-6 group-hover:bg-[var(--color-gold)] transition">
                <Clock className="h-8 w-8 text-[var(--color-gold-dark)] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Prayer Mountain
              </h3>
              <p className="text-gray-600">
                Experience divine encounters through unbroken prayers and
                worship gatherings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Invite Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 pr-0 lg:pr-12 mb-10 lg:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Come As You Are
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We invite you to experience the warmth of our congregation and the
              presence of God. Whether you are seeking answers, looking for a
              spiritual home, or simply visiting, there is a place for you at
              Covenant Of Mercy.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-[var(--color-gold-light)] text-[var(--color-gold-dark)] flex items-center justify-center font-bold mr-3 mt-1">
                  ✓
                </span>
                <span className="text-gray-700">
                  Inspiring Interdenominational Worship
                </span>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-[var(--color-gold-light)] text-[var(--color-gold-dark)] flex items-center justify-center font-bold mr-3 mt-1">
                  ✓
                </span>
                <span className="text-gray-700">Weekly Prayer Meetings</span>
              </li>
            </ul>
            <Link
              to="/contact"
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition"
            >
              Get Directions
            </Link>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-2xl overflow-hidden shadow-lg relative h-80">
              <img
                src="/logo.jpeg"
                alt="Church Service"
                className="w-full h-full object-cover object-center scale-110 opacity-90 mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <p className="text-white text-2xl font-bold tracking-widest text-center">
                  JOIN US
                  <br />
                  THIS SUNDAY
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
