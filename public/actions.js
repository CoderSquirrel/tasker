$("#taskerNav li").click(function (obj) {
    $("#taskerNav").find('*').removeClass('active');
    $(this).addClass('active');
    console.log("print");
})