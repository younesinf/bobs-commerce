import { Link } from "react-router-dom";

const Pagination = ({ totalPages, currentPage, link }) => {
    const pages = [...Array(totalPages).keys()].map(num => num + 1);
    return (
        <div className="flexCenter gap-2">
            {pages.map(page => (
                <Link  key={page} to={`${link}/?page=${page}`}>
                    <div  className={`${page === parseInt(currentPage) ?
                        'bg-[#00674F] w-9 h-9 text-white flexCenter rounded-full' :
                        'bg-[#058743] w-9 h-9 text-white flexCenter rounded-full'}`}>
                        {page}
                    </div>
                </Link>
            ))}
        </div>


    )
}

export default Pagination