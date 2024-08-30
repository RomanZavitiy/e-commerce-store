// Time to add some new function to this projects.
var Product = require('../models/product'),
    mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/OS")
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

var products = [
    new Product({
        imagePath: 'https://m.media-amazon.com/images/I/81wVStoFuiL._AC_SL1500_.jpg',
        title: 'NVIDIA GeForce RTX 3080 10GB GDDR6X',
        description: 'The GeForce RTX 3080 delivers ultra performance that gamers crave, powered by Ampere—NVIDIA\'s 2nd gen RTX architecture. It\'s built with enhanced RT Cores and Tensor Cores, new streaming multiprocessors, and superfast G6X memory for an amazing gaming experience.',
        price: 699
    }),
    new Product({
        imagePath: 'https://m.media-amazon.com/images/I/61vGQNUEsGL._AC_SL1384_.jpg',
        title: 'AMD Ryzen 5 5600X 6-core, 12-Thread CPU',
        description: 'The AMD Ryzen 5 5600X is a high-performance processor with 6 cores and 12 threads. It offers a base clock of 3.7GHz and can boost up to 4.6GHz. With 35MB of combined cache and support for PCIe 4.0, it\'s an excellent choice for gaming and productivity tasks.',
        price: 299
    }),
    new Product({
        imagePath: 'https://m.media-amazon.com/images/I/71Kkm5nIRKL._AC_SL1500_.jpg',
        title: 'Corsair Vengeance RGB Pro 32GB (2x16GB) DDR4 3200MHz',
        description: 'Corsair Vengeance RGB Pro Series DDR4 memory lights up your PC with mesmerizing dynamic multi-zone RGB lighting, while delivering the best in performance. Optimized for peak performance on the latest Intel and AMD DDR4 motherboards.',
        price: 159
    }),
    new Product({
        imagePath: 'https://m.media-amazon.com/images/I/81ObVAqEhKL._AC_SL1500_.jpg',
        title: 'Samsung 970 EVO Plus 1TB NVMe M.2 SSD',
        description: 'The Samsung 970 EVO Plus delivers breakthrough speeds, best-in-class reliability, and a broad range of capacity options. The latest V-NAND, new Phoenix controller, and Intelligent TurboWrite technology enhance high-end gaming and 4K & 3D graphic editing.',
        price: 179
    }),
    new Product({
        imagePath: 'https://m.media-amazon.com/images/I/81+8jtDgQrL._AC_SL1500_.jpg',
        title: 'ASUS ROG Strix X570-E Gaming ATX Motherboard',
        description: 'The ROG Strix X570-E Gaming motherboard delivers the best of AMD X570 with 16 power stages, comprehensive cooling, Wi-Fi 6 (802.11ax), 2.5 Gbps Ethernet, and dual PCIe 4.0 M.2 slots with heatsinks. It\'s the perfect foundation for your high-performance AMD Ryzen build.',
        price: 299
    }),
    new Product({
        imagePath: 'https://m.media-amazon.com/images/I/71QSKpbzlQL._AC_SL1500_.jpg',
        title: 'NZXT H510 Compact ATX Mid-Tower Case',
        description: 'The NZXT H510 is a compact ATX mid-tower case perfect for your build. It features a tempered glass side panel, removable radiator mounting bracket, and a patented cable management system for easy and clean builds. Available in multiple colors to match your style.',
        price: 69
    }),
    new Product({
        imagePath: 'https://m.media-amazon.com/images/I/71paqpw-tUL._AC_SL1500_.jpg',
        title: 'Corsair RM750x 750W 80+ Gold Certified Fully Modular PSU',
        description: 'The Corsair RM750x delivers 750 watts of efficient, high-quality power to your PC. With 80 PLUS Gold certified efficiency and fully modular cables, it\'s optimized for quiet operation and easy installation. Zero RPM fan mode ensures near-silent operation at low loads.',
        price: 129
    }),
    new Product({
        imagePath: 'https://m.media-amazon.com/images/I/91Bk9gZPyVL._AC_SL1500_.jpg',
        title: 'Noctua NH-D15 chromax.black CPU Cooler',
        description: 'The NH-D15 chromax.black is an all-black version of Noctua\'s award-winning flagship model, the NH-D15. This dual tower CPU cooler provides unrivaled cooling performance with exceptional quietness of operation, making it ideal for overclockers and silent enthusiasts.',
        price: 89
    }),
    new Product({
        imagePath: 'https://m.media-amazon.com/images/I/81Ww7VTyYPL._AC_SL1500_.jpg',
        title: 'LG 27GL83A-B 27" 1440p 144Hz IPS Gaming Monitor',
        description: 'The LG 27GL83A-B is a 27-inch QHD (2560 x 1440) IPS display with a 144Hz refresh rate and 1ms response time. It supports NVIDIA G-SYNC for smooth, tear-free gaming. With excellent color accuracy and wide viewing angles, it\'s perfect for both gaming and content creation.',
        price: 379
    }),
    new Product({
        imagePath: 'https://m.media-amazon.com/images/I/71KIY2-cZLL._AC_SL1500_.jpg',
        title: 'Corsair K70 RGB MK.2 Mechanical Gaming Keyboard',
        description: 'The Corsair K70 RGB MK.2 features 100% CHERRY MX mechanical key switches, customizable per-key RGB backlighting, and a durable aluminum frame. With 8MB onboard profile storage and dedicated media keys, it\'s the ultimate gaming keyboard for performance and customization.',
        price: 159
    }),
    new Product({
        imagePath: 'https://m.media-amazon.com/images/I/61zip+bPkCS._AC_SL1500_.jpg',
        title: 'Logitech G Pro X Superlight Wireless Gaming Mouse',
        description: 'The Logitech G Pro X Superlight is an ultra-lightweight wireless gaming mouse weighing less than 63 grams. It features Logitech\'s HERO 25K sensor for pixel-precise accuracy and up to 70 hours of battery life. Perfect for esports and competitive gaming.',
        price: 149
    }),
    new Product({
        imagePath: 'https://m.media-amazon.com/images/I/81ddaHoHgPL._AC_SL1500_.jpg',
        title: 'SteelSeries Arctis Pro Wireless Gaming Headset',
        description: 'The SteelSeries Arctis Pro Wireless delivers premium audio with a classic wireless headset and a transmitter base station. It features lossless 2.4G wireless audio, Bluetooth connectivity, and a ClearCast bidirectional microphone for crystal-clear communication.',
        price: 329
    }),
    new Product({
        imagePath: 'https://m.media-amazon.com/images/I/81Zrdt3J4hL._AC_SL1500_.jpg',
        title: 'Arctic F12 PWM PST 120mm Case Fan (5-Pack)',
        description: 'The Arctic F12 PWM PST fans offer excellent airflow and static pressure, making them ideal for case ventilation or as radiator fans. This 5-pack provides great value for completely outfitting your case. PWM allows for automatic speed adjustment, while PST (PWM Sharing Technology) enables daisy-chaining multiple fans.',
        price: 29
    }),
    new Product({
        imagePath: 'https://m.media-amazon.com/images/I/71M+whbBL8L._AC_SL1500_.jpg',
        title: 'Arctic MX-4 4g Thermal Compound',
        description: 'Arctic MX-4 is a high-performance thermal compound for all CPU coolers. It\'s composed of carbon micro-particles which lead to an extremely high thermal conductivity. It\'s easy to apply, long-lasting, and not electrically conductive, ensuring safe application and optimal heat transfer from your CPU to your cooler.',
        price: 8
    }),
    new Product({
        imagePath: 'https://m.media-amazon.com/images/I/81vbHHpKjTL._AC_SL1500_.jpg',
        title: 'CyberPower CP1500PFCLCD PFC Sinewave UPS System',
        description: 'The CyberPower CP1500PFCLCD is a 1500VA/1000W Uninterruptible Power Supply (UPS) with Pure Sine Wave output. It provides battery backup and surge protection for desktop computers, workstations, networking devices, and home entertainment systems. The LCD screen displays real-time UPS vitals for easy monitoring.',
        price: 219
    })
];

async function seedProducts() {
    try {
        // First, delete all existing products
        await Product.deleteMany({});
        console.log('Existing products deleted');

        // Then, save all new products
        for (let product of products) {
            await product.save();
            console.log(`Product ${product.title} saved`);
        }

        console.log('All products have been saved successfully');
    } catch (error) {
        console.error('Error seeding products:', error);
    } finally {
        mongoose.disconnect();
        console.log('MongoDB disconnected');
    }
}

seedProducts();