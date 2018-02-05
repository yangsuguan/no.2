angular
    .module("myApp")
    .controller('carrots', function ($scope, $http, $state, manageList) {
        //发送请求数据，渲染页面
        $scope.state=$state
        $scope.manageList = manageList;//这个是侧栏ng-repeat的数据
        $scope.hideField1 = true;
        $scope.hideField = true;

        //点击导航栏一级标题，显示该标题的子标题，并隐藏其他一级标题的子标题
        $scope.toggleList = function (x) {
            manageList.forEach(function (item) {
                item.show=false
            });
            x.show=true;
        };
        //找出匹配当前路由状态的子标题，高亮显示该状态的父标题
        manageList.forEach(function (item) {
            item.data.forEach(function(mitem){
                if($state.is(mitem.statu)){
                    item.show=true;
                    return item;
                }
            })
        })
    });