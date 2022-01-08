// --------------DEFAULT VALUE OF PAGINATION-----------------
const tourPerPage = 5;
const defaultTotalPages = 10;
var currentFilter = 'all'; // default value

function loadTourPerPage(currentPage) {
    const origin = window.location.origin + window.location.pathname;
    const url = origin + '/' + currentFilter  + '/' + currentPage.toString();

    $.get(url, function (data) {
        var template = Handlebars.compile(`
        {{#each homeTour}}
        <tr">
            <td>
                <div class="property-name-col" style="text-align:left;">{{this.propertyName}}</div>
            </td>
            <td>
                <div class="address-col" style="text-align:left;">{{this.propertyAddress}}</div>
            </td>
            <td>
                <div class="seller-col" style="white-space:nowrap;">{{this.sellerName}}</div>
            </td>
            <td>
                <div class="customer-col" style="white-space:nowrap;">{{this.customerName}}</div>
            </td>
            <td>
                <div class="appointment-date-col" style="white-space:nowrap;">{{this.appointmentDate}}</div>
            </td>
            <td>
                {{#ifEquals this.status "pending"}}
                <div class="btn btn-warning status-col" style="text-transform: capitalize; color:black; font-weight: bold; width:100%">{{this.status}}</div>
                {{/ifEquals}}

                {{#ifEquals this.status "accepted"}}
                <div class="btn btn-success status-col" style="text-transform: capitalize; color:white; font-weight: bold; width:100%">{{this.status}}</div>
                {{/ifEquals}}

                {{#ifEquals this.status "denied"}}
                <div class="btn btn-danger status-col" style="text-transform: capitalize; color:white; font-weight: bold; width:100%">{{this.status}}</div>
                {{/ifEquals}}
            </td>
            <td>
            
                <div id="{{@index}}" class="action-col">
                    <button type="button" class="btn btn-primary manage-tour-btn"
                        title="Manage">Manage</button>
                </div>
            </td>
        </tr>
        {{/each}}
        `);

        $('.table-body').html(template({homeTour: data.homeTour}));

        // Update total tours in every get request
        if(data.numOfTour <= tourPerPage)
            $('.paging-wrapper').css("display", "none");
        else {
            $('.paging-wrapper').css("display", "flex");
            $('.paging-wrapper').pagination('updateItems', data.numOfTour);
        }


        // Open manage tour modal event
        $('.manage-tour-btn').on('click', function(e) { 
            e.preventDefault();
            $(this).removeAttr("href");

            $('#manageTourModal').modal('show');
            
            const homeTourIndex = $(this).parent().attr('id');
            $('#manageTourModal .property-name').val(data.homeTour[homeTourIndex].propertyName);
            $('#manageTourModal .property-address').val(data.homeTour[homeTourIndex].propertyAddress);

            $('#manageTourModal .seller-name').val(data.homeTour[homeTourIndex].sellerName);
            $('#manageTourModal .seller-email').val(data.homeTour[homeTourIndex].sellerEmail);
            $('#manageTourModal .seller-phone-number').val(data.homeTour[homeTourIndex].sellerPhoneNumber);

            $('#manageTourModal .customer-name').val(data.homeTour[homeTourIndex].customerName);
            $('#manageTourModal .customer-email').val(data.homeTour[homeTourIndex].customerEmail);
            $('#manageTourModal .customer-phone-number').val(data.homeTour[homeTourIndex].customerPhoneNumber);
            $('#manageTourModal .appointment-date').val(data.homeTour[homeTourIndex].appointmentDate);
            $('#manageTourModal .home-tour-id').val(data.homeTour[homeTourIndex].id);

            if(data.homeTour[homeTourIndex].status == "accepted" || data.homeTour[homeTourIndex].status == "denied")
                $('#manageTourModal .btn').css("display", "none");
            else
                $('#manageTourModal .btn').css("display", "block");

        });
    });
}

function initPagination() {
    $('.paging-wrapper').pagination({
        items: defaultTotalPages,
        itemsOnPage: tourPerPage,
        onInit: loadTourPerPage(1), // Load 1st page when detail page is loaded 
        onPageClick: function (currentPage) {
            $(this).removeAttr("href");
            loadTourPerPage(currentPage);
        }
    });
}

$(window).on('load', function () {
    // Get current filter
    $('.tour-filter-wrapper label').on('click', function() {
        currentFilter = $(this).children().val();
        const currentPage = $('.paging-wrapper').pagination('getCurrentPage');
        $('.paging-wrapper').pagination('drawPage', 1);
        loadTourPerPage(1);
    });
    

    //configure pagination
    initPagination();
});

