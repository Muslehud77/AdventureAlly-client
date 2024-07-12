
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';

import { Rating } from "@smastrom/react-rating";



type ProductCardProps = {
  product : Record<string,unknown>
};

const ProductCard = ({product}:ProductCardProps) => {
  return (
    <div className="bg-background rounded-lg shadow-lg overflow-hidden">
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
              <Rating
                style={{ maxWidth: 100 }}
                value={Number(product.rating) as number}
                readOnly
              />
              <span className="text-sm text-muted-foreground">
                ({product.rating})
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {product.category}
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-muted-foreground mb-4">{product.description}</p>
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
  );
};

export default ProductCard;


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

