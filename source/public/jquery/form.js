$(window).on('load', () => {
    function isMinLength(value, min) {
        return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`;
    }
    function isRequired(value) {
        return value ? undefined : 'Vui lòng nhập trường này';
    }

    function isMatch(pwd,confirm){
        return pwd==confirm ? undefined : 'Mật khẩu không trùng khớp'
    }
    function enableBtn(formId){
        const submitBtn = $(formId + " button[type=submit]");
        if($(formId).find('.invalid').length===0){
            submitBtn.removeClass('disabled');
        } 

    }
    
    function validate(formId){
        $(formId).find('.required').blur((event)=>{
            const container = $(formId+" .form-group[of="+event.target.name+"]");
            const submitBtn = $(formId + " button[type=submit]");
            const errMsg = isRequired(event.target.value);
            if(errMsg) {
                container.addClass('invalid');
                container.children().last().text(errMsg);
                if(!submitBtn.hasClass('disabled')){
                    submitBtn.addClass('disabled');
                }
            }
            
        })
        $(formId).find('.required').on('input',(event)=>{
            const container = $(formId+" .form-group[of="+event.target.name+"]");
            const submitBtn = $(formId + " button[type=submit]");
            const errMsg = isRequired(event.target.value);
            if(errMsg) {
                container.addClass('invalid');
                container.children().last().text(errMsg);
                if(!submitBtn.hasClass('disabled')){
                    submitBtn.addClass('disabled');
                }
            }
            else{
                container.removeClass('invalid');
                container.children().last().text('');
                enableBtn(formId);
            }
        })
        

        $(formId).find('.min').on('input',(event)=>{
            const container = $(formId+" .form-group[of="+event.target.name+"]");
            const submitBtn = $(formId + " button[type=submit]");
            const errMsg = isMinLength(event.target.value,5);
            if(errMsg) {
                container.addClass('invalid');
                container.children().last().text(errMsg);
                if(!submitBtn.hasClass('disabled')){
                    submitBtn.addClass('disabled');
                }
            }
            else{
                container.removeClass('invalid');
                container.children().last().text('');
                enableBtn(formId);
            }
        })
    }

    function checkMatch(formId,namePassword){
        $(formId).find('.match').on('input',(event)=>{
            const container = $(formId+" .form-group[of="+event.target.name+"]");
            const submitBtn = $(formId + " button[type=submit]");
            const password = $(formId + " input[name="+namePassword+"]").val();
            const errMsg = isMatch(password,event.target.value);
            if(errMsg) {
                container.addClass('invalid');
                container.children().last().text(errMsg);
                if(!submitBtn.hasClass('disabled')){
                    submitBtn.addClass('disabled');
                }
            }
            else{
                container.removeClass('invalid');
                container.children().last().text('');
                enableBtn(formId);
            }
            
        })
    }

    //validate for sign in for
    validate("#sign-in-form");
    
    //validate for add admin account form
    validate("#add-admin-account-form");
    checkMatch("#add-admin-account-form","password");

    // validate for change-password-form
    validate("#change-password-form");
    checkMatch("#change-password-form","newPassword");




    var listAdmin = [];
    var adminIndex = null;
    var request = null;
    function loadAdmin() {
        const origin = window.location.origin + window.location.pathname;
        const url = origin + '/list';

        $.get(url, function (data) {
            listAdmin = data.listAdmin;
            console.log(listAdmin);
            var template = Handlebars.compile(`
            {{#each listAdmin}}
            <tr class="alert">

                <td>{{this.fullname}}</td>
                <td>{{this.username}}</td>
                {{#if this.phoneNumber}}
                <td>{{this.phoneNumber}}</td>
                {{else}}
                <td>Unknown</td>
                {{/if}}

                {{#ifEquals this._id ../currentAdminId}}
                
                {{else}}
                <td>
                    <div id="{{@index}}" class="action-col">
                        <a href='/account/admin/detail/{{this._id}}' class="btn btn-primary detail-btn">Detail</a>
                        {{#ifEquals this.lock "true"}}
                        <button type="button" class="btn btn-warning unlock-user-btn">Unlock</button>
                        {{else}}
                        <button type="button" class="btn btn-danger lock-user-btn">Lock</button>
                        {{/ifEquals}}
                    </div>
                </td>
                {{/ifEquals}}
                
            </tr>
            {{/each}}
            `);

            
            $('.table-body').html(template({currentAdminId: data.currentAdminId, listAdmin: data.listAdmin, accountExist: data.accountExist,
            addAccountSuccess: data.addAccountSuccess}));

            // Open lock modal
            $('.lock-user-btn').on( 'click', function (e) { 
                e.preventDefault();
                $(this).removeAttr("href");
                $('#lockModal').modal('show');
                $('#lockModal .modal-body').html('<p>Do you really want to lock this admin?</p>');
                $('#lockModal .lock-modal-lock-btn').html('Lock');
                adminIndex = $(this).parent().attr('id');
                request = 'lock';
            });

            $('.unlock-user-btn').on( 'click', function (e) { 
                e.preventDefault();
                $(this).removeAttr("href");
                $('#lockModal').modal('show');
                $('#lockModal .modal-body').html('<p>Do you really want to unlock this admin?</p>');
                $('#lockModal .lock-modal-lock-btn').html('Unlock');
                adminIndex = $(this).parent().attr('id');
                request = 'unlock';
            });
        });
    }

    loadAdmin();
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
        const url = origin + '/' + request + '/' + listAdmin[adminIndex]._id.toString();
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
                    var tmp = '<a href="/account/admin/detail/' + listAdmin[adminIndex]._id.toString()  + '" class="btn btn-primary detail-btn">Detail</a>';
                    if(request == 'lock')
                        $('#' + adminIndex.toString()).html(tmp + ' <button type="button" class="btn btn-warning unlock-user-btn">Unlock</button>')
                    else
                        $('#' + adminIndex.toString()).html(tmp + ' <button type="button" class="btn btn-danger lock-user-btn">Lock</button>')

                    // Open lock modal
                    $('.lock-user-btn').on( 'click', function (e) { 
                        e.preventDefault();
                        $(this).removeAttr("href");
                        $('#lockModal').modal('show');
                        $('#lockModal .modal-body').html('<p>Do you really want to lock this admin?</p>');
                        $('#lockModal .lock-modal-lock-btn').html('Lock');
                        adminIndex = $(this).parent().attr('id');
                        request = 'lock';
                    });

                    $('.unlock-user-btn').on( 'click', function (e) { 
                        e.preventDefault();
                        $(this).removeAttr("href");
                        $('#lockModal').modal('show');
                        $('#lockModal .modal-body').html('<p>Do you really want to unlock this admin?</p>');
                        $('#lockModal .lock-modal-lock-btn').html('Unlock');
                        adminIndex = $(this).parent().attr('id');
                        request = 'unlock';
                    });
                    // Show success modal
                   $('#successModal').modal('show');
                   // Hide loading spinner
                   $('.spanner').removeClass('show');
                   $('.overlay-spinner').removeClass('show');
                   $('#successTitle').text('Success');
                   $('#successMsg').text('Admin has been locked');

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
})