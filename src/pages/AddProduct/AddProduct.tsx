
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { useState } from "react";

export default function AddProduct() {
  const [imageData, setImageData] = useState<File[] | null>(null);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setImageData(fileArray);
     
    } else {
      setImageData(null);
    }
  };

  const categories = ["Backpack", "Cloth", "Footwear", "Kitchen", "Tents"];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>
      <form className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Select id="category">
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" type="text" placeholder="Enter product name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="details">Product Details</Label>
          <Textarea id="details" rows={4} placeholder="Describe the product" />
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" placeholder="Enter price" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" type="number" placeholder="Enter quantity" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label>Product Images</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="aspect-square bg-muted rounded-md flex items-center justify-center border-2 border-dashed border-muted-foreground hover:border-primary transition-colors">
              <UploadIcon className="w-6 h-6 text-muted-foreground" />
            </button>
            <img
              src="/placeholder.svg"
              alt="Product image"
              width={150}
              height={150}
              className="aspect-square object-cover rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Product</Button>
        </div>
      </form>
    </div>
  );
}

function UploadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
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
