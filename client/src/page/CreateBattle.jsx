import React from "react";
import { PageHOC } from "../components";

const CreateBattle = () => {
  return (
    <PageHOC
      title={
        <>
          Create <br /> a New Batlle
        </>
      }
      description={
        <>Create your Own Battle and wait for other players to join you</>
      }
    ></PageHOC>
  );
};
export default CreateBattle;
