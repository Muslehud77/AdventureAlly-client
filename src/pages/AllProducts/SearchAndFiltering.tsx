
import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Range } from "react-range";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../../components/ui/dropdown-menu";

import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";

import { Button } from "../../components/ui/button";
import PriceRangeSelector from "./PriceRangeSelector";

const SearchAndFiltering = ({ search }) => {
  const [range,setRange] = useState([0])
 

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-16">
      <div className="w-full md:w-1/2 mb-4 md:mb-0 relative">
        <Input
          onChange={search}
          placeholder="Search products..."
          //   value={searchTerm}
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
               <PriceRangeSelector/>
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
            // value={sortOrder}
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
  );
};

export default SearchAndFiltering;


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