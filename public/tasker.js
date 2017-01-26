var tasker = angular.module('tasker', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);
tasker.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'pages/home.html'
        , controller: 'mainController'
    }).when('/settings', {
        templateUrl: 'pages/config.html'
        , controller: 'configuracoesController'
    }).when('/tasks', {
        templateUrl: 'pages/tasks.html'
        , controller: 'tasksController'
    }).otherwise({
        redirectTo: '/'
    });
});
tasker.directive('configUsuarios', function () {
    return {
        restrict: 'E'
        , replace: 'true'
        , templateUrl: 'pages/config/configUser.html'
    };
});
tasker.controller('mainController', function ($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});
tasker.controller('configuracoesController', function ($scope, $uibModal, $log) {
    $scope.novoUsuario = function () {
        var modalInstance = $uibModal.open({
            animation: true
            , templateUrl: 'pages/config/newUserModal.html'
            , controller: 'ModalInstanceCtrl'
            , size: 'lg'
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
});
tasker.controller('tasksController', function ($scope) {
    // create a message to display in our view
    $scope.message = 'tasksController';
});
tasker.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {
    $scope.changeSelect = function () {
        $('select').each(function () {
            var $this = $(this)
                , numberOfOptions = $(this).children('option').length;
            $this.addClass('select-hidden');
            $this.wrap('<div class="select"></div>');
            $this.after('<div class="select-styled"></div>');
            var $styledSelect = $this.next('div.select-styled');
            $styledSelect.text($this.children('option').eq(0).text());
            var $list = $('<ul />', {
                'class': 'select-options'
            }).insertAfter($styledSelect);
            for (var i = 0; i < numberOfOptions; i++) {
                $('<li />', {
                    text: $this.children('option').eq(i).text()
                    , rel: $this.children('option').eq(i).val()
                }).appendTo($list);
            }
            var $listItems = $list.children('li');
            $styledSelect.click(function (e) {
                if ($('.select-options').is(':visible')) {
                    e.stopPropagation();
                    $styledSelect.text($(this).text()).removeClass('active');
                    $this.val($(this).attr('rel'));
                    $list.hide();
                    //console.log($this.val());   
                }
                else {
                    e.stopPropagation();
                    $('div.select-styled.active').each(function () {
                        $(this).removeClass('active').next('ul.select-options').hide();
                    });
                    $(this).toggleClass('active').next('ul.select-options').toggle();
                } //end if
            });
            $listItems.click(function (e) {
                e.stopPropagation();
                $styledSelect.text($(this).text()).removeClass('active');
                $this.val($(this).attr('rel'));
                $list.hide();
                //console.log($this.val());
            });
            $(document).click(function () {
                $styledSelect.removeClass('active');
                $list.hide();
            });
        });
    }
    $scope.users = [
        {
            id: 1
            , name: 'Mahesh'
        }
        , {
            id: 2
            , name: 'Ramesh'
        }
        , {
            id: 3
            , name: 'Sohan'
        }
            ];
    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});