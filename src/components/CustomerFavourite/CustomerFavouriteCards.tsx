import  { ReactNode } from "react";
import { motion } from "framer-motion";
import { TProduct } from "../../pages/AllProducts/AllProducts";

export const CustomerFavoriteCards = ({ products } : {products:TProduct[]}) => {
 
    const colSpan = (int:number)=>{
        if(int===2){
             return "md:col-span-4";
        }
        if(int===3){
            return "md:col-span-8";
        }
        if(int%2 === 0){
            return "md:col-span-8"
        }else{
            return "md:col-span-4";
        }
    }
 
    return (
      <section className="space-y-5">
        <div className="mb-4 grid grid-cols-12 gap-4">
          {products.map((product, i) => (
            <BounceCard key={product._id} className={`col-span-12 ${colSpan(i)}`}>
              <CardTitle>Do a thing</CardTitle>
              <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-violet-400 to-indigo-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
                <span className="block text-center font-semibold text-indigo-50">
                  FEATURE DEMO HERE
                </span>
              </div>
            </BounceCard>
          ))}

        </div>
      </section>
    );
};

const BounceCard = ({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: "-1deg" }}
      className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-slate-100 p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h3 className="mx-auto text-center text-3xl font-semibold">{children}</h3>
  );
};
