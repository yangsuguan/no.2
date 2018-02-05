angular
    .module("myApp")
    //登录页面
    .controller('myCtrl', function ($scope, $http, $state) {
        $scope.submit = function () {

            $http({
                method: 'POST',
                url: '/carrots-admin-ajax/a/login',
                data: $.param({name: $scope.account, pwd: $scope.password}),
                headers: {'Content-type': 'application/x-www-form-urlencoded'}

            }).then(function (response) {
                switch (response.data.code) {
                    case 0:
                        $state.go("carrots");
                        /*console.log('异步')*/
                        break;
                    case -5003:
                        $scope.myText = '用户名不存在';
                        break;
                    case -5004:
                        $scope.myText = '密码错误';
                        break;
                }
            })
            //同步

        }
    });