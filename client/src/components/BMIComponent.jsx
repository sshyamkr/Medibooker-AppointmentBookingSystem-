import React, { useState } from "react";

export default function BMIComponent() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();
    if (height && weight) {
      const heightInMeters = parseFloat(height) / 100; //converting in cm
      const weightInKg = parseFloat(weight);

      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));
      classifyBMI(bmiValue);
    } else {
      setMessage("Please enter both height and weight.");
    }
  };

  const classifyBMI = (bmiValue) => {
    if (bmiValue < 18.5) {
      setMessage("You are underweight.");
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setMessage("You have a normal weight.");
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setMessage("You are overweight.");
    } else {
      setMessage("You are obese.");
    }
  };
  return (
    <div className="min-h-screen bg-[#080e01] flex flex-col items-center justify-center text-[#f1fddb]">
      <div className="w-full max-w-md p-8 bg-[#0d140a] rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">BMI Calculator</h1>
        <form onSubmit={calculateBMI} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Height (in cm):
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter your height"
              className="w-full px-3 py-2 border border-gray-600 bg-[#0e1a0b] text-[#f1fddb] rounded-md focus:ring-2 focus:ring-[#bef96f] focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Weight (in kg):
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight"
              className="w-full px-3 py-2 border border-gray-600 bg-[#0e1a0b] text-[#f1fddb] rounded-md focus:ring-2 focus:ring-[#bef96f] focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#bef96f] text-[#080e01] rounded-md font-bold hover:bg-[#a7e356] transition-transform transform hover:-translate-y-1 shadow-lg focus:outline-none"
          >
            Calculate
          </button>
        </form>
        {bmi && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-semibold">Your BMI is: {bmi}</h2>
            <p className="mt-2 text-lg">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
