$(window).on('load', function () {
    $('#manageTourModal .btn').on('click', function(e) {
        const origin = window.location.origin + window.location.pathname;
        const url = origin + '/update-status/' + $('#manageTourModal .home-tour-id').val() + '/' + $(this).val();
        $.ajax({
            type: "POST",
            url: url,
            processData: false,
            contentType: false,
            beforeSend: function(){
                // Show loading spinner
                $('.spanner').addClass('show');
                $('.overlay-spinner').addClass('show');
                $('#manageTourModal').modal('hide');
            },
            success: function(res){
                 // Show success modal
                $('#successModal').modal('show');
                // Hide loading spinner
                $('.spanner').removeClass('show');
                $('.overlay-spinner').removeClass('show');
                $('#successTitle').text('Success');
                $('#successMsg').text('Home tour status updated');

                if(res == 'success') {
                    const currentPage = $('.pagination-wrapper').pagination('getCurrentPage');
                    $('.pagination-wrapper').pagination('drawPage', currentPage);
                    loadTourPerPage(currentPage);
                }
    
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
               if(errorThrown) {
                   console.log(errorThrown);
                   // Show error modal
                    $('#errorModal').modal('show');
                    $('#manageTourModal').modal('hide');
                    $('#errorTitle').text('Error');
                    $('#errorMsg').text('Error: ' + errorThrown);
               }
            }
        });
     });
    
     // Clear form input and close add new property modal when click cancel button
     $("#manageTourModal .cancel-manage-tour-modal-btn").click(function (e) { 
         e.preventDefault();
         $(this).removeAttr("href");
         $('#manageTourModal').modal('hide');
     });
}); 
