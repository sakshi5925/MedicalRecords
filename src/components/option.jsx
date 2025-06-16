import React from 'react';
import { Link } from 'react-router-dom';

const Option = () => {
  return (
    <div className='flex gap-4 p-4 justify-between mx-32'>
      <Link to="/" className="text-blue-600 hover:underline">Form</Link>
      <Link to="/data" className="text-blue-600 hover:underline">Data</Link>
    </div>
  );
};

export default Option;
 