import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { NavLink } from "react-router-dom";

function Home() {
    const [currentPage, setCurrentPage] = useState(1); // Changed to 1 for proper pagination
    const [limit, setLimit] = useState(8);
    const [total] = useState(100); // Assuming you want to show 100 items
    const [url, setUrl] = useState(
        `https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${limit}`
    );

    const { data, isPending, error } = useFetch(url);

    useEffect(() => {
        setUrl(
            `https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${limit}`
        );
    }, [currentPage, limit]);

    function handleChangePagination(e) {
        setCurrentPage(e);
    }

    return (
        <div className="container bg-white shadow rounded-[20px] p-[82px]">
            <h1 className="text-3xl font-bold text-center text-gray-800 mt-4">
                Food Blog
            </h1>
            <p className="text-[#7D7878] text-center mt-2 mb-6">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit{" "}
                <br />
                aut fugit, sed quia consequuntur.
            </p>

            {isPending && <div className="loader"></div>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {data && (
                <div className="pagination">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {data.map((value, index) => (
                            <div key={index}>
                                <img
                                    className="w-[255px] rounded-2xl"
                                    src={value.url}
                                    alt={value.title} // Added alt attribute for accessibility
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex justify-center mt-8">
                <ResponsivePagination
                    current={currentPage}
                    total={total}
                    onPageChange={handleChangePagination}
                />
            </div>
            <div className="mt-8 ">
                <NavLink
                    className="border-red-500 border-2 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200"
                    to="./Scroll"
                >
                    Scroll Pagination
                </NavLink>
            </div>
        </div>
    );
}

export default Home;
