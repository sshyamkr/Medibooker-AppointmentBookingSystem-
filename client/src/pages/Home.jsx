import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import mainPage from "../assets/mainPage.webp";
import { FaArrowRight } from "react-icons/fa";

function Home() {
  // const dispatch = useDispatch();
  // const token = useSelector((state) => state.auth.token);

  // useEffect(() => {
  //   if (token) {
  //     dispatch(loadUser()); // Load user data when the app starts
  //   }
  // }, [dispatch, token]);

  return (
    <section className="min-h-screen mt-32">
      <div className="flex sm:flex-row flex-col justify-evenly items-center">
        {/* left side */}
        <div className="flex flex-col items-start gap-8">
          <div className="font-bold text-5xl text-[#F1FDDB]">
            Effortlessly book <br />
            appointments, track your <br /> health, and gain insights <br />{" "}
            —all just a <span className="text-[#34F655]">click</span> away.
          </div>
          <Link
            to={"/offer"}
            className="w-[120px] rounded-xl py-3 px-2 bg-[#BEF96F] flex flex-row justify-between items-center font-medium"
          >
            Get Started <FaArrowRight />{" "}
          </Link>
        </div>
        {/* right side */}
        <div>
          <img src={mainPage} alt="" className="w-[500px] h-[350px]" />
        </div>
      </div>
    </section>
  );
}

export default Home;

{
  /* <div className="min-h-screen">
      <div className="max-w-screen h-[450px] bg-blue-300 flex flex-col justify-center items-center gap-3">
        <h3 className="text-3xl font-semibold">Welcome to DocBook </h3>
        <p>Get your doctor's appointment done seamlessly</p>
        <Link to={token ? "/dashboard" : "/login"}>
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="text-blue-500 hover:bg-blue-700 hover:text-white bg-white font-semibold py-3 px-5 rounded-3xl mt-2 shadow-2xl"
          >
            Get Started
          </motion.div>
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center my-5 ">
        <h3 className="text-3xl font-semibold py-4">What We Offer!</h3>
        <div className="flex flex-col sm:flex-row justify-center gap-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="w-[350px] h-[250px] text-center flex flex-col justify-center items-center  rounded-3xl shadow-xl p-2 bg-gradient-to-r from-blue-200 to-cyan-200"
          >
            <h2 className="text-xl font-semibold">Quick Appointment</h2>
            <p>Seamlessly schedule and manage your appointments</p>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="w-[350px] h-[250px] text-center flex flex-col justify-center items-center shadow-xl rounded-3xl p-2 bg-gradient-to-r from-blue-200 to-cyan-200"
          >
            <h2 className="text-xl font-semibold">Doctor Consultations</h2>
            <p>Connect with experienced doctors with just few clicks!</p>
          </motion.div>
        </div>
      </div>
    </div> */
}
