import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function Card({ icon, desc, link, btnText }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="bg-[#252525] w-[300px] h-[300px] px-6 py-5 flex flex-col justify-between items-start rounded-lg"
    >
      <div className="flex items-center justify-center bg-[#2D2D2D] w-[50px] h-[50px] rounded-lg drop-shadow-xl">
        <div className="text-2xl">{icon}</div>
      </div>
      <div className=" text-wrap text-[#F1FDDB] text-xl font-semibold">
        {desc}
      </div>
      <Link
        to={link}
        className="w-[130px] rounded-xl py-3 px-1 justify-center bg-[#BEF96F] flex flex-row gap-2 items-center font-medium text-xl 
  transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-[0_4px_10px_#BEF96F]"
      >
        {btnText} <FaArrowRight />
      </Link>
    </motion.div>
  );
}
