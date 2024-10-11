import { Link } from "react-router-dom";
import mainPage from "../assets/mainPage.webp";
import { FaArrowRight } from "react-icons/fa";

function Home() {
  return (
    <section className="min-h-screen mt-32">
      <div className="flex sm:flex-row flex-col sm:justify-between sm:gap-0 gap-20 items-center">
        {/* left side */}
        <div className="flex flex-col items-start gap-8">
          <div className="font-bold sm:text-5xl text-3xl text-[#F1FDDB]">
            Effortlessly book <br />
            appointments, track your <br /> health, and gain insights <br />{" "}
            —all just a <span className="text-[#34F655]">click</span> away.
          </div>
          <Link
            to={"/offer"}
            className="w-[120px] rounded-xl py-3 px-2 bg-[#BEF96F] flex flex-row justify-between items-center font-medium 
  transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-[0_4px_10px_#BEF96F]"
          >
            Get Started <FaArrowRight />
          </Link>
        </div>
        {/* right side */}
        <div>
          <img
            src={mainPage}
            alt=""
            className="sm:w-[500px] sm:h-[350px] w-[350px] h-[250px]"
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
