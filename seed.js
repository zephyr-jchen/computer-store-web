const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedProducts =  [
  {
    id: 100001,
    name: "MacBook Air",
    price: 1499,
    description: "The MacBook Air is the ultimate lightweight laptop for on-the-go productivity. Featuring an M2 chip for blazing-fast performance, a 13.6-inch Retina display, and all-day battery life, it is the perfect choice for students and professionals alike.",
    slug: "macbook-air",
    image: "/assets/images/macbookair.jpg",
    quantity: 10,
    category: "laptop",
  },
  {
    id: 100002,
    name: "MacBook Pro",
    price: 1699,
    description: "The MacBook Pro offers unmatched power and versatility, designed for creators and developers. With its M2 Pro chip, advanced cooling system, and a stunning 14-inch Liquid Retina XDR display, it delivers professional-grade performance for demanding tasks.",
    slug: "macbook-pro",
    image: "/assets/images/macbookpro.jpg",
    quantity: 10,
    category: "laptop",
  },
  {
    id: 100003,
    name: "iMac",
    price: 2199,
    description: "The iMac redefines the desktop experience with its sleek, all-in-one design and vibrant 24-inch Retina 4.5K display. Equipped with the M1 chip, it offers incredible power, graphics, and energy efficiency, making it ideal for creative and professional workflows.",
    slug: "imac",
    image: "/assets/images/imac.jpg",
    quantity: 10,
    category: "desktop",
  },
  {
    id: 100004,
    name: "ThinkPad",
    price: 1566,
    description: "The ThinkPad is a business-class laptop built for reliability and performance. Featuring an Intel Core i7 processor, robust security features, and a spill-resistant keyboard, it is designed to withstand the rigors of daily work and travel.",
    slug: "thinkpad",
    image: "/assets/images/thinkpad.jpg",
    quantity: 10,
    category: "laptop",
  },
  {
    id: 100005,
    name: "Air Pods",
    price: 200,
    description: "The Air Pods provide a seamless wireless audio experience with crystal-clear sound quality and active noise cancellation. With a lightweight, ergonomic design and up to 24 hours of battery life, they are perfect for music, calls, and workouts.",
    slug: "air-pods",
    image: "/assets/images/airpods.jpg",
    quantity: 10,
    category: "accessories",
  },
];


const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(seedProducts);
  console.log("Database seeded!");
  mongoose.connection.close();
};

seedDB();
