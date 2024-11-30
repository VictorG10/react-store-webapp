import React, { useEffect, useState } from "react";

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}

const TopSellers = () => {
  const [authors, seAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://randomuser.me/api/?results=5");

        const data = await res.json();

        const authorsData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));

        seAuthors(authorsData);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="bg-white p-5 mx-5 mt-[5rem]border w-[23rem] rounded
    "
    >
      <h2 className="text-xl font-bold mb-5">Top Sellers</h2>
    </div>
  );
};

export default TopSellers;
