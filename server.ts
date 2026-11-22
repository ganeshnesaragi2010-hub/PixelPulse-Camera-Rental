import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const initialData = {
  adminPassword: '2216',
  settings: {
    businessName: 'PixelPulse Camera Rental',
    owner: 'Shivaprasad Nesaragi',
    tagline: 'Capture More. Worry Less.',
    address: '199, Azam Nagar, Belagavi, Karnataka 590010, India',
    callNumber: '+91 89709 22580',
    whatsappNumber: '+91 82777 50280',
    email: 'pixelpulsecamerarental@gmail.com',
    googleMaps: 'https://maps.app.goo.gl/JGrwVkQk2vJTMPRZ7',
    instagram: '@pixelpulse_camera_rental',
    facebook: 'PixelPulse Camera Rental',
  },
  categories: [
    { id: 'cat-1', name: 'Canon Cameras', description: 'Professional Canon DSLR and mirrorless cameras', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80', visible: true },
    { id: 'cat-2', name: 'Nikon Cameras', description: 'High performance Nikon DSLR cameras for all photographers', image: 'https://images.unsplash.com/photo-1502982720700-8fff978d123d?auto=format&fit=crop&w=800&q=80', visible: true },
    { id: 'cat-3', name: 'DSLR Cameras', description: 'All professional DSLR camera bodies', image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=800&q=80', visible: true },
    { id: 'cat-4', name: 'Camera Lenses', description: 'Prime and zoom lenses for sharp details', image: 'https://images.unsplash.com/photo-1617005082133-5c5b44c685c9?auto=format&fit=crop&w=800&q=80', visible: true },
    { id: 'cat-5', name: 'Telephoto Lenses', description: 'Long reach lenses for wildlife and sports', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80', visible: true },
    { id: 'cat-6', name: 'Tripods', description: 'Sturdy tripods for stable cinematic shots', image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02c86?auto=format&fit=crop&w=800&q=80', visible: true },
    { id: 'cat-7', name: 'Ring Lights', description: 'Professional LED ring lights for portraits and reels', image: 'https://images.unsplash.com/photo-1527011046414-478abf8ca8e8?auto=format&fit=crop&w=800&q=80', visible: true },
    { id: 'cat-8', name: 'Photography Accessories', description: 'Bags, batteries, SD cards and lighting gear', image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80', visible: true },
    { id: 'cat-9', name: 'Camera Packages', description: 'Complete photography kits with camera, tripod and lights', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', visible: true },
  ],
  products: [
    {
      id: 'prod-1',
      name: 'Canon 200D',
      brand: 'Canon',
      category: 'Canon Cameras',
      rentalPrice: 749,
      originalPrice: 999,
      rentalPeriod: 'per day',
      stock: 3,
      status: 'Available',
      featured: true,
      newArrival: false,
      visible: true,
      description: 'The Canon EOS 200D is a lightweight, user-friendly DSLR camera featuring a 24.2 MP sensor, Dual Pixel CMOS AF, and Vari-angle touchscreen. Ideal for vloggers, portrait photography, and beginners.',
      specifications: '24.2 MP APS-C CMOS Sensor, Full HD 60fps Video, Vari-Angle Touch Screen LCD, Built-in Wi-Fi & Bluetooth',
      accessories: 'Battery, Charger, 16GB SD Card, Neck Strap, Camera Bag',
      images: [
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1502982720700-8fff978d123d?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'prod-2',
      name: 'Canon 600D',
      brand: 'Canon',
      category: 'Canon Cameras',
      rentalPrice: 649,
      originalPrice: 999,
      rentalPeriod: 'per day',
      stock: 2,
      status: 'Available',
      featured: true,
      newArrival: false,
      visible: true,
      description: 'Reliable entry-level DSLR with 18MP CMOS sensor, Full HD movie mode, and articulating screen. Perfect for students and photography enthusiasts learning manual controls.',
      specifications: '18.0 MP APS-C CMOS Sensor, 3.0-inch Vari-angle Clear View LCD, 3.7 fps continuous shooting',
      accessories: 'Battery, Charger, 16GB SD Card, Neck Strap',
      images: [
        'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'prod-3',
      name: 'Canon 1300D',
      brand: 'Canon',
      category: 'Canon Cameras',
      rentalPrice: 449,
      originalPrice: 749,
      rentalPeriod: 'per day',
      stock: 4,
      status: 'Available',
      featured: false,
      newArrival: false,
      visible: true,
      description: 'An easy-to-use DSLR with built-in Wi-Fi for instant sharing. Great for event photography, college projects, and travel diaries.',
      specifications: '18 MP APS-C Sensor, DIGIC 4+ processor, Wi-Fi and NFC connectivity, Full HD video',
      accessories: 'Battery, Charger, 16GB SD Card, Strap',
      images: [
        'https://images.unsplash.com/photo-1500634230773-f350ed274823?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'prod-4',
      name: 'Canon 1500D',
      brand: 'Canon',
      category: 'Canon Cameras',
      rentalPrice: 599,
      originalPrice: 799,
      rentalPeriod: 'per day',
      stock: 3,
      status: 'Available',
      featured: true,
      newArrival: true,
      visible: true,
      description: 'Step up to DSLR photography with the 24.1 MP EOS 1500D. Create cinematic movies and background blur with ease.',
      specifications: '24.1 MP APS-C sensor, Scene Intelligent Auto, Optical viewfinder with 9-point AF',
      accessories: 'Battery, Charger, 32GB SD Card, Bag',
      images: [
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'prod-5',
      name: 'Canon SX40 HS',
      brand: 'Canon',
      category: 'Canon Cameras',
      rentalPrice: 399,
      originalPrice: 599,
      rentalPeriod: 'per day',
      stock: 2,
      status: 'Available',
      featured: false,
      newArrival: false,
      visible: true,
      description: 'Powerful bridge camera with ultra-zoom lens capability. Excellent for wildlife and travel sightseeing without carrying heavy lens kits.',
      specifications: '35x Optical Zoom, 12.1 MP CMOS sensor, Full HD movies with stereo sound',
      accessories: 'Battery, Charger, Neck strap',
      images: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'prod-6',
      name: 'Nikon D3200',
      brand: 'Nikon',
      category: 'Nikon Cameras',
      rentalPrice: 599,
      originalPrice: 899,
      rentalPeriod: 'per day',
      stock: 3,
      status: 'Available',
      featured: true,
      newArrival: false,
      visible: true,
      description: 'Stunning 24.2 MP high-resolution Nikon DSLR with Guide Mode to help beginners achieve breathtaking results effortlessly.',
      specifications: '24.2 MP DX-format CMOS sensor, Expeed 3 image processor, Full HD 1080p video',
      accessories: 'Battery, Charger, 16GB SD Card, Strap, Bag',
      images: [
        'https://images.unsplash.com/photo-1502982720700-8fff978d123d?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'prod-7',
      name: 'Nikon 70–300mm Lens',
      brand: 'Nikon',
      category: 'Telephoto Lenses',
      rentalPrice: 300,
      originalPrice: 450,
      rentalPeriod: 'per day',
      stock: 2,
      status: 'Available',
      featured: false,
      newArrival: false,
      visible: true,
      description: 'Telephoto zoom lens ideal for sports, wildlife, and distant subjects with crisp clarity.',
      specifications: 'Focal length 70-300mm, AF-P DX VR, lightweight design',
      accessories: 'Lens caps, UV filter',
      images: [
        'https://images.unsplash.com/photo-1617005082133-5c5b44c685c9?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'prod-8',
      name: 'Canon 55–250mm Lens',
      brand: 'Canon',
      category: 'Camera Lenses',
      rentalPrice: 250,
      originalPrice: 350,
      rentalPeriod: 'per day',
      stock: 3,
      status: 'Available',
      featured: false,
      newArrival: false,
      visible: true,
      description: 'Compact and lightweight telephoto zoom lens with Optical Image Stabilizer for sharp handheld shots.',
      specifications: 'EF-S 55-250mm f/4-5.6 IS II, STM focusing mechanism',
      accessories: 'Front and rear caps',
      images: [
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'prod-9',
      name: 'Canon 75–300mm Lens',
      brand: 'Canon',
      category: 'Telephoto Lenses',
      rentalPrice: 300,
      originalPrice: 400,
      rentalPeriod: 'per day',
      stock: 2,
      status: 'Available',
      featured: true,
      newArrival: false,
      visible: true,
      description: 'Affordable telephoto zoom lens covering portrait to telephoto focal lengths.',
      specifications: 'EF 75-300mm f/4-5.6 III, lightweight telephoto',
      accessories: 'Caps included',
      images: [
        'https://images.unsplash.com/photo-1617005082133-5c5b44c685c9?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'prod-10',
      name: 'Tripod + Ring Light',
      brand: 'PixelPulse',
      category: 'Tripods',
      rentalPrice: 200,
      originalPrice: 300,
      rentalPeriod: 'per day',
      stock: 5,
      status: 'Available',
      featured: true,
      newArrival: true,
      visible: true,
      description: 'Essential creator kit featuring an adjustable sturdy tripod and 18-inch LED ring light with phone and camera mounts.',
      specifications: '18-inch Bi-color LED Ring Light, 7ft Heavy duty aluminum tripod, Smartphone and camera holders',
      accessories: 'Power adapter, Carry bag',
      images: [
        'https://images.unsplash.com/photo-1585338107529-13afc5f02c86?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1527011046414-478abf8ca8e8?auto=format&fit=crop&w=800&q=80'
      ]
    }
  ],
  packages: [
    {
      id: 'pkg-1',
      name: 'Photography Starter Kit',
      price: 899,
      originalPrice: 1299,
      description: 'Includes Canon 200D DSLR Camera, 18-55mm lens, Tripod, and Ring Light. Perfect for beginners and portrait shoots.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      includedItems: ['Canon 200D Camera', 'Tripod', 'Ring Light', '16GB SD Card', 'Battery & Charger']
    },
    {
      id: 'pkg-2',
      name: 'Event Creator Bundle',
      price: 1199,
      originalPrice: 1599,
      description: 'Nikon D3200 DSLR with Telephoto Lens (70-300mm) and sturdy tripod for functions, sports, and outdoor videography.',
      image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=800&q=80',
      includedItems: ['Nikon D3200 Body', 'Nikon 70-300mm Lens', 'Tripod', 'Extra Battery', 'Carrying Bag']
    }
  ],
  bookings: [
    {
      id: 'book-1',
      customerName: 'Rahul Patil',
      phone: '+91 98765 43210',
      productName: 'Canon 200D',
      accessories: ['Tripod + Ring Light'],
      startDate: '2026-06-10',
      endDate: '2026-06-12',
      totalPrice: 1898,
      status: 'Confirmed',
      createdAt: '2026-06-01'
    }
  ],
  reviews: [
    {
      id: 'rev-1',
      author: 'Amit Deshmukh',
      rating: 5,
      comment: 'Excellent service by Shivaprasad! The camera was in pristine condition, well sanitized, and battery backup was great for my photoshoot in Belagavi.',
      date: 'May 2026'
    },
    {
      id: 'rev-2',
      author: 'Priya Kulkarni',
      rating: 5,
      comment: 'Rented the Canon 200D for a college event. Very smooth pickup process and very affordable prices compared to other rental shops. Highly recommended!',
      date: 'May 2026'
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'How can I rent a camera from PixelPulse?',
      answer: 'You can browse our catalogue online, select your camera and dates, and send a booking request or direct WhatsApp message to +91 82777 50280.'
    },
    {
      id: 'faq-2',
      question: 'Where is PixelPulse located for pickup?',
      answer: 'We are located at 199, Azam Nagar, Belagavi, Karnataka 590010, India.'
    },
    {
      id: 'faq-3',
      question: 'What documents are required for renting?',
      answer: 'A valid government ID proof (Aadhaar Card / Driving License) and college/work ID are required at the time of equipment pickup.'
    },
    {
      id: 'faq-4',
      question: 'Can I rent lenses and tripods separately?',
      answer: 'Yes! You can rent individual lenses, telephoto zoom lenses, tripods, and ring lights or combine them with any camera.'
    }
  ]
};

function getDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return initialData;
  }
}

function saveDb(data: any) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

const app = express();
app.use(express.json());

// API endpoints
app.get('/api/data', (req, res) => {
  const db = getDb();
  // Don't send adminPassword back
  const { adminPassword, ...safeData } = db;
  res.json(safeData);
});

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  const db = getDb();
  if (password === db.adminPassword) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid admin password. Default is 2216.' });
  }
});

app.post('/api/admin/change-password', (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const db = getDb();
  if (oldPassword !== db.adminPassword) {
    return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
  }
  if (!newPassword || newPassword.length < 3) {
    return res.status(400).json({ success: false, message: 'New password must be at least 3 characters.' });
  }
  db.adminPassword = newPassword;
  saveDb(db);
  res.json({ success: true, message: 'Password updated successfully!' });
});

// Products CRUD
app.post('/api/products', (req, res) => {
  const db = getDb();
  const newProduct = {
    id: 'prod-' + Date.now(),
    ...req.body,
  };
  db.products.push(newProduct);
  saveDb(db);
  res.json({ success: true, product: newProduct });
});

app.put('/api/products/:id', (req, res) => {
  const { id } = req.body;
  const targetId = req.params.id;
  const db = getDb();
  const idx = db.products.findIndex((p: any) => p.id === targetId);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  db.products[idx] = { ...db.products[idx], ...req.body, id: targetId };
  saveDb(db);
  res.json({ success: true, product: db.products[idx] });
});

app.delete('/api/products/:id', (req, res) => {
  const targetId = req.params.id;
  const db = getDb();
  db.products = db.products.filter((p: any) => p.id !== targetId);
  saveDb(db);
  res.json({ success: true });
});

// Categories CRUD
app.post('/api/categories', (req, res) => {
  const db = getDb();
  const newCat = {
    id: 'cat-' + Date.now(),
    ...req.body
  };
  db.categories.push(newCat);
  saveDb(db);
  res.json({ success: true, category: newCat });
});

app.put('/api/categories/:id', (req, res) => {
  const targetId = req.params.id;
  const db = getDb();
  const idx = db.categories.findIndex((c: any) => c.id === targetId);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Category not found' });
  db.categories[idx] = { ...db.categories[idx], ...req.body, id: targetId };
  saveDb(db);
  res.json({ success: true, category: db.categories[idx] });
});

app.delete('/api/categories/:id', (req, res) => {
  const targetId = req.params.id;
  const db = getDb();
  db.categories = db.categories.filter((c: any) => c.id !== targetId);
  saveDb(db);
  res.json({ success: true });
});

// Bookings CRUD
app.post('/api/bookings', (req, res) => {
  const db = getDb();
  const newBooking = {
    id: 'book-' + Date.now(),
    createdAt: new Date().toISOString().split('T')[0],
    status: 'Pending',
    ...req.body
  };
  db.bookings.unshift(newBooking);
  saveDb(db);
  res.json({ success: true, booking: newBooking });
});

app.put('/api/bookings/:id', (req, res) => {
  const targetId = req.params.id;
  const db = getDb();
  const idx = db.bookings.findIndex((b: any) => b.id === targetId);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Booking not found' });
  db.bookings[idx] = { ...db.bookings[idx], ...req.body, id: targetId };
  saveDb(db);
  res.json({ success: true, booking: db.bookings[idx] });
});

app.delete('/api/bookings/:id', (req, res) => {
  const targetId = req.params.id;
  const db = getDb();
  db.bookings = db.bookings.filter((b: any) => b.id !== targetId);
  saveDb(db);
  res.json({ success: true });
});

// Reviews CRUD
app.post('/api/reviews', (req, res) => {
  const db = getDb();
  const newRev = {
    id: 'rev-' + Date.now(),
    date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    ...req.body
  };
  db.reviews.unshift(newRev);
  saveDb(db);
  res.json({ success: true, review: newRev });
});

app.delete('/api/reviews/:id', (req, res) => {
  const targetId = req.params.id;
  const db = getDb();
  db.reviews = db.reviews.filter((r: any) => r.id !== targetId);
  saveDb(db);
  res.json({ success: true });
});

// FAQs CRUD
app.post('/api/faqs', (req, res) => {
  const db = getDb();
  const newFaq = {
    id: 'faq-' + Date.now(),
    ...req.body
  };
  db.faqs.push(newFaq);
  saveDb(db);
  res.json({ success: true, faq: newFaq });
});

app.delete('/api/faqs/:id', (req, res) => {
  const targetId = req.params.id;
  const db = getDb();
  db.faqs = db.faqs.filter((f: any) => f.id !== targetId);
  saveDb(db);
  res.json({ success: true });
});

// Settings update
app.put('/api/settings', (req, res) => {
  const db = getDb();
  db.settings = { ...db.settings, ...req.body };
  saveDb(db);
  res.json({ success: true, settings: db.settings });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PixelPulse server running on http://localhost:${PORT}`);
  });
}

startServer();
