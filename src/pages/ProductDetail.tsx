import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { ShoeViewer } from '@/components/3d/ShoeViewer';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { ArrowLeft, ShoppingBag, Check, Ruler } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  
  const product = products.find((p) => p.id === id);
  
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/products">
            <Button variant="outline">Back to Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const selectedColor = product.colors[selectedColorIndex];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addItem(product, selectedColor, selectedSize);
    toast.success('Added to cart!', {
      action: {
        label: 'View Cart',
        onClick: () => navigate('/cart'),
      },
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl glass overflow-hidden">
              <ShoeViewer color={selectedColor.meshColor} interactive showControls />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Drag to rotate • Scroll to zoom
            </p>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                {product.new && (
                  <span className="px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                    NEW
                  </span>
                )}
                <span className="text-muted-foreground">{product.brand}</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-primary">${product.price}</p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Color Selector */}
            <div>
              <h3 className="font-semibold mb-3">
                Color: <span className="text-muted-foreground font-normal">{selectedColor.name}</span>
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColorIndex(index)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColorIndex === index
                        ? 'border-primary scale-110 glow-primary'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Select Size</h3>
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-4 h-4" />
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg border transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Guide Modal */}
            {showSizeGuide && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 rounded-xl glass"
              >
                <h4 className="font-semibold mb-3">Size Guide (US)</h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-muted-foreground">US</div>
                  <div className="text-muted-foreground">EU</div>
                  <div className="text-muted-foreground">CM</div>
                  {[
                    [7, 40, 25],
                    [8, 41, 26],
                    [9, 42, 27],
                    [10, 43, 28],
                    [11, 44, 29],
                    [12, 45, 30],
                  ].map(([us, eu, cm]) => (
                    <>
                      <div key={`us-${us}`}>{us}</div>
                      <div key={`eu-${eu}`}>{eu}</div>
                      <div key={`cm-${cm}`}>{cm}</div>
                    </>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Add to Cart */}
            <div className="flex gap-4">
              <Button
                variant="hero"
                size="xl"
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-4 border-t border-border">
              {['Free shipping on orders over $100', '30-day return policy', '2-year warranty'].map(
                (feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    {feature}
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
