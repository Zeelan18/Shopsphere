import { motion } from "framer-motion";

export default function HeroBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white rounded-3xl p-12 mt-6 shadow-xl"
    >
      <h1 className="text-5xl font-bold mb-4">
        Summer Sale 2026
      </h1>

      <p className="text-xl mb-6">
        Up to 70% OFF on Electronics, Fashion & More
      </p>

      <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
        Shop Now
      </button>
    </motion.div>
  );
}