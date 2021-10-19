import React from "react";

import HeroStyles from "./Hero.module.css";

import sampleimage from "../../icons/yuckxslemmqgjb2fflud.jpg";

export default function Hero() {
  return (
    <div className={HeroStyles.container}>
      <div className={HeroStyles.heroImage}>
        <img src={sampleimage} alt="sample" />
      </div>
      <div>
        <div className={HeroStyles.header}>
          <h1>
            A few words about this blog platfrom, Ghost, and how this site was
            made
          </h1>
        </div>
        <div className={HeroStyles.text}>
          <p>
            Why Ghost (&#38; Figma) instead of Medium, WordPress or other
            options?
          </p>
        </div>
      </div>
    </div>
  );
}
