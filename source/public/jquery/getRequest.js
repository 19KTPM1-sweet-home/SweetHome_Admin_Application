$(window).on('load', function () {
    // --------------DEFAULT VALUE OF PAGINATION-----------------
    const propertiesPerPage = 5;
    const defaultTotalPages = 10;

    function loadPropertiesPerPage(currentPage) {
        const url = 'http://localhost:3000/property/page/' + currentPage.toString();
        $.get(url, function (data) {
            // parameter: data = {
            //     properties: array of properties
            //     count: total properties in db
            // }

            // Table body temporary container
            const tableBody = $("<tbody></tbody>");
            tableBody.addClass("table-body");

            // Load data to temporary table body
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

                // Finish load all data of a page => render to layout
                if(index == arr.length - 1) {
                    $(".table-body").replaceWith(tableBody);
                }
            });

            // Update total properties in every get request
            $('.paging-wrapper').pagination('updateItems', data.count);
        });
    }

    function initPagination() {
        $('.paging-wrapper').pagination({
            items: defaultTotalPages,
            itemsOnPage: propertiesPerPage,
            onInit: loadPropertiesPerPage(1), // Load 1st page when Home page is loaded 
            onPageClick: function (currentPage) {
                $(this).removeAttr("href");
                loadPropertiesPerPage(currentPage);
            }
        });
    }

    // Configure pagination
    initPagination();

});
