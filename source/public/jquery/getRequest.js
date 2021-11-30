$(window).on('load', function () {
    loadPropertiesPerPage(1);
    const propertiesPerPage = 5;
    const defaultTotalPages = 10;
    function loadPropertiesPerPage(currentPage) {
        const url = 'http://localhost:3000/properties/page/' + currentPage.toString();
        $.get(url, function (data) {
            var tableBody = $("<tbody></tbody>");
            tableBody.addClass("table-body");
            data.properties.forEach((property, index, arr) => {
                const template = `<tr>
                    <td>
                        <div class="name-col">${property.name}</div>
                    </td>
                    <td>
                        <div class="category-col">${property.category.name}</div>
                    </td>
                    <td>
                        <div class="address-col">${property.address}</div>
                    </td>
                    <td>
                        <div class="seller-col">${property.seller.name}</div>
                    </td>
                    <td>
                        <div class="price-col">${property.price.toLocaleString()}</div>
                    </td>
                    <td>
                        <div class="status-col">${property.status}</div>
                    </td>
                    <td>
                        <div class="action-col">
                            <a href="javascript:void()" class="mr-4" data-toggle="tooltip"
                                data-placement="top" title="Edit"><i
                                    class="fa fa-pencil color-muted"></i> </a>
                            <a href="javascript:void()" data-toggle="tooltip"
                                data-placement="top" title="Close"><i
                                    class="fa fa-close color-danger"></i></a>
                        </div>
                    </td>
                </tr>`;
                tableBody.append(template);
                if(index == arr.length - 1) {
                    $(".table-body").replaceWith(tableBody);
                }
            });
            // var totalPages = data.count;
            // var currentPage = $('.paging-wrapper').twbsPagination('getCurrentPage');
            // // $('.paging-wrapper').empty();
            // // $('.paging-wrapper').removeData("twbs-pagination");
            // // $('.paging-wrapper').unbind("page");
            // $('.paging-wrapper').twbsPagination('destroy');
            // console.log('destroyed')
            // $('.paging-wrapper').twbsPagination({
            //     startPage: currentPage,
            //     totalPages: 16,
            //     visiblePages: propertiesPerPage,
            //     onPageClick: function (event, currentPage) {
            //         loadPropertiesPerPage(currentPage);
            //     }
            // });
            $('.paging-wrapper').pagination('updateItems', data.count);
        });
    }

    function pagination() {
        //totalPage = Math.ceil(totalPage / propertiesPerPage);
        $('.paging-wrapper').pagination({
            items: defaultTotalPages,
            itemsOnPage: propertiesPerPage,
            onPageClick: function (currentPage, event) {
                // $('.paging-wrapper').empty();
                // $('.paging-wrapper').removeData("twbs-pagination");
                // $('.paging-wrapper').unbind("page");
                loadPropertiesPerPage(currentPage);
            }
        });
    }

    pagination();
});
