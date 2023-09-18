import React from 'react';
import {Pagination} from "react-bootstrap";

const Pages = ({limit, current_page, count, setPage}) => {
        const pageCount = Math.ceil(count / limit)
        const pages = []
        for (let i = 0; i < pageCount; i++) {
            pages.push(i + 1)
        }
        return (
            <Pagination className={"mt-5 pagination-lg "}>
                {
                    pages.map(page =>
                        <Pagination.Item
                            key={page}
                            active={page === current_page}
                            onClick={() => setPage(page)}
                        >
                            {page}
                        </Pagination.Item>
                    )
                }
            </Pagination>

        )
            ;
    }
;

export default Pages;