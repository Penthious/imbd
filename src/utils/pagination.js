export default (totalItems, currentPage, pageSize) => {
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage;
    let endPage;
    // Sets the start and end pages
    if (totalPages <= 10) {
        startPage = 1;
        endPage = totalPages;
    } else if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
    } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
    }

    // Gets the start and end index of the array
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = totalItems !== 1 ? Math.min((startIndex + pageSize) - 1, totalItems - 1) : 1;

    // Similar to what _.range does (gets the numbers between a given set)
    const pages = new Array((endPage - startPage) + 1).fill().map((_, index) => startPage + index);

    return {
        totalItems,
        currentPage,
        pageSize,
        totalPages,
        startPage,
        endPage,
        startIndex,
        endIndex,
        pages,
    };
};
