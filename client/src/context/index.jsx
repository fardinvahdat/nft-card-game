import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { useNavigate } from "react-router-dom";

import { ABI, ADDRESS } from "../contract/index";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState("");
  const [contract, setContract] = useState("");
  const [showAlert, setShowAlert] = useState({
    status: false,
    message: "",
    type: "info",
  });

  const updateCurrentWaletAddress = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accounts) setWalletAddress(accounts[0]);
  };

  useEffect(() => {
    updateCurrentWaletAddress();

    window.ethereum.on("accountsChanger", updateCurrentWaletAddress);
  }, []);

  useEffect(() => {
    const setSmartContractProvider = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const newProvider = new ethers.providers.Web3Provider(connection);
      const signer = newProvider.getSigner();
      const newContract = new ethers.Contract(ADDRESS, ABI, signer);

      setContract(newContract);
      setProvider(newProvider);
    };

    setSmartContractProvider();
  }, []);

  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: true, type: "info", message: "" });
      }, [5000]);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <GlobalContext.Provider
      value={{
        contract,
        walletAddress,
        showAlert,
        setShowAlert,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
