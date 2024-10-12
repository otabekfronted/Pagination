import { useEffect, useState } from "react";

function Scroll() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(1);
    const [isPending, setIsPending] = useState(false);

    const fetchData = async () => {
        setIsPending(true);
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`
            );
            const result = await response.json();
            setData((prevData) => [...prevData, ...result]);
            setIsPending(false);
        } catch (error) {
            console.error("Ma'lumot olishda xatolik:", error);
            setIsPending(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, limit]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >=
                    document.documentElement.offsetHeight &&
                !isPending
            ) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isPending]);

    return (
        <div>
            <h1>Infinite Scroll</h1>
            {data.map((item) => (
                <div key={item.id}>
                    <h2>{item.title}</h2>
                    <img src={item.url} alt={item.title} />
                </div>
            ))}
            {isPending && <p>Yuklanmoqda...</p>}
        </div>
    );
}

export default Scroll;
