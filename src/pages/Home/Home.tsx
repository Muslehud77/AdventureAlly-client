import { Helmet } from "react-helmet-async";
import Banner from "./Banner";

const Home = () => {
  return (
    <div>
     <Helmet>
      <title>AdventureAlly</title>
     </Helmet>
     <Banner/>
    </div>
  );
};

export default Home;