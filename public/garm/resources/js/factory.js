cerberus.factory('CerberusService', function (Session, $q) {
    var cerberusService = {};
    var deferred = $q.defer();
    cerberusService.login = function (credentials) {
        console.log("aqui")
        firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).then(function (response) {
            deferred.resolve(response);
            deferred.promise.then(function (a) {
                Session.create(a.email);
                return {
                    email: a.email
                    , token: a.token
                };
            });
        });
    };
    cerberusService.isAuthenticated = function () {
        return !!Session.userId;
    }
    return cerberusService;
});