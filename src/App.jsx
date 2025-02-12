import Navbar from "./components/Navbar";
import StepsContainer from "./components/StepsContainer";

function App() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-[#02191D]" />
      <div className="absolute inset-0 radial-gradient" />
      <div className="z-10 relative flex flex-col justify-center items-center">
        <Navbar />
        <StepsContainer />
      </div>
    </div>
  );
}

// bg-[radial-gradient(circle_at_bottom,white_0%,#02191D_30%)]
export default App;
