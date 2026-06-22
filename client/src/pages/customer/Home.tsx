import { useEffect, useState } from "react";

import HeroBanner from "../../components/common/HeroBanner";
import ProductCard from "../../components/product/ProductCard";

import { getProducts } from "../../services/productService";

import type { Product } from "../../types/product";

export default function Home() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("default");

  const [currentPage, setCurrentPage] =
    useState(1);

  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data =
          await getProducts();

        setProducts(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    category,
    sortBy,
  ]);

  const categories = [
    "All",
    ...new Set(
      products.map(
        (product) =>
          product.category
      )
    ),
  ];

  const filteredProducts =
    [...products]
      .filter(
        (product) => {

          const matchesSearch =
            product.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            product.category
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesCategory =
            category === "All"
              ? true
              : product.category ===
                category;

          return (
            matchesSearch &&
            matchesCategory
          );
        }
      )
      .sort((a, b) => {

        switch (sortBy) {

          case "priceLow":
            return (
              a.price - b.price
            );

          case "priceHigh":
            return (
              b.price - a.price
            );

          case "rating":
            return (
              (b.rating || 0) -
              (a.rating || 0)
            );

          case "newest":
            return (
              new Date(
                b.created_at || ""
              ).getTime() -
              new Date(
                a.created_at || ""
              ).getTime()
            );

          default:
            return 0;
        }
      });

  const indexOfLastProduct =
    currentPage *
    productsPerPage;

  const indexOfFirstProduct =
    indexOfLastProduct -
    productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

  const totalPages =
    Math.ceil(
      filteredProducts.length /
      productsPerPage
    );

  return (
    <div>

      <div className="max-w-7xl mx-auto px-4">

        <HeroBanner />

        {/* Search Filter Sort */}

        <div className="mt-10 mb-8 flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="border border-gray-300 rounded-xl px-4 py-3"
          >
            {categories.map(
              (cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              )
            )}
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }
            className="border border-gray-300 rounded-xl px-4 py-3"
          >
            <option value="default">
              Sort By
            </option>

            <option value="priceLow">
              Price Low → High
            </option>

            <option value="priceHigh">
              Price High → Low
            </option>

            <option value="rating">
              Highest Rated
            </option>

            <option value="newest">
              Newest First
            </option>
          </select>

        </div>

        {/* Heading */}

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-3xl font-bold">
            Trending Products
          </h2>

          <span className="text-gray-500">
            {filteredProducts.length}
            {" "}
            Products
          </span>

        </div>

        {/* Products */}

        {loading ? (

          <div className="text-center py-20">

            <p className="text-lg text-gray-500">
              Loading Products...
            </p>

          </div>

        ) : filteredProducts.length === 0 ? (

          <div className="bg-white rounded-2xl shadow p-10 text-center">

            <h3 className="text-2xl font-bold mb-2">
              No Products Found
            </h3>

            <p className="text-gray-500">
              Try searching with a different keyword.
            </p>

          </div>

        ) : (

          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {currentProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                )
              )}

            </div>

            {/* Pagination */}

            {totalPages > 1 && (

              <div className="flex justify-center items-center gap-4 mt-10">

                <button
                  disabled={
                    currentPage === 1
                  }
                  onClick={() =>
                    setCurrentPage(
                      currentPage - 1
                    )
                  }
                  className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="font-medium">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      currentPage + 1
                    )
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                >
                  Next
                </button>

              </div>

            )}

          </>

        )}

      </div>

    </div>
  );
}