$(document).ready(() => {

    $('#sign-up-form').validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            pass: {
                minlength: 8,
                required: true
            },
            encryptedPass: {
                minlength: 8,
                equalTo: "#pass"
            }
        },
        success: (elem) => {
            elem
            .text('ok!').addClass('valid');
        }
    });
});