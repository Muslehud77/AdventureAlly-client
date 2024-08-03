import Marquee from "react-fast-marquee";
import { useTheme } from "../../components/ThemeProvider";

const CustomerReview = () => {

    const {actualTheme} = useTheme()

  return (
    <div
      data-scroll
      data-scroll-speed="-.1"
      className="h-full  text-foreground bg-background rounded-t-3xl pb-10"
    >
      <div className="container mx-auto text-center pt-10">
        <h1 className="text-3xl md:text-5xl font-light  mb-4">
          Hear from Our Happy Campers
        </h1>
        <p className="text-xl font-light leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
          Read real reviews from fake campers who haven't tested our gear. Lol
        </p>
        <div className="flex mt-6 justify-center">
          <div className="w-16 h-1 rounded-full bg-foreground inline-flex"></div>
        </div>
      </div>
      <div className="pt-14 space-y-5">
        <Marquee
          gradient
          gradientColor={actualTheme === "dark" ? "black" : "white"}
          gradientWidth={100}
          speed={20}
        >
          <div className="flex gap-3 w-full mr-3">
            {reviews.map((review) => (
              <div
                key={review.image}
                className="flex h-32 hover:scale-105 duration-500 max-w-lg bg-secondary  rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={review.image}
                  alt="Person's Image"
                  className="w-28 h-full object-cover"
                />
                <div className="p-4 flex-grow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {review.username}
                      </h2>
                      <h3 className="text-sm font-light">
                        User since {review.user_since}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-400">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
        <Marquee
          gradient
          gradientColor={actualTheme === "dark" ? "black" : "white"}
          gradientWidth={100}
          direction="right"
        >
          <div className="flex gap-3 w-full mr-3">
            {reviews.map((review) => (
              <div
                key={review.image}
                className="flex h-36 hover:scale-105 duration-500 max-w-lg bg-secondary rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={review.image}
                  alt="Person's Image"
                  className="w-28 h-full object-cover"
                />
                <div className="p-4 flex-grow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {review.username}
                      </h2>
                      <h3 className="text-sm font-light">
                        User since {review.user_since}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-400">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
        <Marquee
          gradient
          gradientColor={actualTheme === "dark" ? "black" : "white"}
          gradientWidth={100}
          speed={10}
        >
          <div className="flex gap-3 w-full mr-3">
            {reviews.map((review) => (
              <div
                key={review.image}
                className="flex h-32 hover:scale-105 duration-500 max-w-lg bg-secondary  rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={review.image}
                  alt="Person's Image"
                  className="w-28 h-full object-cover"
                />
                <div className="p-4 flex-grow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {review.username}
                      </h2>
                      <h3 className="text-sm font-light">
                        User since {review.user_since}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-400">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default CustomerReview;

export const reviews = [
  {
    image:
      "https://i.postimg.cc/ydr2tRCG/360-F-200902415-G4e-Z9-Ok3-Ypd4-SZZKjc8nq-Jy-FVp1e-OD6-V.jpg",
    username: "John Doe",
    comment:
      "Fantastic camping gear! Made my trip so much easier and enjoyable.",
    rating: 5,
    user_since: "2023",
  },
  {
    image:
      "https://i.postimg.cc/mDr0mwJM/360-F-214746128-31-Jkea-P6r-U0-Nzzzd-FC4kh-Gkmqc8noe6h.jpg",
    username: "Alex Smith",
    comment:
      "High-quality products and great customer service. Highly recommend!",
    rating: 4.5,
    user_since: "2022",
  },
  {
    image:
      "https://i.postimg.cc/d06bRXHw/51c4d9312d12f225dbf61d6a7329474f-t.jpg",
    username: "Michael Johnson",
    comment: "Good value for money. The gear is durable and well-made.",
    rating: 4,
    user_since: "2021",
  },
  {
    image:
      "https://i.postimg.cc/VNzyC1FK/a0829663dac599b94fcaf9ff94c07e34-t.jpg",
    username: "David Brown",
    comment:
      "Perfect for my camping adventures! Lightweight and easy to carry.",
    rating: 4.5,
    user_since: "2023",
  },
  {
    image: "https://i.postimg.cc/mkvJ2GDN/istockphoto-906808234-612x612.jpg",
    username: "Chris Davis",
    comment: "Exceeded my expectations! The best camping gear I’ve purchased.",
    rating: 5,
    user_since: "2022",
  },
  {
    image: "https://i.postimg.cc/prh3Hd2L/pexels-photo-2379004.jpg",
    username: "James Miller",
    comment:
      "Very satisfied with the purchase. The gear is sturdy and reliable.",
    rating: 4,
    user_since: "2021",
  },
  {
    image: "https://i.postimg.cc/j2y2jtcR/il-570x-N-4963666746-r3x7.webp",
    username: "Robert Wilson",
    comment: "Great selection and affordable prices. Will shop again!",
    rating: 4.5,
    user_since: "2023",
  },
  {
    image:
      "https://i.postimg.cc/L4PnD3pG/young-man-camping-tent-23-2148622645.avif",
    username: "William Taylor",
    comment:
      "Awesome products! They made my camping experience more comfortable.",
    rating: 5,
    user_since: "2022",
  },
];
