$(window).on('load', () => {
    // // Delete a property according to the delete button clicked
    $(document).on( 'click', '#delete-modal-delete-btn', function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        const origin   = window.location.origin;
        const url = origin + '/property';
        const propertyId = $(this).attr('class').split(' ')[2];
        $.ajax({
            type: "DELETE",
            url: url+"/delete/" + propertyId,
            processData: false,
            contentType: false,
            beforeSend: function(){
                // Show loading spinner
                $('.spanner').addClass('show');
                $('.overlay-spinner').addClass('show');
                $('#deleteModal').modal('hide');
            },
            success: function(res){
                 // Show success modal
                $('#successModal').modal('show');
                // Hide loading spinner
                $('.spanner').removeClass('show');
                $('.overlay-spinner').removeClass('show');
                $('#successTitle').text('Success');
                $('#successMsg').text('Property has deleted in the database');

                $('.paging-wrapper').pagination('drawPage', 1);
                loadPropertiesPerPage(1);
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