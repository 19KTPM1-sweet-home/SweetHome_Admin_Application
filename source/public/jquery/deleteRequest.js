$(window).on('load', () => {
    // // Delete a property according to the delete button clicked
    $(document).on( 'click', '#delete-modal-delete-btn', function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        const propertyId = $(this).attr('class').split(' ')[2];
        $.ajax({
            type: "DELETE",
            url: "https://sweet-home-admin-19ktpm1.herokuapp.com/property/delete/" + propertyId,
            processData: false,
            contentType: false,
            beforeSend: function(){
                // Show loading spinner
                $('.spanner').addClass('show');
                $('.overlay-spinner').addClass('show');
                $('#deleteModal').modal('hide');
            },
            success: function(res){
                // // Reload current table page after delete
                // const currentPage = await $('.paging-wrapper').pagination('getCurrentPage');
                // loadPropertiesPerPage(currentPage);
                // console.log('hello' + currentPage);
                window.location.reload();
                // // Show success modal
                // $('#successModal').modal('show');
                // // Hide loading spinner
                // $('.spanner').removeClass('show');
                // $('.overlay-spinner').removeClass('show');
                // $('#successTitle').text('Success');
                // $('#successMsg').text('Property has deleted in the database');
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
               if(errorThrown) {
                   console.log(errorThrown);
                   // Show error modal
                    $('#errorModal').modal('show');
                    $('#deleteModal').modal('hide');
                    $('#errorTitle').text('Error');
                    $('#errorMsg').text('Error: ' + errorThrown);
               }
            }
        });
    });
});