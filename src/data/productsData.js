export const productsData = [
  {
    id: 1,
    name: "Aether Sound Pro",
    tagline: "Immersive Hybrid ANC Wireless Headphones",
    category: "Electronics",
    price: 249.99,
    rating: 4.8,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    description: "Designed for reference-grade acoustics. The Aether Sound Pro features state-of-the-art hybrid Active Noise Cancellation, custom 40mm dynamic drivers, and a luxurious memory foam chassis wrapped in breathable vegan leather. Experience up to 45 hours of pure audio bliss with ultra-low latency wireless streaming.",
    specs: {
      "Driver Unit": "40mm Dynamic, Neodymium Magnets",
      "Frequency Response": "10Hz - 40kHz",
      "Connectivity": "Bluetooth 5.2 / 3.5mm AUX",
      "Battery Life": "45 Hours (ANC Off) / 32 Hours (ANC On)",
      "Charging": "USB-C QuickCharge (10 min = 5 hours)",
      "Weight": "260g"
    },
    reviews: [
      { id: 1, author: "Marcus Vance", rating: 5, comment: "The soundstage is unbelievably wide, and the active noise cancellation blocks out absolute city chaos. Best purchase this year.", date: "2 days ago" },
      { id: 2, author: "Elena Rostova", rating: 4, comment: "Extremely comfortable for long hours. Mid-tones are perfectly balanced, though bass is punchy without being muddy.", date: "1 week ago" }
    ],
    inStock: 12
  },
  {
    id: 2,
    name: "NovaLight Beam",
    tagline: "Smart Minimalist RGB Aura Desk Lamp",
    category: "Home & Living",
    price: 89.99,
    rating: 4.6,
    reviewsCount: 89,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    description: "Re-envision your workspace illumination. Featuring custom aura glows, 16 million colors, and voice command integrations, the NovaLight Beam projects diffuse, flicker-free light to reduce eye strain. Seamlessly control color temperatures, brightness levels, and dynamic ambient schedules via the touch-sensitive glass base or app.",
    specs: {
      "Light Source": "Vibrant Flicker-Free LED Matrix",
      "Max Brightness": "800 Lumens",
      "Color Temp Range": "1800K - 6500K (Warm to Cool)",
      "Interface": "Capacitive Glass Touch controls",
      "Power Rating": "15W",
      "Dimensions": "38cm x 12cm Base"
    },
    reviews: [
      { id: 1, author: "Sarah Jenkins", rating: 5, comment: "It matches my workspace theme flawlessly! The soft ambient back-glow is superb for late-night coding.", date: "3 days ago" },
      { id: 2, author: "Tariq M.", rating: 4, comment: "Beautiful design, solid heavy base. App control is fast, but I wish the power cord was a bit longer.", date: "2 weeks ago" }
    ],
    inStock: 8
  },
  {
    id: 3,
    name: "CoreScribe 75",
    tagline: "Custom Gasket-Mounted Mechanical Keyboard",
    category: "Electronics",
    price: 179.99,
    rating: 4.9,
    reviewsCount: 204,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    description: "Every keystroke, refined. The CoreScribe 75 boasts a premium gasket-mounted design for a bouncy, acoustically satisfying typing sound. Outfitted with hot-swappable linear cream switches, double-shot PBT keycaps, a rotary media knob, and programmable per-key RGB backlighting encased in an anodized CNC aluminum frame.",
    specs: {
      "Layout": "75% Form Factor (82 Keys)",
      "Switches": "Pre-lubed Creamy Linear Switches",
      "Keycaps": "Double-shot Cherry Profile PBT",
      "Mounting Style": "Poron Gasket Mounted",
      "Hotswap": "3-pin & 5-pin MX compatible",
      "Connectivity": "Tri-Mode (2.4GHz / Bluetooth 5.1 / Wired USB-C)"
    },
    reviews: [
      { id: 1, author: "David K.", rating: 5, comment: "The typing sounds are like rain falling. Smooth linear switches and solid weight. Worth every penny.", date: "5 days ago" },
      { id: 2, author: "Chloe Zhang", rating: 5, comment: "Phenomenal build quality! Extremely heavy aluminum case, doesn't budge on the desk.", date: "1 month ago" }
    ],
    inStock: 5
  },
  {
    id: 4,
    name: "HydroVessel Pro",
    tagline: "Vacuum Insulated Smart Hydration Flask",
    category: "Fitness",
    price: 49.99,
    rating: 4.5,
    reviewsCount: 76,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    description: "Keep your drinks icy cold or perfectly piping hot while keeping track of your hydration goals. The HydroVessel Pro has a medical-grade double-walled vacuum insulation layer, a leakproof magnetic lid, and an integrated OLED cap that monitors water consumption, alerts you to drink, and tracks liquid temperature.",
    specs: {
      "Volume": "700 ml (24 oz)",
      "Material": "18/8 Pro-Grade Stainless Steel",
      "Cold Insulation": "Up to 24 Hours",
      "Hot Insulation": "Up to 12 Hours",
      "Cap Battery": "Rechargeable via magnetic dock (lasts 30 days)",
      "Leak Rating": "100% Hermetic Seal"
    },
    reviews: [
      { id: 1, author: "Sam L.", rating: 4, comment: "Superb insulation. Left it in my hot car for 6 hours, water was still ice cold! Cap alerts are useful.", date: "Yesterday" },
      { id: 2, author: "Nicole P.", rating: 5, comment: "Love the matte pastel finish and the magnetic cap that snaps out of your face when drinking.", date: "3 weeks ago" }
    ],
    inStock: 25
  },
  {
    id: 5,
    name: "Apex Peak Pack",
    tagline: "Minimalist Modular Travel & Tech Backpack",
    category: "Apparel",
    price: 159.99,
    rating: 4.7,
    reviewsCount: 112,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    description: "Master the daily commute or global adventures. Built from eco-certified ballistic nylon and weatherproof technical coatings, the Apex Peak features a 180-degree lay-flat tech compartment, customizable modular dividers, quick-access security pockets, and ergonomic load-lifter straps that contour to your posture.",
    specs: {
      "Capacity": "24L Expandable to 30L",
      "Fabric": "840D Ballistic Cordura Nylon",
      "Hardware": "YKK AquaGuard Zippers / Fidlock Magnetic Buckles",
      "Laptop Pocket": "Suspended sleeve up to 16\" MacBook Pro",
      "Water Resistance": "IPX4 Spray Proof",
      "Weight": "1.1 kg"
    },
    reviews: [
      { id: 1, author: "Arthur Pendelton", rating: 5, comment: "I travel every single week. This backpack fits perfectly under airline seats and holds all my camera gear safely.", date: "1 week ago" },
      { id: 2, author: "Jessica W.", rating: 4, comment: "Extremely comfortable backing foam. Magnetic buckles feel highly tactile and futuristic.", date: "2 weeks ago" }
    ],
    inStock: 6
  },
  {
    id: 6,
    name: "Chronos Edge Active",
    tagline: "Elegantly Crafted Titanium Smartwatch",
    category: "Electronics",
    price: 320.00,
    rating: 4.8,
    reviewsCount: 154,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    description: "The ultimate harmony of classic horology and modern performance metrics. Encased in grade-5 sandblasted titanium with a polished sapphire crystal face, the Chronos Edge Active tracks advanced cardiovascular metrics, blood oxygenation, sleep efficiency, and 120+ workout modes. Up to 12 days of battery life per charge.",
    specs: {
      "Chassis": "Sandblasted Grade 5 Titanium",
      "Glass Type": "Scratch-Resistant Sapphire Crystal",
      "Display": "1.43\" AMOLED, Always-On, 1000 Nits",
      "Water Resistance": "5ATM (Up to 50 meters)",
      "Sensors": "Optical Heart Rate, SpO2, Accelerometer, Barometer",
      "Battery": "450mAh (Up to 12 days normal use)"
    },
    reviews: [
      { id: 1, author: "Liam Vance", rating: 5, comment: "It looks like a high-end luxury watch but works better than standard smartwatches. Screen is exceptionally crisp in bright sunlight.", date: "4 days ago" },
      { id: 2, author: "Sophia Lopez", rating: 4, comment: "Heart rate monitoring matches my chest strap perfectly. Highly durable - bumped it into walls and not a single scratch.", date: "1 month ago" }
    ],
    inStock: 4
  },
  {
    id: 7,
    name: "ZenFlow Cork Mat",
    tagline: "All-Natural Organic Grip Yoga Mat",
    category: "Fitness",
    price: 65.00,
    rating: 4.7,
    reviewsCount: 63,
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=800&q=80",
    description: "Connect to your practice, naturally. The ZenFlow Cork Yoga Mat offers superior wet-or-dry grip, utilizing organic cork bark fused with an eco-rubber backing. Laser-etched alignment lines guide your posture quietly, while the naturally antimicrobial properties of cork prevent odors and keep your sessions pristine.",
    specs: {
      "Material": "100% Organic Mediterranean Cork / Natural Tree Rubber",
      "Thickness": "4.5mm high-impact dampening",
      "Dimensions": "183cm x 66cm (Extra Wide)",
      "Eco Rating": "Biodegradable, Zero Toxic Adhesives",
      "Grip Factor": "Increases grip under sweat/humidity",
      "Weight": "2.4 kg"
    },
    reviews: [
      { id: 1, author: "Rachel Miller", rating: 5, comment: "I do hot yoga and this mat gets MORE grippy as you sweat! No sliding around anymore, plus it smells like real wood.", date: "6 days ago" },
      { id: 2, author: "Andre G.", rating: 4, comment: "Stunning laser alignment graphics. Slightly heavier than foam mats, but it lies perfectly flat instantly.", date: "2 months ago" }
    ],
    inStock: 15
  },
  {
    id: 8,
    name: "Barista Craft Espresso",
    tagline: "Compact Precision Extraction Espresso Station",
    category: "Home & Living",
    price: 399.99,
    rating: 4.9,
    reviewsCount: 95,
    image: "https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&w=800&q=80",
    description: "Cafe-quality extractions, engineered for your kitchen. The Barista Craft utilizes PID temperature stability and a powerful 15-bar Italian pump to pull rich, thick espresso shots. Equipped with a professional steam wand for microfoam milk texturing, a heated cup warming tray, and a precise pressure dial.",
    specs: {
      "Pump Pressure": "15-Bar Italian Electro-Pump",
      "Heating Element": "PID Thermo-Coil (Fast 30s heatup)",
      "Steam Wand": "Commercial 360-degree jointed wand",
      "Water Tank": "1.8L Removable with carbon filter",
      "Body Style": "Brushed SUS304 Stainless Steel",
      "Power Rating": "1450 Watts"
    },
    reviews: [
      { id: 1, author: "Chef Anthony", rating: 5, comment: "Unbelievable pressure control and steam output. Creates beautiful silky latte microfoam easily.", date: "10 days ago" },
      { id: 2, author: "Karen Davis", rating: 5, comment: "Compact and powerful. Simple to clean. My morning routine is completely transformed.", date: "1 month ago" }
    ],
    inStock: 3
  }
];
