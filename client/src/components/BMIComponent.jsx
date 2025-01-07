import { useState } from "react";

export default function BMIComponent() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();

    if (height && weight) {
      const heightInMeters = parseFloat(height) / 100; // Converting height from cm to meters
      const weightInKg = parseFloat(weight);

      if (heightInMeters > 0 && weightInKg > 0) {
        const bmiValue = weightInKg / (heightInMeters * heightInMeters);
        setBmi(bmiValue.toFixed(2)); // Calculating BMI and rounding to 2 decimal places
        classifyBMI(bmiValue); // Classifying BMI
      } else {
        setMessage("Please enter valid height and weight values.");
        setBmi(null);
      }
    } else {
      setMessage("Please enter both height and weight.");
      setBmi(null);
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
    <div className="relative h-screen w-screen">
      {/* Full background div */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url("https://d2jx2rerrg6sh3.cloudfront.net/images/Article_Images/ImageForArticle_22595_16539923345862310.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
          width: "100%",
        }}
      ></div>

      {/* Content container */}
      <div className="relative z-10 flex items-center justify-center h-full bg-opacity-70 bg-black">
        <div className="w-full max-w-md p-8 bg-[#0d140a] bg-opacity-80 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6 text-[#f1fddb]">BMI Calculator</h1>
          <form onSubmit={calculateBMI} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-[#f1fddb]">Height (in cm):</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter your height in cm"
                className="w-full px-3 py-2 border border-gray-600 bg-[#0e1a0b] text-[#f1fddb] rounded-md focus:ring-2 focus:ring-[#bef96f] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[#f1fddb]">Weight (in kg):</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter your weight in kg"
                className="w-full px-3 py-2 border border-gray-600 bg-[#0e1a0b] text-[#f1fddb] rounded-md focus:ring-2 focus:ring-[#bef96f] focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#34ebc3] text-[#080e01] rounded-md font-bold hover:bg-[#a7e356] transition-transform transform hover:-translate-y-1 shadow-lg focus:outline-none"
            >
              Calculate
            </button>
          </form>
          {bmi && (
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-semibold text-[#f1fddb]">Your BMI is: {bmi}</h2>
              <p className="mt-2 text-lg text-[#f1fddb]">{message}</p>
            </div>
          )}
          {!bmi && message && (
            <div className="mt-6 text-center text-lg text-red-500">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
