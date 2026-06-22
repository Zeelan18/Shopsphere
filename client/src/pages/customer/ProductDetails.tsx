import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  Star,
} from "lucide-react";

import {
  getProducts,
} from "../../services/productService";

import {
  addReview,
  getReviews,
} from "../../services/reviewService";

export default function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] =
    useState<any>(null);

  const [reviews, setReviews] =
    useState<any[]>([]);

  const [rating, setRating] =
    useState(5);

  const [reviewText, setReviewText] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchProduct =
      async () => {

        try {

          const products =
            await getProducts();

          const found =
            products.find(
              (p: any) =>
                p.id === id
            );

          setProduct(found);

          if (id) {

            const reviewData =
              await getReviews(id);

            setReviews(
              reviewData
            );

          }

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);

        }

      };

    fetchProduct();

  }, [id]);

  const handleReview =
    async () => {

      try {

        if (
          !reviewText.trim()
        ) {
          alert(
            "Please write a review"
          );
          return;
        }

        await addReview(
          product.id,
          rating,
          reviewText
        );

        alert(
          "Review Added Successfully"
        );

        const updatedReviews =
          await getReviews(
            product.id
          );

        setReviews(
          updatedReviews
        );

        setReviewText("");

        setRating(5);

      } catch (error) {

        console.error(error);

        alert(
          "Failed To Add Review"
        );

      }
    };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (
              sum,
              review
            ) =>
              sum +
              review.rating,
            0
          ) /
          reviews.length
        ).toFixed(1)
      : "0";

  if (loading) {
    return (
      <p className="p-6">
        Loading...
      </p>
    );
  }

  if (!product) {
    return (
      <p className="p-6">
        Product Not Found
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Product Section */}

      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={product.image_url}
          alt={product.name}
          className="w-full rounded-xl shadow"
        />

        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-3">
            {product.category}
          </p>

          <div className="flex items-center gap-2 mt-3">

            <Star
              size={20}
              className="text-yellow-500"
              fill="currentColor"
            />

            <span className="font-semibold">
              {averageRating}
            </span>

            <span className="text-gray-500">
              ({reviews.length} Reviews)
            </span>

          </div>

          <p className="text-blue-600 text-4xl font-bold mt-5">
            ₹{product.price}
          </p>

          <p className="mt-6 text-gray-700">
            {product.description}
          </p>

          <div className="mt-6">

            <p>
              <strong>
                Stock:
              </strong>{" "}
              {product.stock}
            </p>

          </div>

        </div>

      </div>

      {/* Review Form */}

      <div className="mt-12 bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          Write A Review
        </h2>

        <select
          value={rating}
          onChange={(e) =>
            setRating(
              Number(
                e.target.value
              )
            )
          }
          className="border rounded-lg px-3 py-2 mb-4"
        >
          <option value={5}>
            5 Stars
          </option>

          <option value={4}>
            4 Stars
          </option>

          <option value={3}>
            3 Stars
          </option>

          <option value={2}>
            2 Stars
          </option>

          <option value={1}>
            1 Star
          </option>

        </select>

        <textarea
          value={reviewText}
          onChange={(e) =>
            setReviewText(
              e.target.value
            )
          }
          placeholder="Write your review..."
          className="w-full border rounded-lg p-3 mb-4"
          rows={4}
        />

        <button
          onClick={handleReview}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit Review
        </button>

      </div>

      {/* Review List */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-4">
          Customer Reviews
        </h2>

        {reviews.length === 0 ? (

          <div className="bg-white p-6 rounded-xl shadow">
            No Reviews Yet
          </div>

        ) : (

          <div className="space-y-4">

            {reviews.map(
              (review) => (

                <div
                  key={review.id}
                  className="bg-white p-5 rounded-xl shadow"
                >

                  <div className="flex items-center gap-2">

                    <Star
                      size={18}
                      className="text-yellow-500"
                      fill="currentColor"
                    />

                    <span>
                      {review.rating}/5
                    </span>

                  </div>

                  <p className="mt-3">
                    {review.review}
                  </p>

                  <p className="text-gray-500 text-sm mt-2">
                    By{" "}
                    {
                      review.users
                        ?.name
                    }
                  </p>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}