import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Spotlight from "./Spotlight";
import CustomerFavorites from "../../components/CustomerFavorite/CustomerFavorite";
import CustomerReview from "./CustomerReview";
import ShopByCategory from "./ShopByCategory";
import FaqSection from "./FaqSection";
import ExploreOutdoors from "./ExploreOutdoors";


const Home = () => {
  return (
    <div className="bg-secondary">
      <Helmet>
        <title>AdventureAlly</title>
      </Helmet>
      <Banner />
      <Spotlight />
      <ShopByCategory/>
      <CustomerFavorites />
      <ExploreOutdoors/>
      <CustomerReview/>
      <FaqSection/>
    </div>
  );
};

export default Home;
