$(window).on('load', () => {
    // Add property on submitted
    $( "#addForm" ).submit(function( event ) {
        event.preventDefault();
        const formData = new FormData($("#addForm")[0]);
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/property/add",
            data: formData,
            processData: false,
            contentType: false
        });

    });
});