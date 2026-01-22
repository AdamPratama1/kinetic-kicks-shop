import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-xl gradient-card border border-border neon-border-hover transition-all duration-500">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {product.new && (
            <span className="px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
              NEW
            </span>
          )}
          {product.featured && (
            <span className="px-3 py-1 text-xs font-semibold glass rounded-full">
              FEATURED
            </span>
          )}
        </div>

        {/* 3D Preview Placeholder */}
        <div className="aspect-square bg-gradient-to-br from-muted/50 to-background flex items-center justify-center p-8">
          <div 
            className="w-32 h-16 rounded-lg transform -rotate-12 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6"
            style={{ backgroundColor: product.colors[0].hex }}
          />
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <Link
            to={`/product/${product.id}`}
            className="p-3 rounded-full bg-primary text-primary-foreground hover:glow-primary transition-all"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <Link
            to={`/product/${product.id}`}
            className="p-3 rounded-full glass hover:bg-foreground/10 transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          {product.colors.slice(0, 4).map((color) => (
            <div
              key={color.name}
              className="w-4 h-4 rounded-full border border-border"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">{product.brand}</p>
        <p className="text-lg font-bold text-primary">${product.price}</p>
      </div>
    </motion.div>
  );
};
