
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Rating,Star } from "@smastrom/react-rating";

const myStyles = {
  itemShapes: Star,
  activeFillColor: "black",
  inactiveFillColor: "#C5C5C5",
};

export default function ProductDetails() {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4">
        <img
          src="/placeholder.svg"
          alt="Product Image"
          width={600}
          height={900}
          className="aspect-[2/3] object-cover border w-full rounded-lg overflow-hidden"
        />
        <div className="grid grid-cols-4 gap-4">
          <button className="border hover:border-primary rounded-lg overflow-hidden transition-colors">
            <img
              src="/placeholder.svg"
              alt="Preview thumbnail"
              width={100}
              height={100}
              className="aspect-square object-cover"
            />
            <span className="sr-only">View Image 1</span>
          </button>
          <button className="border hover:border-primary rounded-lg overflow-hidden transition-colors">
            <img
              src="/placeholder.svg"
              alt="Preview thumbnail"
              width={100}
              height={100}
              className="aspect-square object-cover"
            />
            <span className="sr-only">View Image 2</span>
          </button>
          <button className="border hover:border-primary rounded-lg overflow-hidden transition-colors">
            <img
              src="/placeholder.svg"
              alt="Preview thumbnail"
              width={100}
              height={100}
              className="aspect-square object-cover"
            />
            <span className="sr-only">View Image 3</span>
          </button>
          <button className="border hover:border-primary rounded-lg overflow-hidden transition-colors">
            <img
              src="/placeholder.svg"
              alt="Preview thumbnail"
              width={100}
              height={100}
              className="aspect-square object-cover"
            />
            <span className="sr-only">View Image 4</span>
          </button>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">Acme Prism T-Shirt</h1>
          <div className="flex items-center gap-2">
            <Rating
              style={{ maxWidth: 100 }}
              itemStyles={myStyles}
              value={4}
              readOnly
            />
            <span className="text-sm text-muted-foreground">(4.3)</span>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-black text-white px-2 py-1 rounded-md text-sm font-medium">
              In Stock
            </div>
            <span className="text-sm text-muted-foreground">1,234 sold</span>
          </div>
          <p className="text-lg font-bold">$49.99</p>
          <p className="text-muted-foreground">
            Introducing the Acme Prism T-Shirt, a perfect blend of style and
            comfort for the modern individual. This tee is crafted with a
            meticulous composition of 60% combed ringspun cotton and 40%
            polyester jersey, ensuring a soft and breathable fabric that feels
            gentle against the skin.
          </p>
        </div>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="quantity" className="text-base">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              defaultValue={1}
              className="w-24"
            />
          </div>
          <Button size="lg">Add to cart</Button>
        </form>
      </div>
    </div>
  );
}

