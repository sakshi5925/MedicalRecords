import React from 'react';
import { useSelector } from 'react-redux';
import { dataBookSelector } from '../store/selectors';

const Data = () => {
  const account = useSelector((state) => state.provider.account);
  const orderData = useSelector(dataBookSelector);

  return (
    <div className="p-6">
      {account ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Record Id</th>
                <th className="px-4 py-2 border">Date and time</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Age</th>
                <th className="px-4 py-2 border">Gender</th>
                <th className="px-4 py-2 border">Blood Type</th>
                <th className="px-4 py-2 border">Allergies</th>
                <th className="px-4 py-2 border">Diagnosis</th>
                <th className="px-4 py-2 border">Treatment</th>
              </tr>
            </thead>
            <tbody>
              {orderData && orderData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border text-center">{data.formattedTimestamp}</td>
                  <td className="px-4 py-2 border text-center">{data.name}</td>
                  <td className="px-4 py-2 border text-center">{data.ageNew}</td>
                  <td className="px-4 py-2 border text-center">{data.gender}</td>
                  <td className="px-4 py-2 border text-center">{data.bloodType}</td>
                  <td className="px-4 py-2 border text-center">{data.allergies}</td>
                  <td className="px-4 py-2 border text-center">{data.diagnosis}</td>
                  <td className="px-4 py-2 border text-center">{data.treatment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-2xl font-semibold text-center mt-10">Connect to account</h1>
      )}
    </div>
  );
};

export default Data;
