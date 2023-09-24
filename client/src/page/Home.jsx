import React, { useState } from "react";
import { PageHOC, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from "../context";

const title = (
  <>
    Wellcome to Avax Gods <br /> a Web3 NFT Card Game
  </>
);
const description = (
  <>
    Connect your Wallet to start plaing <br /> the ultimate Web3 Wattle Card
    Game
  </>
);

const Home = () => {
  const { walletAddress, showAlert, setShowAlert, contract } =
    useGlobalContext();
  const [playerName, setPlayerName] = useState("");
  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName);

        setShowAlert({
          status: true,
          type: "info",
          message: `${playerName} is being summoned!`,
        });
      }
    } catch (error) {
      setShowAlert({
        status: true,
        type: "error",
        message: error.message,
      });
    }
  };

  return (
    <PageHOC title={title} description={description}>
      <div className="flex flex-col">
        <CustomInput
          label="Name"
          placeHolder="Enter Your Player Name"
          value={playerName}
          handleValueChange={setPlayerName}
        />

        <CustomButton
          title="Register"
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>
    </PageHOC>
  );
};
export default Home;
