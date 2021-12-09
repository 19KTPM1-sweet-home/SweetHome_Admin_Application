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
})