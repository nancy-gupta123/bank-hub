import React from 'react';
import Navbar from './Navbar';

function Dashboard1() {
  const backgroundImageUrl =
    'https://img.freepik.com/free-vector/digital-money-transfer-technology-background_1017-17454.jpg?t=st=1736956100~exp=1736959700~hmac=031cf414bfbff7d5fd979428908adf8a185d81fd775be72b23dad328a62190d3&w=740';

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Navbar />
    </div>
  );
}

export default Dashboard1;
