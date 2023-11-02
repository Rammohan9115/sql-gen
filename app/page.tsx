"use client"
import Form from '../components/Form';

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-indigo-400 via-indigo-200 to-pink-200 min-h-screen flex flex-col justify-center items-center text-white">
      <div className="bg-white bg-opacity-70 p-4 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-black">SQL Learning Dashboard</h1>
        <Form />
      </div>
    </div>
  );
}
