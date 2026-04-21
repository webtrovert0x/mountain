import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, CalendarHeart } from "lucide-react";
import type { ChurchEvent } from "./Admin";
import { subscribeEvents } from "../lib/firestore";

export default function Events() {
  const [events, setEvents] = useState<ChurchEvent[]>([]);

  useEffect(() => {
    const unsub = subscribeEvents(
      (items) => {
        const today = new Date().toISOString().split("T")[0];
        const upcoming = items.filter((e) => e.date >= today);
        setEvents(upcoming);
      },
      () => setEvents([]),
    );
    return () => unsub();
  }, []);

  const typeBadge = (type: ChurchEvent["type"]) => {
    const colors: Record<string, string> = {
      Vigil: "bg-purple-100 text-purple-700",
      Retreat: "bg-green-100 text-green-700",
      Program: "bg-blue-100 text-blue-700",
      Other: "bg-gray-200 text-gray-700",
    };
    return (
      <span
        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
          colors[type] || colors.Other
        }`}
      >
        {type}
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl mt-4">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-gold-dark)]">
          Upcoming Events
        </h1>
        <div className="h-1 w-20 bg-[var(--color-gold)] mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Stay updated on upcoming programs, vigils, and special retreats. Come
          and experience the move of God!
        </p>
      </div>

      {/* Dynamic Events from Admin */}
      {events.length > 0 && (
        <div className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-2xl shadow-md border border-[var(--color-gold-light)] border-opacity-30 flex flex-col hover:shadow-xl transition-all duration-300 group overflow-hidden hover:-translate-y-1"
              >
                {/* Top accent bar */}
                <div className="h-2 bg-gradient-to-r from-[var(--color-gold-dark)] to-[var(--color-gold)]"></div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    {typeBadge(evt.type)}
                    <div className="flex items-center text-xs font-bold tracking-widest text-[var(--color-gold-dark)] uppercase bg-[var(--color-gold-light)] bg-opacity-20 px-3 py-1.5 rounded-full">
                      <Calendar className="w-3 h-3 mr-1.5" />
                      {new Date(evt.date + "T00:00:00").toLocaleDateString(
                        undefined,
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-gray-900 leading-tight">
                    {evt.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {evt.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {evt.venue}
                    </span>
                  </div>

                  <p className="text-gray-600 flex-1 whitespace-pre-line line-clamp-4">
                    {evt.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state for dynamic events */}
      {events.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm max-w-3xl mx-auto mb-16">
          <CalendarHeart className="mx-auto w-16 h-16 text-gray-300 mb-4" />
          <p className="text-xl text-gray-500 font-bold tracking-wide">
            No special upcoming events right now
          </p>
          <p className="text-md text-gray-400 mt-2">
            Upcoming programs, vigils, and retreats will appear here when
            posted.
          </p>
        </div>
      )}

      {/* Permanent Recurring Services */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Weekly Services
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="text-[var(--color-gold-dark)] font-bold mb-2">
              Every Sunday
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Sunday Worship Service
            </h3>
            <p className="text-gray-600">
              Join us for a time of intense worship, prayer, and word.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="text-[var(--color-gold-dark)] font-bold mb-2">
              Every Wednesday
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Midweek Prayer Gathering
            </h3>
            <p className="text-gray-600">
              Come and seek the face of God during our midweek prayer session.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
