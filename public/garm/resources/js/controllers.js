cerberus.controller('cerberusController', function ($scope, CerberusService) {
    setTimeout(function () {
        console.log(CerberusService.login({
            email: 'saneschio@gmail.com'
            , password: '123456'
        }));
    }, 2500);
})