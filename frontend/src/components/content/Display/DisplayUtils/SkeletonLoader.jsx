import React from 'react';
import { Bars } from 'react-loading-icons'
const SkeletonLoader = () => {
  return (
    <div style={{ justifyContent: 'center', display: 'flex'  }}>


          <Bars stroke="#007BFF" fill='#007BFF' speed={.75} />

    </div>
  );
};

export default SkeletonLoader;
