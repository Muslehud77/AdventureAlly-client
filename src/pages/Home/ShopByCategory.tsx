
import { IconType } from "react-icons";

import { MdOutlineBackpack } from "react-icons/md";

import { TbToolsKitchen } from "react-icons/tb";
import { GiRunningShoe, GiCampingTent, GiLoincloth } from "react-icons/gi";
import { Link } from "react-router-dom";


const ShopByCategory = () => {
  return (
    <div className="h-full  text-foreground bg-secondary rounded-t-3xl">
      <div className="container mx-auto py-10">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="text-3xl md:text-5xl font-light mb-2">
              Categories
            </h1>
            <div className="h-1 w-20 bg-secondary-foreground rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-xl font-light">
            Explore our diverse range of camping gear. Find exactly what you
            need for your next adventure by browsing our categories.
          </p>
        </div>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
          {categories.map((cat) => (
            <Card
              key={cat.name}
              title={cat.name}
              subtitle={cat.miniTitle}
              href={cat.url}
              Icon={cat.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface CardType {
  title: string;
  subtitle: string;
  Icon: IconType;
  href: string;
}

const Card = ({ title, subtitle, Icon, href }: CardType) => {
  return (
    <Link
      to={href}
      className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-primary/90 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-primary group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-2xl text-primary group-hover:text-white transition-colors relative z-10 duration-300" />
      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
        {subtitle}
      </p>
    </Link>
  );
};

export default ShopByCategory;


export const categories = [
  {
    name: "Backpack",
    url: "/all-products?category=Backpack",
    icon: MdOutlineBackpack,
    miniTitle: "Carry Essentials",
  },
  {
    name: "Cloth",
    url: "/all-products?category=Cloth",
    icon: GiLoincloth,
    miniTitle: "Outdoor Apparel",
  },
  {
    name: "Kitchen",
    url: "/all-products?category=Kitchen",
    icon: TbToolsKitchen,
    miniTitle: "Cook Outdoors",
  },
  {
    name: "Tent",
    url: "/all-products?category=Tent",
    icon: GiCampingTent,
    miniTitle: "Shelter Solutions",
  },
  {
    name: "Footwear",
    url: "/all-products?category=Footwear",
    icon: GiRunningShoe,
    miniTitle: "Comfortable Steps",
  },
];
