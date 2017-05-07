var DB = "users-info";
valkyrie.controller('valkyrieController', function ($scope) {
    var loading = $scope.loading = false;

    function setLoading(value) {
        loading = $scope.loading = value;
    }
    $scope.$watch('loading', function (newValue, oldValue) {
        console.log(newValue, oldValue)
    });
    $scope.positions = positions;
    $scope.roles = roles;
    $scope.model = {};
    var userModel = {};
    $scope.register = function (model) {
        setLoading(true);
        userModel = model;
        console.log("register");
        firebase.auth().createUserWithEmailAndPassword(model.email, model.password).then(createUserSuccess).catch(createUserError);
    };
    var createUserSuccess = function (response) {
        setLoading(false);
        userModel.position = userModel.position.id;
        userModel.role = userModel.role.id;
        console.log("createUserSuccess");
        firebase.database().ref().child(DB).push(userModel).then(createUserInfoSuccess).catch(createUserInfoError);
    };
    var createUserError = function (response) {
        setLoading(false);
        console.log("createUserError");
        console.log(response);
    };
    var createUserInfoSuccess = function (response) {
        setLoading(false);
        console.log("createUserInfoSuccess");
        $scope.model = {};
        console.log(response, $scope.loading);
    };
    var createUserInfoError = function (response) {
        setLoading(false);
        console.log("createUserInfoError");
        console.log(response, $scope.loading);
    };
});