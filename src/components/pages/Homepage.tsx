import React, { FC } from "react";

const Homepage: FC = () => {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered is-size-1 mb-6">Welcome</h1>
        <h2 className="has-text-centered">
          React Redux application for authentication of users using firebase.{" "}
          <br /> Designed by David Zagi
        </h2>
      </div>
    </section>
  );
};

export default Homepage;
