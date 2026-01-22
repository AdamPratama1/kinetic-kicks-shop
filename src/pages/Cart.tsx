import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto space-y-6"
          >
            <div className="w-24 h-24 mx-auto rounded-full glass flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
            <p className="text-muted-foreground">
              Looks like you haven't added any shoes to your cart yet.
            </p>
            <Link to="/products">
              <Button variant="hero" size="lg">
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8"
        >
          Shopping Cart
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 p-6 rounded-xl glass"
              >
                {/* Product Image */}
                <div className="w-28 h-28 rounded-lg bg-gradient-to-br from-muted/50 to-background flex items-center justify-center shrink-0">
                  <div
                    className="w-16 h-8 rounded transform -rotate-12"
                    style={{ backgroundColor: item.selectedColor.hex }}
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.product.id}`}
                    className="font-semibold hover:text-primary transition-colors line-clamp-1"
                  >
                    {item.product.name}
                  </Link>
                  <div className="text-sm text-muted-foreground mt-1 space-y-1">
                    <p>Color: {item.selectedColor.name}</p>
                    <p>Size: US {item.selectedSize}</p>
                  </div>
                  <p className="font-bold text-primary mt-2">${item.product.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() =>
                      removeItem(item.product.id, item.selectedColor.name, item.selectedSize)
                    }
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedColor.name,
                          item.selectedSize,
                          item.quantity - 1
                        )
                      }
                      className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedColor.name,
                          item.selectedSize,
                          item.quantity + 1
                        )
                      }
                      className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="p-6 rounded-xl glass space-y-6">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {subtotal < 100 && (
                  <p className="text-xs text-muted-foreground">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="border-t border-border pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link to="/checkout" className="block">
                <Button variant="hero" size="lg" className="w-full">
                  Checkout
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>

              <Link to="/products" className="block">
                <Button variant="ghost" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
