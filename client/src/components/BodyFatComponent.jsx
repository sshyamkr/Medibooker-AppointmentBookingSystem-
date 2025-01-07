import  { useState } from "react";
import bodybg from "../assets/bodybg.jpg";

const BodyFatComponent = () => {
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [wrist, setWrist] = useState("");
  const [forearm, setForearm] = useState("");
  const [bodyFat, setBodyFat] = useState(null);

  const calculateBodyFat = (e) => {
    e.preventDefault();
    const weightNum = parseFloat(weight);
    const waistNum = parseFloat(waist);
    const hipNum = parseFloat(hip);
    const wristNum = parseFloat(wrist);
    const forearmNum = parseFloat(forearm);
    const bodyFatPercentage =
      ((weightNum * 0.732 +
        8.987 +
        wristNum / 3.14 -
        waistNum * 0.157 -
        hipNum * 0.249 +
        forearmNum * 0.434) /
        weightNum) *
      100;
    setBodyFat(bodyFatPercentage.toFixed(2)); 
  };
  return (
    <div className="relative h-screen w-screen">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${bodybg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
          width: "100%",
        }}
      ></div>
      <div className="relative z-10 flex items-center justify-center h-full bg-opacity-70 bg-black">
        <div className="w-full max-w-md p-8 bg-[#0d140a] bg-opacity-80 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-5 text-[#f1fddb]">
            Body Fat Calculator
          </h2>
          <form onSubmit={calculateBodyFat} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#f1fddb]">
                Weight (kg):
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-600 bg-[#0e1a0b] text-[#f1fddb] rounded-md focus:ring-2 focus:ring-[#bef96f] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#f1fddb]">
                Wrist (cm):
              </label>
              <input
                type="number"
                value={wrist}
                onChange={(e) => setWrist(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-600 bg-[#0e1a0b] text-[#f1fddb] rounded-md focus:ring-2 focus:ring-[#bef96f] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#f1fddb]">
                Hip (cm):
              </label>
              <input
                type="number"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-600 bg-[#0e1a0b] text-[#f1fddb] rounded-md focus:ring-2 focus:ring-[#bef96f] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#f1fddb]">
                Waist (cm):
              </label>
              <input
                type="number"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-600 bg-[#0e1a0b] text-[#f1fddb] rounded-md focus:ring-2 focus:ring-[#bef96f] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#f1fddb]">
                Forearm (cm):
              </label>
              <input
                type="number"
                value={forearm}
                onChange={(e) => setForearm(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-600 bg-[#0e1a0b] text-[#f1fddb] rounded-md focus:ring-2 focus:ring-[#bef96f] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#34ebc3] text-[#080e01] rounded-md font-bold hover:bg-[#a7e356] transition-transform transform hover:-translate-y-1 shadow-lg focus:outline-none"
            >
              Calculate
            </button>
          </form>
          {bodyFat && (
            <div className="mt-5">
              <h3 className="text-xl font-semibold text-center text-[#f1fddb]">
                Your Estimated Body Fat Percentage: {bodyFat}%
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BodyFatComponent;
