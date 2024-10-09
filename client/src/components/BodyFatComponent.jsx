import React, { useState } from "react";

const BodyFatComponent = () => {
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [wrist, setWrist] = useState("");
  const [forearm, setForearm] = useState("");
  const [bodyFat, setBodyFat] = useState(null);

  const calculateBodyFat = (e) => {
    e.preventDefault();

    // Convert inputs to numbers
    const weightNum = parseFloat(weight);
    const waistNum = parseFloat(waist);
    const hipNum = parseFloat(hip);
    const wristNum = parseFloat(wrist);
    const forearmNum = parseFloat(forearm);

    // Example formula for body fat calculation (US Navy formula)
    const bodyFatPercentage =
      ((weightNum * 0.732 +
        8.987 +
        wristNum / 3.14 -
        waistNum * 0.157 -
        hipNum * 0.249 +
        forearmNum * 0.434) /
        weightNum) *
      100;

    setBodyFat(bodyFatPercentage.toFixed(2)); // Set result rounded to 2 decimal places
  };

  return (
    <div className="body-fat-calculator">
      <h2>Body Fat Calculator</h2>
      <form onSubmit={calculateBodyFat}>
        <div>
          <label>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Wrist (cm):</label>
          <input
            type="number"
            value={wrist}
            onChange={(e) => setWrist(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hip (cm):</label>
          <input
            type="number"
            value={hip}
            onChange={(e) => setHip(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Waist (cm):</label>
          <input
            type="number"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Forearm (cm):</label>
          <input
            type="number"
            value={forearm}
            onChange={(e) => setForearm(e.target.value)}
            required
          />
        </div>
        <button type="submit">Calculate</button>
      </form>
      {bodyFat && (
        <div>
          <h3>Your Estimated Body Fat Percentage: {bodyFat}%</h3>
        </div>
      )}
    </div>
  );
};

export default BodyFatComponent;
