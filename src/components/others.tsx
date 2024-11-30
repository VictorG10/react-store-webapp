{
  filteredProducts ? (
    <div>
      <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {/* BookCard  */}
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

      <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
        {/* previous  */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="border px-4 py-2 mx-2 rounded-full"
        >
          Previous
        </button>
        {/* 1,2,3,4,5 */}
        <div className="flex flex-wrap justify-center">
          {/* pagination buttons */}
          {getPaginationButtons().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`border px-4 py-2 mx-1 rounded-full ${
                page === currentPage ? "bg-black text-white" : ""
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* next  */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="border px-4 py-2 mx-2 rounded-full"
        >
          Next
        </button>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
