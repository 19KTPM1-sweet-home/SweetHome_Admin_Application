// --------------DEFAULT VALUE OF PAGINATION-----------------
const userPerPage = 5;
const defaultTotalPages = 10;
var listUser = [];
var userIndex = null;
var request = null;

function loadUserPerPage(currentPage) {
    const origin = window.location.origin + window.location.pathname;
    const url = origin + '/' + currentPage.toString();

    $.get(url, function (data) {
        listUser = data.listUser;
        var template = Handlebars.compile(`
        {{#each listUser}}
        <tr class="alert">
        
            <td>{{this.fullName}}</td>
            <td>{{this.email}}</td>
            {{#if this.phoneNumber}}
            <td>{{this.phoneNumber}}</td>
            {{else}}
            <td>Unknown</td>
            {{/if}}

            <td class="pd-0">

                <div id="{{@index}}" class="action-col">
                    <a href='/account/user/detail/{{this.id}}' class="btn btn-primary detail-btn">Detail</a>
                    {{#ifEquals this.lock "true"}}
                    <button type="button" class="btn btn-warning unlock-user-btn">Unlock</button>
                    {{else}}
                    <button type="button" class="btn btn-danger lock-user-btn">Lock</button>
                    {{/ifEquals}}
                </div>
            </td>
        </tr>
        {{/each}}
        `);

        $('.table-body').html(template({listUser: data.listUser}));

        // Update total users in every get request
        if(data.numOfTour <= userPerPage)
            $('.paging-wrapper').css("display", "none");
        else {
            $('.paging-wrapper').css("display", "flex");
            $('.paging-wrapper').pagination('updateItems', data.numOfUser);
        }

        // Open lock modal
        $('.lock-user-btn').on( 'click', function (e) { 
            e.preventDefault();
            $(this).removeAttr("href");
            $('#lockModal').modal('show');
            $('#lockModal .modal-body').html('<p>Do you really want to lock this user?</p>');
            $('#lockModal .lock-modal-lock-btn').html('Lock');
            userIndex = $(this).parent().attr('id');
            request = 'lock';
        });

        $('.unlock-user-btn').on( 'click', function (e) { 
            e.preventDefault();
            $(this).removeAttr("href");
            $('#lockModal').modal('show');
            $('#lockModal .modal-body').html('<p>Do you really want to unlock this user?</p>');
            $('#lockModal .lock-modal-lock-btn').html('Unlock');
            userIndex = $(this).parent().attr('id');
            request = 'unlock';
        });
    });
}

function initPagination() {
    $('.paging-wrapper').pagination({
        items: defaultTotalPages,
        itemsOnPage: userPerPage,
        onInit: loadUserPerPage(1), // Load 1st page when detail page is loaded 
        onPageClick: function (currentPage) {
            $(this).removeAttr("href");
            loadUserPerPage(currentPage);
        }
    });
}

$(window).on('load', function () {
    //configure pagination
    initPagination();

    // ------- LOCK MODAL EVENT -------

    // Close lock modal
    $('.lock-modal-cancel-btn').on( 'click', function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $('#lockModal').modal('hide');
    });

    // Close lock modal
    $('.exit-lock-modal-btn').on( 'click', function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $('#lockModal').modal('hide');
    });

    $('.lock-modal-lock-btn').on( 'click', function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        const origin = window.location.origin + window.location.pathname;
        const url = origin + '/' + request + '/' + listUser[userIndex].id.toString();
        $.ajax({
               type: "POST",
               url: url,
               processData: false,
               contentType: false,
               beforeSend: function(){
                   // Show loading spinner
                   $('.spanner').addClass('show');
                   $('.overlay-spinner').addClass('show');
                   $('#lockModal').modal('hide');
               },
               success: function(res){
                    // Show success modal
                   $('#successModal').modal('show');
                   // Hide loading spinner
                   $('.spanner').removeClass('show');
                   $('.overlay-spinner').removeClass('show');
                   $('#successTitle').text('Success');
                   $('#successMsg').text('User has been locked');

                   if(res == 'success') {
                       const currentPage = $('.paging-wrapper').pagination('getCurrentPage');
                       $('.paging-wrapper').pagination('drawPage', currentPage);
                       loadUserPerPage(currentPage);
                   }

               },
               error: function(XMLHttpRequest, textStatus, errorThrown) {
                  if(errorThrown) {
                      console.log(errorThrown);
                      // Show error modal
                       $('#errorModal').modal('show');
                       $('#lockModal').modal('hide');
                       $('#errorTitle').text('Error');
                       $('#errorMsg').text('Error: ' + errorThrown);
                  }
               }
        });
    });
});

