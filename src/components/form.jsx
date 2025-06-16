import React from 'react';
import { useForm } from 'react-hook-form';
import { submitRecord } from '../store/interaction';
import { useDispatch, useSelector } from 'react-redux';

const Form = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const medical = useSelector((state) => state.medical.contract);
  const account = useSelector((state) => state.provider.account);
  const provider = useSelector((state) => state.provider.connection);

  const onSubmit = async (data) => {
    await submitRecord(
      data.name,
      data.age,
      data.gender,
      data.bloodType,
      data.allergies,
      data.diagnosis,
      data.treatment,
      provider,
      medical,
      dispatch
    );
    console.log("medical", medical);
    console.log("data", data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {account ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 space-y-4"
        >
          <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Patient Details</h1>

          {/* Patient Name */}
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700">Patient Name:</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className="mt-1 w-full p-2 border rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block font-medium text-gray-700">Age:</label>
            <input
              type="number"
              id="age"
              {...register("age", { required: true })}
              className="mt-1 w-full p-2 border rounded-md"
            />
            {errors.age && <p className="text-red-500 text-sm">Age is required</p>}
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block font-medium text-gray-700">Gender:</label>
            <select
              id="gender"
              defaultValue=""
              {...register("gender", { required: true })}
              className="mt-1 w-full p-2 border rounded-md"
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">Gender is required</p>}
          </div>

          {/* Blood Type */}
          <div>
            <label htmlFor="bloodType" className="block font-medium text-gray-700">Blood Type:</label>
            <input
              type="text"
              id="bloodType"
              {...register("bloodType", { required: true })}
              className="mt-1 w-full p-2 border rounded-md"
            />
            {errors.bloodType && <p className="text-red-500 text-sm">Blood type is required</p>}
          </div>

          {/* Allergies */}
          <div>
            <label htmlFor="allergies" className="block font-medium text-gray-700">Allergies:</label>
            <input
              type="text"
              id="allergies"
              {...register("allergies", { required: true })}
              className="mt-1 w-full p-2 border rounded-md"
            />
            {errors.allergies && <p className="text-red-500 text-sm">Allergies are required</p>}
          </div>

          {/* Diagnosis */}
          <div>
            <label htmlFor="diagnosis" className="block font-medium text-gray-700">Diagnosis:</label>
            <input
              type="text"
              id="diagnosis"
              {...register("diagnosis", { required: true })}
              className="mt-1 w-full p-2 border rounded-md"
            />
            {errors.diagnosis && <p className="text-red-500 text-sm">Diagnosis is required</p>}
          </div>

          {/* Treatment */}
          <div>
            <label htmlFor="treatment" className="block font-medium text-gray-700">Treatment:</label>
            <input
              type="text"
              id="treatment"
              {...register("treatment", { required: true })}
              className="mt-1 w-full p-2 border rounded-md"
            />
            {errors.treatment && <p className="text-red-500 text-sm">Treatment is required</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Submit Record
          </button>
        </form>
      ) : (
        <p className="text-lg text-gray-600">Please connect your account to submit records.</p>
      )}
    </div>
  );
};

export default Form;
