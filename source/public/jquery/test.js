$('.paging-wrapper').twbsPagination({
    totalPages: 35,
    visiblePages: 7,
    onPageClick: function (event, page) {
    $('#page-content').text('Page ' + page);
    }
});