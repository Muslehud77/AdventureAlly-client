


import ProductCard from "../../components/ProductCard/ProductCard";
import SearchAndFiltering from "./SearchAndFiltering";

export default function AllProducts() {
  
  const products = [
    {
      id: 1,
      name: "Ultralight Backpack",
      description: "Durable and lightweight backpack for outdoor adventures.",
      price: 99.99,
      category: "Bags & Packs",
      image: "/placeholder.svg",
      rating: 4.5,
      totalSales: 1234,
    },
    {
      id: 2,
      name: "Camping Stove",
      description: "Compact and efficient stove for cooking on the go.",
      price: 49.99,
      category: "Cooking & Dining",
      image: "/placeholder.svg",
      rating: 4.2,
      totalSales: 567,
    },
    {
      id: 3,
      name: "Sleeping Bag",
      description:
        "Warm and cozy sleeping bag for a comfortable night outdoors.",
      price: 79.99,
      category: "Sleeping Gear",
      image: "/placeholder.svg",
      rating: 4.8,
      totalSales: 789,
    },
    {
      id: 4,
      name: "Hiking Boots",
      description: "Durable and supportive boots for rugged terrain.",
      price: 89.99,
      category: "Footwear",
      image: "/placeholder.svg",
      rating: 4.3,
      totalSales: 321,
    },
    {
      id: 5,
      name: "Portable Lantern",
      description:
        "Bright and long-lasting lantern for illuminating your campsite.",
      price: 29.99,
      category: "Lighting",
      image: "/placeholder.svg",
      rating: 4.6,
      totalSales: 456,
    },
    {
      id: 6,
      name: "Camping Hammock",
      description:
        "Comfortable and easy-to-set-up hammock for relaxing outdoors.",
      price: 59.99,
      category: "Sleeping Gear",
      image: "/placeholder.svg",
      rating: 4.7,
      totalSales: 678,
    },
    {
      id: 7,
      name: "Trekking Poles",
      description:
        "Adjustable and durable poles to support your hiking adventures.",
      price: 39.99,
      category: "Accessories",
      image: "/placeholder.svg",
      rating: 4.1,
      totalSales: 234,
    },
    {
      id: 8,
      name: "Waterproof Jacket",
      description:
        "Breathable and weatherproof jacket to keep you dry on the trail.",
      price: 99.99,
      category: "Apparel",
      image: "/placeholder.svg",
      rating: 4.4,
      totalSales: 890,
    },
  ];

 
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
     <SearchAndFiltering/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => <ProductCard key={product.id} product={product}/>)}
      </div>
    </div>
  );
}

