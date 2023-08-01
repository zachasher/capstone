import React from "react";
import "./home-content.scss"

function HomeContent() {
  return (
    <div className="home-content">
      <div className="home-content__1">
        <h2 className="home-content__title1">JOIN THE REVOLUTION</h2>
        <p className="home-content__text1">
        Aspire Fitness empowers your journey to greatness. We cultivate a harmonious blend of mind, body, and spirit, guiding you towards balanced well-being and achieving your fitness aspirations.
        </p>
      </div>
      <div className="home-content__2">
        <h2 className="home-content__title2">WE DO MORE</h2>
        <p className="home-content__text2">
        When it comes to fitness, good nutrition is vital. Aspire Fitness gives all members access to their own free personal nutrition program to achieve health objectives with daily meal plans, tracking, and community support.
        </p>
      </div>
    </div>
  );
}

export default HomeContent;
