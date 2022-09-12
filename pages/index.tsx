import type { NextPage } from 'next';
import {CustomHead} from "../component/elements";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-primaryLight">
      <CustomHead title="Ride O Meter" />

      <h1 className="text-2xl font-manrope">
        Hello from Ride O Meter
      </h1>
    </div>
  );
};

export default Home;
