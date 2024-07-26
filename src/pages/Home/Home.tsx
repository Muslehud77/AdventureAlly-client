import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Spotlight from "./Spotlight";

const Home = () => {
  return (
    <div className="bg-secondary">
     <Helmet>
      <title>AdventureAlly</title>
     </Helmet>
     <Banner/>
     <Spotlight/>
    </div>
  );
};

export default Home;