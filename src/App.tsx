import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Star, 
  ChevronRight, 
  ChevronLeft, 
  Heart, 
  CheckCircle2, 
  PawPrint,
  Leaf,
  ShieldCheck,
  Zap,
  Clock,
  ArrowRight,
  Settings,
  X,
  Save,
  LogOut,
  Image as ImageIcon,
  Link as LinkIcon,
  Tag,
  DollarSign
} from 'lucide-react';

// --- Types ---
interface ProductData {
  name: string;
  tagline: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  sizes: string[];
  categories: string[];
  stats: { label: string; value: string }[];
  images: string[];
  orderLink: string;
}

// --- Initial Data ---
const DEFAULT_PRODUCT: ProductData = {
  name: "Signature Salmon & Sweet Potato",
  tagline: "Ultra-Premium, Grain-Free Nutrition",
  price: 64.99,
  rating: 4.9,
  reviews: 1240,
  description: "Crafted with wild-caught salmon and sun-ripened sweet potatoes, our Signature formula provides the perfect balance of proteins and complex carbohydrates for active gourmet canines.",
  features: [
    "100% Grain-Free & Hypoallergenic",
    "Rich in Omega-3 fatty acids for a shiny coat",
    "No artificial preservatives or fillers",
    "Human-grade ingredients sourced sustainably"
  ],
  sizes: ["5 lbs", "12 lbs", "25 lbs"],
  categories: ["Adult", "Sensitive Stomach", "Wild-Caught"],
  stats: [
    { label: "Protein", value: "28%" },
    { label: "Fat", value: "16%" },
    { label: "Fiber", value: "4.5%" },
    { label: "H2O", value: "10%" }
  ],
  images: [
    "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&q=80",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
    "https://images.unsplash.com/photo-1585671183186-0792376fc63b?w=800&q=80",
    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80"
  ],
  orderLink: "https://example.com/checkout"
};

type View = 'shop' | 'admin-login' | 'admin-panel';

const PLACEHOLDER_IMG = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export default function App() {
  // --- Global State ---
  const [view, setView] = useState<View>('shop');
  const [product, setProduct] = useState<ProductData>(() => {
    const saved = localStorage.getItem('canine_gourmet_product');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCT;
  });

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem('canine_gourmet_product', JSON.stringify(product));
  }, [product]);

  // --- Auth State ---
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // --- Product State ---
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // --- Handlers ---
  const nextImage = () => setCurrentImage((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === '1234' && password === '1234') {
      setView('admin-panel');
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  const handleOrderNow = () => {
    window.open(product.orderLink, '_blank', 'referrer');
  };

  if (view === 'admin-login') {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-brand-olive/10 border border-brand-olive/5 max-w-md w-full"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-brand-olive">Admin Access</h2>
            <button onClick={() => setView('shop')} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-stone-400" />
            </button>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-stone-400 mb-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-brand-olive outline-none transition-all"
                placeholder="1234"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-stone-400 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-brand-olive outline-none transition-all"
                placeholder="1234"
              />
            </div>
            {loginError && <p className="text-red-500 text-sm font-medium">{loginError}</p>}
            <button type="submit" className="w-full bg-brand-olive text-brand-cream py-5 rounded-2xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-brand-olive/20">
              Enter Control Panel
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (view === 'admin-panel') {
    return (
      <div className="min-h-screen bg-brand-cream">
        <header className="bg-white border-b border-brand-olive/10 px-6 py-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="text-brand-olive w-6 h-6" />
              <h1 className="font-serif text-xl font-bold text-brand-olive">Control Panel</h1>
            </div>
            <button 
              onClick={() => { setView('shop'); setUsername(''); setPassword(''); }} 
              className="flex items-center gap-2 text-stone-500 hover:text-brand-olive font-bold text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" /> Save & Exit
            </button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 gap-12">
            {/* Form Section */}
            <section className="bg-white p-8 rounded-[2.5rem] border border-brand-olive/5 shadow-xl shadow-brand-olive/5 space-y-10">
              <div>
                <h3 className="text-xl font-bold text-brand-olive mb-6 flex items-center gap-2">
                  <Tag className="w-5 h-5" /> Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-stone-400 mb-2">Product Name</label>
                    <input 
                      type="text" 
                      value={product.name}
                      onChange={(e) => setProduct({...product, name: e.target.value})}
                      className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-olive transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-stone-400 mb-2">Tagline</label>
                    <input 
                      type="text" 
                      value={product.tagline}
                      onChange={(e) => setProduct({...product, tagline: e.target.value})}
                      className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-olive transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-stone-400 mb-2 flex items-center gap-1">
                      <DollarSign className="w-3 h-3" /> Price
                    </label>
                    <input 
                      type="number" 
                      value={product.price}
                      onChange={(e) => setProduct({...product, price: parseFloat(e.target.value) || 0})}
                      className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-olive transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-stone-400 mb-2">Review Count</label>
                    <input 
                      type="number" 
                      value={product.reviews}
                      onChange={(e) => setProduct({...product, reviews: parseInt(e.target.value) || 0})}
                      className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-olive transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-brand-olive mb-6 flex items-center gap-2">
                  <LinkIcon className="w-5 h-5" /> Navigation
                </h3>
                <label className="block text-xs uppercase tracking-widest font-bold text-stone-400 mb-2">Order Now Redirect URL</label>
                <input 
                  type="text" 
                  value={product.orderLink}
                  onChange={(e) => setProduct({...product, orderLink: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-olive transition-all"
                  placeholder="https://your-checkout-link.com"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-brand-olive mb-6 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" /> Image Gallery (URLs)
                </h3>
                <div className="space-y-4">
                  {product.images.map((url, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <span className="text-xs font-bold text-stone-300">#{i + 1}</span>
                      <input 
                        type="text" 
                        value={url}
                        onChange={(e) => {
                          const newImages = [...product.images];
                          newImages[i] = e.target.value;
                          setProduct({...product, images: newImages});
                        }}
                        className="flex-1 bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-olive transition-all"
                      />
                      <div className="w-12 h-12 rounded-lg bg-stone-100 overflow-hidden border border-stone-200">
                        <img src={url || PLACEHOLDER_IMG} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-brand-olive mb-6">Stats & Nutrition</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {product.stats.map((stat, i) => (
                    <div key={i}>
                      <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">{stat.label}</label>
                      <input 
                        type="text" 
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...product.stats];
                          newStats[i] = { ...newStats[i], value: e.target.value };
                          setProduct({...product, stats: newStats});
                        }}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-brand-olive transition-all text-sm font-bold text-brand-olive"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <button 
              onClick={() => { setView('shop'); setUsername(''); setPassword(''); }} 
              className="w-full bg-brand-olive text-brand-cream py-6 rounded-[2rem] font-bold text-xl flex items-center justify-center gap-3 shadow-2xl shadow-brand-olive/20 hover:scale-[1.01] transition-all"
            >
              <Save className="w-6 h-6" /> Save All Changes
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-olive selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-olive/10 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-brand-olive p-2 rounded-xl">
              <PawPrint className="text-brand-cream w-6 h-6" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-brand-olive">Canine Gourmet</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#" className="hover:text-brand-olive transition-colors underline-offset-4 hover:underline">Shop All</a>
            <a href="#" className="hover:text-brand-olive transition-colors underline-offset-4 hover:underline">Our Secret</a>
            <a href="#" className="hover:text-brand-olive transition-colors underline-offset-4 hover:underline">Subscription</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-brand-olive/5 rounded-full transition-colors relative">
              <ShoppingBag className="w-6 h-6 text-brand-olive" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-olive text-brand-cream text-[10px] flex items-center justify-center rounded-full font-bold">2</span>
            </button>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left: Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="relative group aspect-square rounded-[2rem] overflow-hidden bg-brand-sand/30 ring-1 ring-brand-olive/10 shadow-2xl shadow-brand-olive/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={product.images[currentImage] || PLACEHOLDER_IMG}
                  alt="Product"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={prevImage}
                  className="p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5 text-brand-olive" />
                </button>
                <button 
                  onClick={nextImage}
                  className="p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
                >
                  <ChevronRight className="w-5 h-5 text-brand-olive" />
                </button>
              </div>

              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-6 right-6 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all active:scale-90"
              >
                <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-stone-400'}`} />
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`relative flex-shrink-0 w-24 aspect-square rounded-2xl overflow-hidden ring-2 transition-all hover:ring-brand-olive/50 ${currentImage === i ? 'ring-brand-olive' : 'ring-transparent'}`}
                >
                  <img src={img || PLACEHOLDER_IMG} alt={`Thumb ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  {currentImage === i && <div className="absolute inset-0 bg-brand-olive/10" />}
                </button>
              ))}
            </div>

            {/* Nutrients Grid */}
            <div className="grid grid-cols-4 gap-4 pt-8 border-t border-brand-olive/10">
              {product.stats.map((stat, i) => (
                <div key={i} className="text-center p-4 bg-brand-sand/20 rounded-2xl border border-brand-olive/5">
                  <span className="block text-xl font-serif font-bold text-brand-olive">{stat.value}</span>
                  <span className="block text-[10px] uppercase tracking-wider text-stone-500 font-semibold">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col h-full"
          >
            <div id="product-actions">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex bg-brand-olive/10 px-3 py-1 rounded-full items-center gap-1">
                  <Star className="w-4 h-4 fill-brand-olive text-brand-olive" />
                  <span className="text-sm font-bold text-brand-olive">{product.rating}</span>
                </div>
                <span className="text-sm text-stone-400 font-medium">({product.reviews} Reviews)</span>
                <span className="mx-2 text-stone-300">•</span>
                <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> In Stock
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black text-brand-olive leading-[1.1] mb-2">
                {product.name}
              </h1>
              <p className="text-lg italic text-brand-olive/60 font-serif mb-8">{product.tagline}</p>

              <div className="flex items-end gap-3 mb-8">
                <span className="text-4xl font-serif font-bold text-brand-olive">${product.price}</span>
                <span className="text-lg text-stone-400 line-through mb-1">${(product.price * 1.15).toFixed(2)}</span>
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded mb-1">SAVE 15%</span>
              </div>

              <p className="text-stone-600 leading-relaxed max-w-lg mb-10">
                {product.description}
              </p>

              <div className="space-y-4 mb-4">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-stone-700">
                    <CheckCircle2 className="w-5 h-5 text-brand-olive flex-shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-10 space-y-10">
              {/* Size Selector */}
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-stone-400 mb-4 block">Select Bag Size</label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all border-2 ${
                        selectedSize === size
                          ? 'bg-brand-olive border-brand-olive text-brand-cream shadow-xl shadow-brand-olive/20'
                          : 'bg-white border-brand-olive/10 text-stone-600 hover:border-brand-olive/30'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center bg-white border border-brand-olive/10 rounded-2xl p-1 shadow-sm">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-brand-olive/5 rounded-xl transition-colors text-stone-400 hover:text-brand-olive"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center font-bold text-brand-olive">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-brand-olive/5 rounded-xl transition-colors text-stone-400 hover:text-brand-olive"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                <button 
                  onClick={handleOrderNow}
                  className="flex-1 bg-brand-olive text-brand-cream px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-2xl shadow-brand-olive/20 hover:scale-[1.02] active:scale-95 transition-all text-lg group"
                >
                  <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Order Now
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              </div>

              {/* Delivery Info */}
              <div className="flex items-center gap-6 p-6 bg-brand-sand/20 rounded-3xl border border-brand-olive/5">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-olive" />
                  <span className="text-xs font-bold text-stone-500">Ships in 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-olive" />
                  <span className="text-xs font-bold text-stone-500">30-Day Guarantee</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <section className="mt-32 pt-32 border-t border-brand-olive/10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-brand-olive mb-4">Why Gourmet Matters</h2>
            <p className="text-stone-500">We believe that every dog deserves to eat as well as their owner. Our kitchen prioritizes fresh, whole food sources over cheap fillers.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Leaf, 
                title: "All Natural", 
                desc: "No soy, wheat, or corn. Just real food from trusted family farms." 
              },
              { 
                icon: Zap, 
                title: "Energy Plus", 
                desc: "Complex carbs from sweet potatoes keep your pet energized all day." 
              },
              { 
                icon: ShieldCheck, 
                title: "Vet Trusted", 
                desc: "Formulated by pet nutritionists with thousands of healthy testimonials." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 bg-white rounded-[2.5rem] border border-brand-olive/5 shadow-xl shadow-brand-olive/5 text-center"
              >
                <div className="w-16 h-16 bg-brand-cream rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-brand-olive" />
                </div>
                <h3 className="text-xl font-bold text-brand-olive mb-3">{item.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="mt-32 p-12 lg:p-20 bg-brand-olive rounded-[3rem] text-brand-cream relative overflow-hidden">
          <PawPrint className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-brand-sand text-brand-sand" />)}
            </div>
            <p className="text-3xl lg:text-4xl font-serif italic mb-10 leading-snug">
              "My Golden Retriever, Bella, used to be so picky with her food. Since switching to Canine Gourmet, her coat is shinier and she can't wait for mealtime!"
            </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-white/10 shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80" 
                    alt="Customer" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
              <div className="text-left">
                <p className="font-bold text-lg">Sarah Johnson</p>
                <p className="text-sm text-white/60">Professional Groomer</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <PawPrint className="text-brand-cream w-8 h-8" />
              <span className="font-serif text-2xl font-bold tracking-tight text-white">Canine Gourmet</span>
            </div>
            <p className="max-w-sm mb-8 leading-relaxed">
              We're a family-owned business dedicated to the health and happiness of your pets. Join thousands of happy tails today.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Product Sourcing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => setView('admin-login')} className="hover:text-white transition-colors text-left">FAQs</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 Canine Gourmet Inc. All physical rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
