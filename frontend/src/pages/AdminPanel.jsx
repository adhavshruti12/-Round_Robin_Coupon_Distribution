import { useState, useEffect } from 'react';

function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [coupons, setCoupons] = useState([]);
  const [claimHistory, setClaimHistory] = useState([]);
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: '', status: 'active' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      fetchCoupons();
      fetchClaimHistory();
    }
  }, [isLoggedIn]);

  const fetchCoupons = async () => {
    try {
      const response = await fetch('https://round-robin-coupon-distribution-j2qe-backend.vercel.app/admin/coupons', {
        headers: {
          username: loginForm.username,
          password: loginForm.password
        }
      });
      const data = await response.json();
      setCoupons(data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  const fetchClaimHistory = async () => {
    try {
      const response = await fetch('https://round-robin-coupon-distribution-j2qe-backend.vercel.app/admin/claims', {
        headers: {
          username: loginForm.username,
          password: loginForm.password
        }
      });
      const data = await response.json();
      setClaimHistory(data);
    } catch (error) {
      console.error("Error fetching claim history:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://round-robin-coupon-distribution-j2qe-backend.vercel.app/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setIsLoggedIn(true);
      setMessage('');
    } catch (error) {
      setMessage('Invalid credentials');
    }
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://round-robin-coupon-distribution-j2qe-backend.vercel.app/admin/coupons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          username: loginForm.username,
          password: loginForm.password
        },
        body: JSON.stringify(newCoupon)
      });
      const data = await response.json();
      setMessage(data.message);
      fetchCoupons();
      setNewCoupon({ code: '', discount: '', status: 'active' });
    } catch (error) {
      console.error("Error adding coupon:", error);
    }
  };

  const toggleCouponStatus = async (id) => {
    try {
      await fetch(`https://round-robin-coupon-distribution-j2qe-backend.vercel.app/admin/coupons/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          username: loginForm.username,
          password: loginForm.password
        }
      });
      fetchCoupons();
    } catch (error) {
      console.error("Error updating coupon status:", error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Login</h2>
          {message && <p className="text-red-500 mb-4">{message}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>

          {message && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
              {message}
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Add New Coupon</h3>
            <form onSubmit={handleAddCoupon} className="flex gap-4">
              <input
                type="text"
                placeholder="Coupon Code"
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="number"
                placeholder="Discount %"
                value={newCoupon.discount}
                onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md"
                required
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Add Coupon
              </button>
            </form>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Manage Coupons</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {coupons.map((coupon) => (
                    <tr key={coupon._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {coupon.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {coupon.discount}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          coupon.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {coupon.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {coupon.assignedTo || 'Not assigned'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => toggleCouponStatus(coupon._id)}
                          className={`px-3 py-1 rounded-md ${
                            coupon.status === 'active'
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {coupon.status === 'active' ? 'Disable' : 'Enable'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Claim History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coupon</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {claimHistory.map((claim, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(claim.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {claim.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {claim.couponCode}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
