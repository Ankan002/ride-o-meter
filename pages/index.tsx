import type { NextPage } from 'next';
import {CustomHead} from "../components/elements";
import {Navbar} from "../components";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-primaryLight">
      <CustomHead title="Ride O Meter" />

      <div className="h-screen w-full flex flex-col">
          <Navbar />
      </div>
    </div>
  );
};

export default Home;
