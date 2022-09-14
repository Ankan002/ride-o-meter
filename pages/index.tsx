import type { NextPage } from 'next';
import {CustomHead} from "components/elements";
import {Navbar, SettingsModal} from "components";
import {useState} from "react";

const Home: NextPage = () => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen w-full flex flex-col bg-primaryLight">
      <CustomHead title="Ride O Meter" />

      <div className="h-screen w-full flex flex-col">
          <Navbar setIsSettingsModalOpen={setIsSettingsModalOpen} />
      </div>

      <SettingsModal isOpen={isSettingsModalOpen} setIsOpen={setIsSettingsModalOpen} />
    </div>
  );
};

export default Home;
