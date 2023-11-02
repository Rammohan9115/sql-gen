"use client"
import Form from '../components/Form';

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-indigo-300 via-indigo-200 to-pink-200 min-h-screen flex flex-col justify-center items-center text-white relative">
      <h1 className="text-center text-3xl font-bold text-black bg-gradient-to-r from-indigo-300 via-indigo-200 to-pink-200 py-2 px-4 w-full fixed top-0 left-0 z-10">SQL Learning Dashboard</h1>
      <div className="mt-16 mb-30"> {/* Adjust the top margin to push content below the header */}
        <Form />
      </div>
    </div>
  );
}

