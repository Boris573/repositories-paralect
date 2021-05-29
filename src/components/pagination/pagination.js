import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as LeftArrow } from '../../img/left-arrow.svg'
import { ReactComponent as RightArrow } from '../../img/right-arrow.svg'

import './pagination.css'

const Pagination = ({ currentPage, firstIndex, lastIndex, totalRepos,
    paginate, nextPage, prevPage }) => {
    const [pagesNumbers, setPagesNumbers] = useState(0)
    const [showPagesNumber, setShowPagesNumber] = useState([])

    useEffect(() => {
        if (totalRepos > 0) {
            setPagesNumbers(Math.ceil(totalRepos / 4))
            if (pagesNumbers === 1) setShowPagesNumber([1])
            else if (pagesNumbers < 5) setShowPagesNumber(() => {
                const newArr = []
                for (let i = 1; i <= pagesNumbers; i++) newArr.push(i)
                return newArr 
            })
            else if (currentPage === 1 || currentPage === 2) setShowPagesNumber([1, 2, 3, '...', pagesNumbers])
            else if (currentPage === pagesNumbers || currentPage === pagesNumbers - 1) setShowPagesNumber([1, '...', pagesNumbers - 2, pagesNumbers - 1, pagesNumbers])
            else setShowPagesNumber(() => {
                return [1, '...', currentPage-1, currentPage, currentPage+1, '...', pagesNumbers]})
        }
    }, [totalRepos, currentPage, pagesNumbers])

    if (totalRepos === 0) return (<></>)

    const reposOnPage = lastIndex > 1 ? `${firstIndex + 1} - ${lastIndex}` :  1

    return (
        <div className="pages-choice">
            <div className="repos-amount-on-page">
                {reposOnPage} of {totalRepos} items
                </div>
            <nav className="pagination-wrapper">
                <ul className="pagination">
                    <li className="page-item">
                        <Link
                            to="#"
                            className="page-arrow"
                            aria-label="Previous"
                            onClick={prevPage}>
                            <LeftArrow className="page-arrow-icon" />
                        </Link>
                    </li>
                    {
                        showPagesNumber.map((num, i) => {
                            const clazz = num === currentPage ? "active " : ""
                            if (showPagesNumber[i+1] === '...') {
                                return (<>
                                    <li
                                        key={"li" + num}
                                        className={clazz + `page-item li${i}`}>
                                        <Link
                                            to="#"
                                            className={clazz + "page-link"}
                                            onClick={() => paginate(num)}>
                                            {num}
                                        </Link>
                                    </li>

                                    <div className="page-link-space" key={"o"+i}>...</div>
                                    </>
                                )
                            } else if (num !== '...') {
                                return (
                                    <li
                                        key={"li" + num}
                                        className={clazz + `page-item li${i}`}>
                                        <Link
                                            to="#"
                                            className={clazz + "page-link"}
                                            onClick={() => paginate(num)}>
                                            {num}
                                        </Link>
                                    </li>
                                )
                            }
                        })
                    }
                    <li className="page-item">
                        <Link
                            to="#"
                            className="page-arrow"
                            aria-label="Next"
                            onClick={() => nextPage(pagesNumbers)}>
                            <RightArrow className="page-arrow-icon" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination