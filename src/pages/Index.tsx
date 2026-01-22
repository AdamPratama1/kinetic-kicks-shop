import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoeViewer } from '@/components/3d/ShoeViewer';
import { ProductCard } from '@/components/products/ProductCard';
import { Layout } from '@/components/layout/Layout';
import { products } from '@/data/products';
import { ArrowRight, Sparkles, Shield, Truck } from 'lucide-react';

const Index = () => {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  const features = [
    { icon: Sparkles, title: 'Premium Quality', description: 'Crafted with finest materials' },
    { icon: Shield, title: '2 Year Warranty', description: 'Guaranteed durability' },
    { icon: Truck, title: 'Free Shipping', description: 'On orders over $100' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.span 
              className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              NEW COLLECTION 2024
            </motion.span>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Step Into
              <br />
              <span className="text-primary text-glow">The Future</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
              Experience next-gen footwear with revolutionary comfort technology and bold design.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button variant="hero" size="xl">
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="glass" size="xl">
                  View Collection
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* 3D Shoe Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[500px] lg:h-[600px]"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
            <ShoeViewer color="#CCFF00" interactive={false} showControls={false} />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-6 rounded-xl gradient-card border border-border"
              >
                <div className="p-3 rounded-lg bg-primary/10">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          >
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
              <p className="text-muted-foreground">Discover our most popular styles</p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="mt-4 md:mt-0">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to <span className="text-primary text-glow">Elevate</span> Your Game?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of athletes who trust STRIDE for their performance needs.
            </p>
            <Link to="/products">
              <Button variant="hero" size="xl" className="mt-8">
                Shop the Collection
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
