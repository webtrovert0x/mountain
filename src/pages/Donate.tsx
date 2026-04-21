export default function Donate() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-8 text-[var(--color-gold-dark)]">
        Give to Covenant Of Mercy Interdenominational Mountain
      </h1>
      <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
        Your generous donations help us continue our mission to spread love,
        support our community, and maintain our place of worship.
      </p>
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 max-w-xl mx-auto inline-block text-left w-full">
        <h3 className="text-2xl font-bold mb-6">Ways to Give</h3>
        <ul className="space-y-4 text-gray-700">
          <li className="flex items-center">
            <span className="font-bold mr-2">Bank Transfer:</span> Account
            Details coming soon
          </li>
          <li className="flex items-center">
            <span className="font-bold mr-2">Online:</span> Payment gateway
            setup in progress
          </li>
        </ul>
      </div>
    </div>
  );
}
