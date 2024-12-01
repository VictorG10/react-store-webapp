import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { Tally3 } from "lucide-react";
import axios from "axios";
import BookCard from "./BookCard";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;

    keyword && (url = `https://dummyjson.com/products/search?q=${keyword}`);

    axios
      .get(url)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [currentPage, keyword]);

  const getFilteredProducts = () => {
    let filteredProducts = products;

    selectedCategory &&
      (filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      ));

    minPrice !== undefined &&
      (filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      ));

    maxPrice !== undefined &&
      (filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      ));

    searchQuery &&
      (filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      ));

    switch (filter) {
      case "expensive":
        return filteredProducts.sort((a, b) => b.price - a.price);

      case "cheap":
        return filteredProducts.sort((a, b) => a.price - b.price);

      case "popular":
        return filteredProducts.sort((a, b) => b.rating - a.rating);

      default:
        return filteredProducts;
    }
  };

  const filteredProducts = getFilteredProducts();

  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page: number) => {
    page > 0 && page <= totalPages && setCurrentPage(page);
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    currentPage - 2 < 1 &&
      (endPage = Math.min(totalPages, endPage + (2 - currentPage - 1)));

    currentPage + 2 > 1 &&
      (startPage = Math.min(1, startPage - (2 - totalPages - currentPage)));

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }

    return buttons;
  };

  return (
    <section className="xl:w-[55rem] mr-[5rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center ">
          <div className="relative mb-5 mt-5">
            <button
              className="border px-4 py-2 rounded-full flex items-center"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Tally3 className="mr-2" />

              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toLowerCase() + filter.slice(1)}
            </button>

            {dropdownOpen && (
              <div className="absolute bg-white  border border-gray-300 rounded mt-2 w-full sm:w-40">
                <button
                  onClick={() => setFilter("cheap")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Cheap
                </button>

                <button
                  onClick={() => setFilter("expensive")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Expensive
                </button>

                <button
                  onClick={() => setFilter("popular")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>

        {filteredProducts ? (
          <div>
            {/* Grid Display */}
            <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <BookCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.thumbnail}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border px-4 py-2 mx-2 rounded-full disabled:opacity-50"
                aria-label="Previous Page"
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex flex-wrap justify-center">
                {getPaginationButtons().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`border px-4 py-2 mx-1 rounded-full ${
                      page === currentPage
                        ? "bg-black text-white"
                        : "hover:bg-gray-200"
                    }`}
                    aria-label={`Go to page ${page}`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border px-4 py-2 mx-2 rounded-full disabled:opacity-50"
                aria-label="Next Page"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <h1 className="text-center text-xl">Loading...</h1>
        )}
      </div>
    </section>
  );
};

export default MainContent;
