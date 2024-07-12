

import { useState } from "react";
import { Input } from "../../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../../components/ui/dropdown-menu";

import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortOrder, setSortOrder] = useState("asc");
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
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="w-full md:w-1/2 mb-4 md:mb-0 relative">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted"
              >
                <FilterIcon className="w-4 h-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] p-4 rounded-lg shadow-lg">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="category" className="mb-2 font-medium">
                    Category
                  </Label>
                  <div className="grid gap-2">
                    {[
                      "Bags & Packs",
                      "Cooking & Dining",
                      "Sleeping Gear",
                      "Footwear",
                      "Lighting",
                      "Accessories",
                      "Apparel",
                    ].map((category) => (
                      <Label key={category} className="flex items-center gap-2">
                        <Checkbox
                        //   checked={selectedCategories.includes(category)}
                        //   onCheckedChange={() => handleCategoryChange(category)}
                        />
                        {category}
                      </Label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="price-range" className="mb-2 font-medium">
                    Price Range
                  </Label>
                  <div className="rounded-lg" />
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted"
              >
                <ListOrderedIcon className="w-4 h-4" />
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px] p-4 rounded-lg shadow-lg">
              <DropdownMenuRadioGroup
                value={sortOrder}
                // onValueChange={handleSortOrderChange}
              >
                <DropdownMenuRadioItem value="asc">
                  Price: Low to High
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="desc">
                  Price: High to Low
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            // onClick={handleClearFilters}
            className="px-4 py-2 rounded-lg hover:bg-muted"
          >
            Clear Filters
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-background rounded-lg shadow-lg overflow-hidden"
          >
            <Link to={"/"} className="block">
              <img
                src="/placeholder.svg"
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {[...Array(Math.floor(product.rating))].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 fill-primary" />
                    ))}
                    {product.rating % 1 !== 0 && (
                      <StarIcon className="w-5 h-5 fill-primary" />
                    )}
                    <span className="text-sm text-muted-foreground">
                      ({product.rating})
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-muted-foreground mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShoppingCartIcon className="w-4 h-4" />
                    <span>{product.totalSales}</span>
                  </div>
                  <Button
                    size="sm"
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80"
                  >
                    <ShoppingCartIcon className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function ListOrderedIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
