// components/TvLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
// import TvHeader from "./tvHeader"; // Custom header for TV pages
import SiteHeaderTV from "../siteHeaderTv";

const TvLayout = () => {
  return (
    <div> this is the tv layout
      <SiteHeaderTV />
      <main>
        <Outlet /> 
      </main> 
    </div>
  );
};

export default TvLayout;