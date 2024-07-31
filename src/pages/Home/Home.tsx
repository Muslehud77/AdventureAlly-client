import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Spotlight from "./Spotlight";
import CustomerFavorites from "../../components/CustomerFavorite/CustomerFavorite";
import CustomerReview from "./CustomerReview";
import ShopByCategory from "./ShopByCategory";
import FaqSection from "./FaqSection";


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
      <CustomerReview/>
      <FaqSection/>
    </div>
  );
};

export default Home;
