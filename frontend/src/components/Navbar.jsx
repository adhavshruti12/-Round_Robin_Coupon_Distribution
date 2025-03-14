import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-blue-600">🎫</span>
              <span className="text-xl font-bold text-gray-900">Coupon System</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link 
              to="/get-coupon" 
              className="text-gray-600 hover:text-blue-600 font-medium transition duration-150"
            >
              Get Coupon
            </Link>
            <Link 
              to="/admin" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-150 font-medium"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;