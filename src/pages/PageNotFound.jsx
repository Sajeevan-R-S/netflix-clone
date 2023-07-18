import React from "react";
import ContentWrapper from "../components/ContentWrapper";
import Navbar from "../components/Navbar";

function PageNotFound() {
  return (
    <>
      <Navbar />
      <div className="h-[93vh] pt-[200px] flex justify-center items-center">
        <ContentWrapper>
          <div className="flex flex-col -mt-44">
            <h1 className="text-center text-8xl font-medium">404</h1>
            <h2 className="text-center text-5xl">Page not found!</h2>
          </div>
        </ContentWrapper>
      </div>
    </>
  );
}

export default PageNotFound;
