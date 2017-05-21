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
        firebase.auth().createUserWithEmailAndPassword(model.email, model.password).then( $scope.createUserSuccess).catch( $scope.createUserError);
    };
     $scope.createUserSuccess = function (response) {
        setLoading(false);
        userModel.position = userModel.position.id;
        userModel.role = userModel.role.id;
        console.log("createUserSuccess");
        firebase.database().ref().child(DB).push(userModel).then( $scope.createUserInfoSuccess).catch( $scope.createUserInfoError);
    };
     $scope.createUserError = function (response) {
        setLoading(false);
        console.log("createUserError");
        console.log(response);
    };
     $scope.createUserInfoSuccess = function (response) {
        setLoading(false);
        console.log("createUserInfoSuccess");
        $scope.model = {};
        console.log(response, $scope.loading);
    };
 $scope.createUserInfoError = function (response) {
        setLoading(false);
        console.log("createUserInfoError");
        console.log(response, $scope.loading);
    };
});