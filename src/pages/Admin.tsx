import { useState, useEffect } from "react";
import { Trash2, CalendarPlus, MapPin } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import {
  addEvent,
  addSermon,
  removeEvent,
  removeSermon,
  saveMapAddress,
  subscribeEvents,
  subscribeMapAddress,
  subscribeSermons,
} from "../lib/firestore";
import {
  changeAdminPassword,
  signInAdmin,
  signOutAdmin,
  subscribeAuthState,
} from "../lib/auth";

export interface Sermon {
  id: string;
  title: string;
  date: string;
  videoUrl: string;
  description: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  type: "Program" | "Vigil" | "Retreat" | "Other";
  description: string;
}

type Tab = "sermons" | "events" | "settings";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("sermons");

  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");

  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [evtTitle, setEvtTitle] = useState("");
  const [evtDate, setEvtDate] = useState("");
  const [evtTime, setEvtTime] = useState("");
  const [evtVenue, setEvtVenue] = useState("");
  const [evtType, setEvtType] = useState<ChurchEvent["type"]>("Program");
  const [evtDescription, setEvtDescription] = useState("");

  const [mapAddress, setMapAddress] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSettingsPasswords, setShowSettingsPasswords] = useState(false);

  useEffect(() => {
    const unsubSermons = subscribeSermons(
      (items) => setSermons(items),
      () => alert("Could not load sermons from Firebase."),
    );

    const unsubEvents = subscribeEvents(
      (items) => setEvents(items),
      () => alert("Could not load events from Firebase."),
    );

    const unsubAddress = subscribeMapAddress(
      (address) => setMapAddress(address),
      () => alert("Could not load map address from Firebase."),
    );

    const unsubAuth = subscribeAuthState((user) => {
      setIsAuthenticated(Boolean(user));
    });

    return () => {
      unsubSermons();
      unsubEvents();
      unsubAddress();
      unsubAuth();
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInAdmin(email, password);
    } catch {
      alert("Login failed. Please check email/password.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOutAdmin();
    } catch {
      alert("Logout failed. Please try again.");
    }
  };

  const handleDeleteSermon = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this sermon?")) return;
    try {
      await removeSermon(id);
    } catch {
      alert("Failed to delete sermon.");
    }
  };

  const handleAddSermon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addSermon({
        title,
        date: new Date().toISOString(),
        videoUrl,
        description,
      });
      setTitle("");
      setVideoUrl("");
      setDescription("");
      alert("Sermon posted successfully!");
    } catch {
      alert("Failed to post sermon.");
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await removeEvent(id);
    } catch {
      alert("Failed to delete event.");
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addEvent({
        title: evtTitle,
        date: evtDate,
        time: evtTime,
        venue: evtVenue,
        type: evtType,
        description: evtDescription,
      });
      setEvtTitle("");
      setEvtDate("");
      setEvtTime("");
      setEvtVenue("");
      setEvtType("Program");
      setEvtDescription("");
      alert("Event posted successfully!");
    } catch {
      alert("Failed to post event.");
    }
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveMapAddress(mapAddress);
      alert("Church address updated successfully!");
    } catch {
      alert("Failed to save address.");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      await changeAdminPassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      alert("Password changed successfully.");
    } catch {
      alert("Could not change password. Please verify your current password.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 flex justify-center items-center min-h-[60vh]">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6 text-[var(--color-gold-dark)]">
            Admin Access
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md shadow-sm focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)] p-2 border border-gray-300"
                placeholder="admin@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md shadow-sm focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)] p-2 pr-10 border border-gray-300"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[var(--color-gold-dark)]"
                  aria-label={
                    showLoginPassword ? "Hide password" : "Show password"
                  }
                >
                  {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--color-gold-dark)] hover:bg-[var(--color-gold)] text-white font-bold py-2 px-4 rounded transition"
            >
              Login to Backend
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabBtn = (tab: Tab, label: string, icon: React.ReactNode) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${
        activeTab === tab
          ? "bg-[var(--color-gold-dark)] text-white shadow-md"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {icon}
      {label}
    </button>
  );

  const sermonsPanel = (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-gold-light)] bg-opacity-20">
        <h3 className="text-xl font-bold mb-4">Post a New Sermon</h3>
        <form onSubmit={handleAddSermon} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sermon Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 w-full rounded-md shadow-sm p-3 border border-gray-300 focus:border-[var(--color-gold)]"
              placeholder="e.g. The Power of Grace"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message Link (YouTube, Facebook, etc) - Optional
            </label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="mt-1 w-full rounded-md shadow-sm p-3 border border-gray-300 focus:border-[var(--color-gold)]"
              placeholder="https://youtube.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description / Summary
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="mt-1 w-full rounded-md shadow-sm p-3 border border-gray-300 focus:border-[var(--color-gold)]"
              placeholder="Summarize the core message..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--color-gold)] text-white font-bold py-3 px-4 rounded-lg hover:bg-[var(--color-gold-dark)] transition"
          >
            Publish Sermon to Website
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-fit max-h-[700px] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">
          Manage Live Sermons ({sermons.length})
        </h3>
        {sermons.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No sermons have been posted yet.</p>
            <p className="text-xs text-gray-400 mt-2">
              Use the form to upload your first message.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sermons.map((sermon) => (
              <div
                key={sermon.id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex justify-between items-start gap-4"
              >
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-bold text-gray-900 truncate">
                    {sermon.title}
                  </h4>
                  <p className="text-xs font-medium text-[var(--color-gold-dark)] mb-2">
                    {new Date(sermon.date).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {sermon.description}
                  </p>
                  {sermon.videoUrl && (
                    <a
                      href={sermon.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline inline-block truncate max-w-full"
                    >
                      {sermon.videoUrl}
                    </a>
                  )}
                </div>
                <button
                  onClick={() => void handleDeleteSermon(sermon.id)}
                  className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition"
                  title="Delete Sermon"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const eventsPanel = (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-gold-light)] bg-opacity-20">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <CalendarPlus size={22} className="text-[var(--color-gold-dark)]" />
          Post a New Event
        </h3>
        <form onSubmit={handleAddEvent} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Title
            </label>
            <input
              type="text"
              value={evtTitle}
              onChange={(e) => setEvtTitle(e.target.value)}
              required
              className="mt-1 w-full rounded-md shadow-sm p-3 border border-gray-300 focus:border-[var(--color-gold)]"
              placeholder="e.g. Night of Glory Vigil"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                value={evtDate}
                onChange={(e) => setEvtDate(e.target.value)}
                required
                className="mt-1 w-full rounded-md shadow-sm p-3 border border-gray-300 focus:border-[var(--color-gold)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                value={evtTime}
                onChange={(e) => setEvtTime(e.target.value)}
                required
                className="mt-1 w-full rounded-md shadow-sm p-3 border border-gray-300 focus:border-[var(--color-gold)]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Venue / Location
            </label>
            <input
              type="text"
              value={evtVenue}
              onChange={(e) => setEvtVenue(e.target.value)}
              required
              className="mt-1 w-full rounded-md shadow-sm p-3 border border-gray-300 focus:border-[var(--color-gold)]"
              placeholder="e.g. Church Auditorium, Ikeja"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Type
            </label>
            <select
              value={evtType}
              onChange={(e) =>
                setEvtType(e.target.value as ChurchEvent["type"])
              }
              className="mt-1 w-full rounded-md shadow-sm p-3 border border-gray-300 focus:border-[var(--color-gold)]"
            >
              <option value="Program">Church Program</option>
              <option value="Vigil">Vigil</option>
              <option value="Retreat">Special Retreat</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={evtDescription}
              onChange={(e) => setEvtDescription(e.target.value)}
              required
              rows={3}
              className="mt-1 w-full rounded-md shadow-sm p-3 border border-gray-300 focus:border-[var(--color-gold)]"
              placeholder="Brief details about the event..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--color-gold)] text-white font-bold py-3 px-4 rounded-lg hover:bg-[var(--color-gold-dark)] transition"
          >
            Publish Event to Website
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-fit max-h-[700px] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">
          Manage Events ({events.length})
        </h3>
        {events.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No events have been posted yet.</p>
            <p className="text-xs text-gray-400 mt-2">
              Use the form to add your first upcoming event.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex justify-between items-start gap-4"
              >
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        evt.type === "Vigil"
                          ? "bg-purple-100 text-purple-700"
                          : evt.type === "Retreat"
                            ? "bg-green-100 text-green-700"
                            : evt.type === "Program"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {evt.type}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 truncate">
                    {evt.title}
                  </h4>
                  <p className="text-xs font-medium text-[var(--color-gold-dark)] mb-1">
                    {new Date(evt.date + "T00:00:00").toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        weekday: "short",
                      },
                    )}{" "}
                    • {evt.time}
                  </p>
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <MapPin size={12} /> {evt.venue}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {evt.description}
                  </p>
                </div>
                <button
                  onClick={() => void handleDeleteEvent(evt.id)}
                  className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition"
                  title="Delete Event"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const settingsPanel = (
    <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-gold-light)] bg-opacity-20">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <MapPin size={22} className="text-[var(--color-gold-dark)]" />
          Church Location (Google Map)
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Enter the church or event address below. This will display on the
          Contact page as an interactive Google Map so visitors can find you and
          get directions.
        </p>
        <form onSubmit={handleSaveAddress} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Physical Address
            </label>
            <input
              type="text"
              value={mapAddress}
              onChange={(e) => setMapAddress(e.target.value)}
              className="mt-1 w-full rounded-md shadow-sm p-3 border border-gray-300 focus:border-[var(--color-gold)]"
              placeholder="e.g. 15 Adeniyi Jones Ave, Ikeja, Lagos"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--color-gold)] text-white font-bold py-3 px-4 rounded-lg hover:bg-[var(--color-gold-dark)] transition"
          >
            Save Address
          </button>
        </form>
        {mapAddress && (
          <div className="mt-6 rounded-xl overflow-hidden border border-gray-200">
            <iframe
              title="Church Location Preview"
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&output=embed`}
            ></iframe>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-gold-light)] bg-opacity-20 h-fit">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <span className="text-[var(--color-gold-dark)]">🔐</span>
          Change Admin Password
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Update your Firebase admin password securely.
        </p>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="relative mt-1">
              <input
                type={showSettingsPasswords ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full rounded-md shadow-sm p-3 pr-10 border border-gray-300 focus:border-[var(--color-gold)]"
              />
              <button
                type="button"
                onClick={() => setShowSettingsPasswords((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[var(--color-gold-dark)]"
                aria-label={
                  showSettingsPasswords ? "Hide passwords" : "Show passwords"
                }
              >
                {showSettingsPasswords ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative mt-1">
              <input
                type={showSettingsPasswords ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-md shadow-sm p-3 pr-10 border border-gray-300 focus:border-[var(--color-gold)]"
              />
              <button
                type="button"
                onClick={() => setShowSettingsPasswords((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[var(--color-gold-dark)]"
                aria-label={
                  showSettingsPasswords ? "Hide passwords" : "Show passwords"
                }
              >
                {showSettingsPasswords ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="relative mt-1">
              <input
                type={showSettingsPasswords ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-md shadow-sm p-3 pr-10 border border-gray-300 focus:border-[var(--color-gold)]"
              />
              <button
                type="button"
                onClick={() => setShowSettingsPasswords((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[var(--color-gold-dark)]"
                aria-label={
                  showSettingsPasswords ? "Hide passwords" : "Show passwords"
                }
              >
                {showSettingsPasswords ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--color-gold)] text-white font-bold py-3 px-4 rounded-lg hover:bg-[var(--color-gold-dark)] transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-[var(--color-gold-dark)]">
          Church Backend Portal
        </h1>
        <button
          onClick={() => void handleLogout()}
          className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded font-bold"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-2 mb-8 flex-wrap">
        {tabBtn("sermons", "Sermons", <span>🎤</span>)}
        {tabBtn("events", "Events", <span>📅</span>)}
        {tabBtn("settings", "Settings", <span>⚙️</span>)}
      </div>

      {activeTab === "sermons" && sermonsPanel}
      {activeTab === "events" && eventsPanel}
      {activeTab === "settings" && settingsPanel}
    </div>
  );
}
