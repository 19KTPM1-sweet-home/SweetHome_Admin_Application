// --------------DEFAULT VALUE OF PAGINATION-----------------
const propertiesPerPage = 5;
const defaultTotalPages = 10;
const origin   = window.location.origin;
const url = origin + '/property/page/';
function loadPropertiesPerPage(currentPage) {
    const fulUrl = url + currentPage.toString();
    $.get(fulUrl, function (data) {
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
                    <div id="${property._id}" class="action-col">
                        <button type="button" id="editPropertyBtn" class="mr-4"
                            title="Edit"><i
                                class="fa fa-pencil color-muted"></i> </button>
                        <button type="button" id="deletePropertyBtn" class="close"
                            title="Close"><i
                                class="fa fa-close color-danger"></i></button>
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