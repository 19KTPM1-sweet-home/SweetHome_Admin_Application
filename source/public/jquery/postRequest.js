$(window).on('load', () => {
    // Add property on submitted
    $( "#addForm" ).submit(function( event ) {
        event.preventDefault();
        

        const formData = new FormData($("#addForm")[0]);
        $.ajax({
            type: "POST",
            url: "https://sweet-home-admin-19ktpm1.herokuapp.com/property/add",
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function(){
                 // Show loading spinner
                  $('.spanner').addClass('show');
                  $('.overlay-spinner').addClass('show');
                  $('#addPropertyModal').modal('hide');
            },
            success: function(res){
                 // Show success modal
                  $('#successModal').modal('show');
                  // Hide loading spinner
                  $('.spanner').removeClass('show');
                  $('.overlay-spinner').removeClass('show');
                  $('#successTitle').text('Success');
                  $('#successMsg').text('Property has added to database');
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
               if(errorThrown) {
                   console.log(errorThrown);
                   // Show error modal
                    $('#errorModal').modal('show');
                    $('#addPropertyModal').modal('hide');
                    $('#errorTitle').text('Error');
                    $('#errorMsg').text('Error: ' + errorThrown);
               }
            }
        });

    });


    // Update a property on submitted
    $( "#editForm" ).submit(function( event ) {
        event.preventDefault();
        const propertyId = $('#editForm').attr('class').split(' ')[2];
        const formData = new FormData($("#editForm")[0]);
        $.ajax({
            type: "POST",
            url: "https://sweet-home-admin-19ktpm1.herokuapp.com/property/edit/" + propertyId,
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function(){
                 // Show loading spinner
                  $('.spanner').addClass('show');
                  $('.overlay-spinner').addClass('show');
                  $('#editPropertyModal').modal('hide');
            },
            success: function(res){
                 // Show success modal
                  $('#successModal').modal('show');
                  // Hide loading spinner
                  $('.spanner').removeClass('show');
                  $('.overlay-spinner').removeClass('show');
                  $('#successTitle').text('Success');
                  $('#successMsg').text('Property has updated in the database');
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
               if(errorThrown) {
                   console.log(errorThrown);
                   // Show error modal
                    $('#errorModal').modal('show');
                    $('#editPropertyModal').modal('hide');
                    $('#errorTitle').text('Error');
                    $('#errorMsg').text('Error: ' + errorThrown);
               }
            }
        });

    });
});