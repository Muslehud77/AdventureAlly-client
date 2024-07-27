import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Spotlight from "./Spotlight";
import CustomerFavorites from "../../components/CustomerFavourite/CustomerFavorites";

const Home = () => {
  return (
    <div className="bg-secondary">
      <Helmet>
        <title>AdventureAlly</title>
      </Helmet>
      <Banner />
      <Spotlight />
      <CustomerFavorites />
    </div>
  );
};

export default Home;
