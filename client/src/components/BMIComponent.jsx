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
    <div>
      <h1>BMI Calculator</h1>
      <form onSubmit={calculateBMI}>
        <div>
          <label>Height (in cm): </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height"
          />
        </div>
        <div>
          <label>Weight (in kg): </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight"
          />
        </div>
        <button type="submit">Calculate</button>
      </form>
      {bmi && (
        <div>
          <h2>Your BMI is: {bmi}</h2>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
