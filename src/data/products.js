const initialProducts = () => [
  {
    id: 1,
    name: "Galaxy S21",
    price: 799,
    description: "Powerful performance and pro-grade camera.",
    image: "https://via.placeholder.com/150?text=Galaxy+S21",
  },
  {
    id: 2,
    name: "iPhone 12",
    price: 699,
    description: "Fast, secure and easy to use.",
    image: "https://via.placeholder.com/150?text=iPhone+12",
  },
  {
    id: 3,
    name: "Pixel 5",
    price: 599,
    description: "Clean Android experience and great camera.",
    image: "https://via.placeholder.com/150?text=Pixel+5",
  },
  {
    id: 4,
    name: "OnePlus 9",
    price: 729,
    description: "Speed and smoothness with Hasselblad camera.",
    image: "https://via.placeholder.com/150?text=OnePlus+9",
  },
  {
    id: 5,
    name: "Xiaomi Mi 11",
    price: 749,
    description: "Great specs at an attractive price.",
    image: "https://via.placeholder.com/150?text=Mi+11",
  },
  {
    id: 6,
    name: "Moto G Power",
    price: 199,
    description: "Long battery life for everyday use.",
    image: "https://via.placeholder.com/150?text=Moto+G+Power",
  },
  {
    id: 7,
    name: "Nokia 5.4",
    price: 249,
    description: "Solid build and clean Android.",
    image: "https://via.placeholder.com/150?text=Nokia+5.4",
  },
  {
    id: 8,
    name: "Sony Xperia 10",
    price: 349,
    description: "Sleek design and multimedia focused.",
    image: "https://via.placeholder.com/150?text=Xperia+10",
  },
];

export function loadProducts() {
  try {
    const raw = localStorage.getItem("products");
    if (!raw) {
      const data = initialProducts();
      localStorage.setItem("products", JSON.stringify(data));
      return data;
    }
    return JSON.parse(raw);
  } catch (e) {
    const data = initialProducts();
    localStorage.setItem("products", JSON.stringify(data));
    return data;
  }
}

export function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

export default initialProducts;
