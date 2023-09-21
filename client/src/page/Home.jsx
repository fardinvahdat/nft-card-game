import React from "react";
import { PageHOC } from "../components";

const Home = () => {
  return (
    <PageHOC
      title={
        <>
          Wellcome to Avax Gods <br /> a Web3 NFT Card Game
        </>
      }
      description={
        <>
          Connect your Wallet to start plaing <br /> the ultimate Web3 Wattle
          Card Game
        </>
      }
    >
      
    </PageHOC>
  );
};
export default Home;
