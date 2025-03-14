import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to the Coupon Distribution System
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Get your exclusive coupons through our fair round-robin distribution system.
        </p>
        <Link
          to="/get-coupon"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition duration-200 font-medium text-lg"
        >
          Get Your Coupon Now
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Fair Distribution
          </h3>
          <p className="text-gray-600">
            Our round-robin system ensures everyone gets an equal chance at receiving coupons.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Secure Process
          </h3>
          <p className="text-gray-600">
            Your information is protected, and coupon distribution is carefully monitored.
          </p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-4">1️⃣</div>
            <p className="text-gray-600">Click on "Get Coupon"</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-4">2️⃣</div>
            <p className="text-gray-600">Enter your details</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-4">3️⃣</div>
            <p className="text-gray-600">Receive your unique coupon</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-4">4️⃣</div>
            <p className="text-gray-600">Use within validity period</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;