// Utility functions for local storage management
export const getStoredCoupons = () => {
    const coupons = localStorage.getItem('coupons');
    return coupons ? JSON.parse(coupons) : [
      { id: 1, code: 'SAVE20', discount: 20, status: 'active', assignedTo: null },
      { id: 2, code: 'DISC30', discount: 30, status: 'active', assignedTo: null },
      { id: 3, code: 'PROMO25', discount: 25, status: 'active', assignedTo: null },
    ];
  };
  
  export const storeCoupons = (coupons) => {
    localStorage.setItem('coupons', JSON.stringify(coupons));
  };
  
  export const getStoredAdminCredentials = () => {
    return {
      username: 'admin',
      password: 'admin123'
    };
  };
  
  export const getClaimHistory = () => {
    const history = localStorage.getItem('claimHistory');
    return history ? JSON.parse(history) : [];
  };
  
  export const addToClaimHistory = (claim) => {
    const history = getClaimHistory();
    history.push({ ...claim, timestamp: new Date().toISOString() });
    localStorage.setItem('claimHistory', JSON.stringify(history));
  };