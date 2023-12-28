import React from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

export function AdminHome() {
  return (
    <Helmet title="Admin Home">
      {<CommonSection title="Admin" />}    
      
      
    </Helmet>
  );
};
