$(window).on('load', () => {

    // ------- ADD NEW PROPERTY MODAL EVENT --------

    // add new feature button click event
    $("#add-new-feature-btn").click(function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        const template = `
            <div class="feature-input">
                <div class="d-flex align-item-center">
                    <input type="text" class="form-control" name="propertyFeature" style="width: 70%;" required>
                    <div id="delete-feature-btn">
                        <a href="#" onclick="parentElement.parentElement.parentElement.remove();" title="Close">
                            <i class="fa fa-close color-danger"></i>
                        </a>
                    </div>
                </div>
                <br>
            </div>`;

        const container = $("#featureList");
        container.append(template);
    });

    // Open add new property modal
    $("#addNewPropertyBtn").click(function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $('#addPropertyModal').modal('show');
    });

    // Close add new property modal
    // $("#confirmFormBtn").click(function (e) { 
    //     e.preventDefault();
    //     $(this).removeAttr("href");
    //     $('#addPropertyModal').modal('hide');
    // });

    // Clear form input and close add new property modal when click cancel button
    $("#cancelFormBtn").click(function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $("#addForm")[0].reset();
        $('#addPropertyModal').modal('hide');
    });


    // ------- SUCCESS MODAL EVENT --------
    // Close success modal
    $("#success-modal-btn").click(function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $('#successModal').modal('hide');
    });

    // ------- ERROR MODAL EVENT --------
    // Close error modal
    $("#error-modal-btn").click(function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $('#errorModal').modal('hide');
    });

    // ------- DELETE MODAL EVENT --------
    // Open delete modal
    $(document).on( 'click', '#deletePropertyBtn', function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $('#deleteModal').modal('show');
        $('#delete-modal-delete-btn').addClass($(this).parent().attr('id'));
    });

    // Close delete modal
    $(document).on( 'click', '#delete-modal-cancel-btn', function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $('#deleteModal').modal('hide');
    });

    // Close delete modal
    $(document).on( 'click', '#exitDeleteModalBtn', function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $('#deleteModal').modal('hide');
    });

})