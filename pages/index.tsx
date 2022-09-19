import type { NextPage } from 'next';
import {CustomHead} from "components/elements";
import {Navbar, SettingsModal, PickupDropSection, MapSection} from "components";
import React, {useEffect, useState} from "react";
import Script from "next/script";
import {Loader} from "@googlemaps/js-api-loader";
import {useRecoilState} from "recoil";
import {googleLoadedAtom} from "atoms/google-loaded-atom";

const Home: NextPage = () => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

  const [googleLoaded ,setGoogleLoaded] = useRecoilState<boolean>(googleLoadedAtom);

    const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
        libraries: ["places"]
    });

    useEffect(() => {
        if(window !== undefined && window?.google) {
            setGoogleLoaded(true);
            return;
        }
        loader
            .load()
            .then(() => setGoogleLoaded(true))
            .catch(e => setGoogleLoaded(false))
    }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-primaryLight">
      <CustomHead title="Ride O Meter" />

      <div className="h-screen w-full flex flex-col">
          <Navbar setIsSettingsModalOpen={setIsSettingsModalOpen} />
          {
              googleLoaded && (
                  <>
                      <PickupDropSection />
                      <MapSection />
                  </>
              )
          }
      </div>

      <SettingsModal isOpen={isSettingsModalOpen} setIsOpen={setIsSettingsModalOpen} />
    </div>
  );
};

export default Home;
