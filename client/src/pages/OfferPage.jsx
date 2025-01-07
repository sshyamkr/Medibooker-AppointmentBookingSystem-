import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../features/auth/authSlice";
import offer from "../assets/offer.jpg"; 
import Card from "../components/Card";
import { MdFitnessCenter} from "react-icons/md";
import { IoIosBody, IoMdCalendar } from "react-icons/io";

export default function OfferPage() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch, token]);

  return (
    <section
      className="min-h-screen flex justify-center flex-col items-center gap-20"
      style={{
        backgroundImage: `url(${offer})`, 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        height: "100vh", 
        opacity: 0.9, 
      }}
    >
      <div className="text-dark-blue text-5xl font-extrabold mb-8">
        What We Offer
      </div>
      <div className="flex sm:flex-row flex-col items-center justify-center gap-10 p-4">
        <Card
          icon={<MdFitnessCenter className="bg-red transition-transform transform hover:scale-110" />}
          desc="Track Your Ideal Weight: Calculate Your BMI in Seconds"
          btnText="Calculate"
          link={"/bmi"}
          className="bg-white bg-opacity-80 hover:bg-opacity-100 transition duration-300 ease-in-out rounded-lg shadow-lg p-5 flex flex-col items-center"
        />
        <Card
          icon={<IoIosBody className="transition-transform transform hover:scale-110" />}
          desc="Measure Your Body Fat, Achieve Your Health Goals"
          btnText="Check"
          link={"/bodyfat"}
          className="bg-white bg-opacity-80 hover:bg-opacity-100 transition duration-300 ease-in-out rounded-lg shadow-lg p-5 flex flex-col items-center"
        />
        <Card
          icon={<IoMdCalendar className="transition-transform transform hover:scale-110" />}
          desc="Manage Your Appointments: View, Track, and Stay Updated"
          btnText="Book"
          link={token ? "/dashboard" : "/login"}
          className="bg-white bg-opacity-100 hover:bg-opacity-100 transition duration-300 ease-in-out rounded-lg shadow-lg p-5 flex flex-col items-center"
        />
      </div>
    </section>
  );
}
