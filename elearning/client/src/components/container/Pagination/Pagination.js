import React from 'react';
import classes from "./Pagination.module.css";

const Pagination = ({ setCurrentPage, postPerpage, totalPosts, paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postPerpage); i++){
        pageNumbers.push(i);
    }

   
    
    return (

        <nav className={classes.Pagination}>
            <ul>
                {pageNumbers.map(number => (
                    <li key={number} className={setCurrentPage == number ? 'Active' : ''}>
                        <a onClick={() => paginate(number)}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
)   ;
};
export default Pagination;