$(window).on('load', () => {

    // ------- ADD NEW ADMIN ACCOUNT MODAL EVENT --------
    $("#add-admin-account-btn").click((e) => {
        e.preventDefault();
        $('#add-admin-account-modal').modal('show');
    })
    $("#add-admin-account-modal .close").click((e) => {
        e.preventDefault();
        $('#add-admin-account-modal').modal('hide');
    })
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

    // ------- EDIT A PROPERTY MODAL EVENT --------

    // add new feature button click event
    $("#editPropertyModal #edit-add-new-feature-btn").click(function (e) { 
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

        const container = $("#editFeatureList");
        container.append(template);
    });

    // Open edit property modal
    $(document).on( 'click', '#editPropertyBtn', function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $('#editPropertyModal').modal('show');
        $('#editForm').addClass($(this).parent().attr('id'));
        const origin   = window.location.origin;
        const url = origin + '/property/'+ $('#editForm').attr('class').split(' ')[2];
        $.get(url, function (property) {
           $('#editForm #editPropertyName').val(property.name);
           $('#editForm #editCategory').val(property.category.name);
           $('#editForm #editAddress').val(property.address);
           $('#editForm #editDescription').val(property.description);
           $('#editForm #editPrice').val(property.price);
           $('#editForm #editRate').val(property.rate);
           $('#editForm #editStatus').val(property.status);
            console.log(property.feature)
           $('#editForm #feature-1').val(property.feature[0]);
           for(let i = 1; i < property.feature.length; i++) {
               const featureId = 'feature-' + (i + 1).toString();
               const template = `
                   <div class="feature-input">
                       <div class="d-flex align-item-center">
                           <input id="${featureId}" type="text" class="form-control" name="propertyFeature" style="width: 70%;" required>
                           <div id="delete-feature-btn">
                               <a href="#" onclick="parentElement.parentElement.parentElement.remove();" title="Close">
                                   <i class="fa fa-close color-danger"></i>
                               </a>
                           </div>
                       </div>
                       <br>
                   </div>`;

               const container = $("#editForm #editFeatureList");
               container.append(template);
               const selector = '#editForm ' + ' #' + featureId

               $(selector).val(property.feature[i]);
           }
           $('#editForm #editSellerName').val(property.seller.name);
           $('#editForm #editSellerEmail').val(property.seller.email);
           if(property.seller.phoneNumber)
               $('#editForm #editSellerPhoneNumber').val(property.seller.phoneNumber); 
        });
    });

    // Clear form input and close add new property modal when click cancel button
    $("#editPropertyModal #cancelEditFormBtn").click(function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $('#editForm').removeClass($('#editForm')[0].classList[2]);
        $('.feature-input').empty();
        $('#editPropertyModal').modal('hide');
    });

    // Clear form input and close add new property modal when click cancel button
    $("#editPropertyModal #editCancelFormBtn").click(function (e) { 
        e.preventDefault();
        $(this).removeAttr("href");
        $('#editForm').removeClass($('#editForm')[0].classList[2]);
        $('.feature-input').empty();
        $('#editPropertyModal').modal('hide');
    });
})