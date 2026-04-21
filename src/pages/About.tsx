export default function About() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-12 text-[var(--color-gold-dark)]">
        About Us
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Welcome to Covenant Of Mercy Interdenominational Mountain. We are a
            thriving community of believers, dedicated to spreading the gospel
            of Jesus Christ, experiencing His unending mercy, and nurturing
            spiritual growth across all denominations.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Founded on the principles of love, prayer, and deep worship, our
            mountain serves as a beacon of hope. Whether you are seeking a
            miracle, looking for a place of refuge, or desiring to deepen your
            walk with God, there is a place for you here.
          </p>
        </div>

        <section
          id="about-prophet"
          className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-gold-light)]"
        >
          <h2 className="text-2xl font-bold text-[var(--color-gold-dark)] mb-4">
            About Prophet
          </h2>
          <img
            src="/prophet.jpeg"
            alt="Prophet Ogunwole Abiodun"
            className="w-full h-64 object-cover rounded-xl mb-4"
          />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Prophet Ogunwole Abiodun
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Prophet Ogunwole Abiodun is a servant of God committed to prayer,
            prophetic direction, and raising believers in truth and spiritual
            discipline. Through his ministry, lives are transformed by the word,
            worship, and the mercy of God.
          </p>
        </section>
      </div>
    </div>
  );
}
