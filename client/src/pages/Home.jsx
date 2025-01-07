import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import doctorImage from "../assets/doctor.webp"; 
import bookingImage from "../assets/booking.png"; 
import trackingImage from "../assets/tracking.png"; 
import supportImage from "../assets/support.png"; 
function Home() {
  return (
    <section
      className="min-h-screen w-full bg-cover bg-center pt-10"
      style={{
        backgroundImage: `url(${doctorImage})`,  
      }}
    >
      <div className="bg-opacity-70 bg-black w-full h-full flex sm:flex-row flex-col sm:justify-between sm:gap-0 gap-20 items-center">
        <div className="flex flex-col items-start gap-8 p-8">
          <div className="font-bold sm:text-5xl text-3xl text-[#F1FDDB]">
            Effortlessly book <br />
            appointments, track your <br /> health, and gain insights <br />
            —all just a <span className="text-[#34F655]">click</span> away.
          </div>
          <Link
            to={"/offer"}
            className="w-[120px] rounded-xl py-3 px-2 bg-[#34ebc3] flex flex-row justify-between items-center font-medium 
              transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-[0_4px_10px_#BEF96F]"
          >
            Get Started <FaArrowRight />
          </Link>
        </div>
        <div>
          <img
            src={doctorImage}
            alt="Doctor"
          />
        </div>
      </div>
      <div className="bg-opacity-90 bg-gray-800 w-full py-20 flex flex-col items-center">
        <h2 className="text-4xl text-[#F1FDDB] font-bold mb-6">Our Features</h2>
        <div className="grid sm:grid-cols-3 gap-10 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center">
            <img src={bookingImage} alt="Booking" className="h-25 mb-4 opacity-75 hover:opacity-100 transition-opacity duration-300" />
            <h3 className="text-lg font-semibold">Easy Appointment Booking</h3>
            <p className="text-gray-700 text-center">
              Schedule your appointments with ease, right from our platform.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center">
            <img src={trackingImage} alt="Health Tracking" className="h-25 mb-4 opacity-75 hover:opacity-100 transition-opacity duration-300" />
            <h3 className="text-lg font-semibold">Health Tracking</h3>
            <p className="text-gray-700 text-center">
              Keep track of your health metrics and receive personalized insights.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center">
            <img src={supportImage} alt="Support" className="h-25 mb-4 opacity-75 hover:opacity-100 transition-opacity duration-300" />
            <h3 className="text-lg font-semibold">24/7 Support</h3>
            <p className="text-gray-700 text-center">
              Our support team is available around the clock to assist you.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#34ebc3] text-black py-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to take control of your health?</h2>
        <Link
          to={"register"}
          className="rounded-lg py-3 px-6 bg-[#1a1f12] text-white font-medium transition-all duration-300 ease-in-out hover:bg-[#34F655]"
        >
          Join Us Now!
        </Link>
      </div>
    </section>
  );
}

export default Home;
