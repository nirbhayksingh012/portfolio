import SideRays from "./SideRays";
import BackgroundMeteors from "./BackgroundMeteors";

const AnimatedBackground = () => {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <SideRays
        speed={2.5}
        rayColor1="#EAB308"
        rayColor2="#96c8ff"
        intensity={2}
        spread={2}
        origin="top-right"
        tilt={0}
        saturation={1.5}
        blend={0.75}
        falloff={1.6}
        opacity={1}
      />
      <BackgroundMeteors number={25} />
    </div>
  );
};

export { AnimatedBackground };
export default AnimatedBackground;