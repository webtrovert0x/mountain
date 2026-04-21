import { useState, useEffect } from "react";
import { Play, Calendar, Video } from "lucide-react";
import type { Sermon } from "./Admin";
import { subscribeSermons } from "../lib/firestore";

export default function Messages() {
  const [sermons, setSermons] = useState<Sermon[]>([]);

  useEffect(() => {
    const unsub = subscribeSermons(
      (items) => setSermons(items),
      () => setSermons([]),
    );
    return () => unsub();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl mt-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-gold-dark)]">
          Latest Sermons
        </h1>
        <div className="h-1 w-20 bg-[var(--color-gold)] mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Listen to anointed messages and transformative teachings from Prophet
          Ogunwole Abiodun. Grow spiritually in the word of God.
        </p>
      </div>

      {sermons.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm max-w-3xl mx-auto">
          <Video className="mx-auto w-16 h-16 text-gray-300 mb-4" />
          <p className="text-xl text-gray-500 font-bold tracking-wide">
            No recent messages are currently posted.
          </p>
          <p className="text-md text-gray-400 mt-2">
            The latest spiritual teachings will appear here soon.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sermons.map((sermon) => (
            <div
              key={sermon.id}
              className="bg-white rounded-2xl shadow-md border border-[var(--color-gold-light)] border-opacity-30 flex flex-col hover:shadow-xl transition-all duration-300 group overflow-hidden hover:-translate-y-1"
            >
              {/* Thumbnail placeholder */}
              <div className="bg-gradient-to-br from-[var(--color-gold-dark)] to-black aspect-video relative flex items-center justify-center overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: "url('/logo.jpg')" }}
                ></div>
                {sermon.videoUrl && (
                  <a
                    href={sermon.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-[var(--color-gold-light)] w-16 h-16 rounded-full flex items-center justify-center z-10 shadow-lg group-hover:scale-110 transition cursor-pointer"
                  >
                    <Play className="text-[var(--color-gold-dark)] w-7 h-7 ml-1" />
                  </a>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="mb-3 flex items-center text-xs font-bold tracking-widest text-[var(--color-gold-dark)] uppercase bg-[var(--color-gold-light)] bg-opacity-20 px-3 py-1.5 rounded-full w-fit">
                  <Calendar className="w-3 h-3 mr-1.5" />
                  {new Date(sermon.date).toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </div>

                <h3
                  className="text-2xl font-bold mb-3 text-gray-900 leading-tight"
                  title={sermon.title}
                >
                  {sermon.title}
                </h3>

                <p
                  className="text-gray-600 mb-8 flex-1 whitespace-pre-line line-clamp-4"
                  title={sermon.description}
                >
                  {sermon.description}
                </p>

                {sermon.videoUrl && (
                  <a
                    href={sermon.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center justify-center gap-2 w-full font-bold bg-gray-50 border border-gray-200 p-3.5 rounded-xl text-[var(--color-gold-dark)] hover:text-white hover:bg-[var(--color-gold-dark)] transition-colors duration-300"
                  >
                    <Play className="w-4 h-4" />
                    Watch Full Sermon
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
