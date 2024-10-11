import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../features/auth/authSlice";
import offer from "../assets/offer.webp";
import Card from "../components/Card";
import { MdFitnessCenter } from "react-icons/md";
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
    <section>
      <div className="min-h-screen flex justify-center flex-col items-center gap-20">
        <img src={offer} alt="" className="w-[200px] h-[150px]" />
        <div className="text-[#F1FDDB] text-5xl font-extrabold">
          What We Offer
        </div>
        <div className="flex sm:flex-row flex-col items-center justify-center gap-10">
          <Card
            icon={<MdFitnessCenter />}
            desc="Track Your Ideal Weight: Calculate Your BMI in Seconds"
            btnText="Calculate"
            link={"/bmi"}
          />
          <Card
            icon={<IoIosBody />}
            desc="Measure Your Body Fat, Achieve Your Health Goals"
            btnText="Check"
            link={"/bodyfat"}
          />
          <Card
            icon={<IoMdCalendar />}
            desc="Manage Your Appointments: View, Track, and Stay Updated"
            btnText="Book"
            link={token ? "/dashboard" : "/login"}
          />
        </div>
      </div>
    </section>
  );
}
