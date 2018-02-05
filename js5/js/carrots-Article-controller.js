angular.module("myApp")
    .controller('ArticleListTop', function ($scope, $http,$log,type,status,$state,$stateParams,$filter) {
        //初始显示页面
        //刷新后取出参数给现有的数据赋值
        console.log($stateParams)
      $scope.startDate=$filter('date')($stateParams.startAt,'yyyy/MM/dd');//开始时间
      $scope.endDate=$filter('date')($stateParams.endAt,'yyyy/MM/dd');//结束时间
      $scope.selectStatus=$stateParams.status;//下拉菜单状态
      $scope.selectType=$stateParams.type;//下拉菜单类型
      // $scope.items=$stateParams.size;//每页显示条数
    $http({
        method: 'GET',
        url: '/carrots-admin-ajax/a/article/search',
        params:$stateParams,
        headers: {'Content-type': 'application/json'}
    }).then(function (response) {
        if(response.status===200&&response.data.code===0) {
            //从接口获取数据，然后ng-repeat出来
            $scope.articleList = response.data.data.articleList;
            $scope.type = $scope.articleList.type;
            $scope.total = response.data.data.total;//接口总条数
            $scope.size = response.data.data.size;
            $scope.page = response.data.data.page;
            $scope.items = $scope.size;
            $scope.bigTotalItems = $scope.total;//总条数赋给分页
            $scope.currentPage=$stateParams.page;//当前页数重新赋值，只能在回调函数里，在外面会被请求回来的数据覆盖
            console.log($scope.items);
            console.log(response);

        }
    }).catch(function (response) {
        bootbox.alert('请求失败')
    });
    $scope.status = status;
    $scope.types=type;
    //搜索点击事件
    $scope.seach = function () {
        console.log(Date.parse($scope.startDate))
        $state.go('carrots.Artical-list',
            {
            type: $scope.selectType,
            status:$scope.selectStatus,
            startAt: ($scope.startDate)?Date.parse($scope.startDate):undefined,
            endAt: ($scope.endDate)?Date.parse($scope.endDate)+86399999:undefined
            },
            {reload: true}
            )};
    //清除点击事件
        $scope.cleanSeach = function () {
            $state.go('carrots.Artical-list',
                {
                    type: undefined,
                    status:undefined,
                    startAt: undefined,
                    endAt: undefined
                },
                {reload: true}
            )};
        //上下线功能
        $scope.changeStatu=function (statu) {
            //判断当前状态是1还是2
            $scope.alterStatu=(statu.status===1)?2:1;
            $scope.getId=statu.id;
            console.log($scope.getId);
            console.log($scope.alterStatu);
            bootbox.confirm({
                size:'small',
                title:'提示',
                message:(this.item.status===1)?'是否执行上线操作？':'是否执行下线操作？',
                callback:function (result) {
                    if(result===true){
                        $http({
                            method: 'PUT',
                            url: '/carrots-admin-ajax/a/u/article/status',
                            params:{id:$scope.getId,status:$scope.alterStatu},
                            headers: {'Content-type': 'application/json'}
                        }).then(function (response) {
                            if(response.status===200&&response.data.code===0){
                            $state.go('carrots.Artical-list',
                                {
                                },
                                {reload: true}
                            );
                            bootbox.alert('上线成功')
                            }
                        }).catch(function (response) {
                            bootbox.alert('请求失败'+response.statu)
                        })
                    }
                }
            })
        };
        $scope.deleteItem=function (item) {
            $scope.getId=item.id;
            bootbox.confirm({
                size:'small',
                title:'提示',
                message:'是否确认删除',
                callback:function (result) {
                    if(result===true){
                        $http({
                            method:"DELETE",
                            url: '/carrots-admin-ajax/a/u/article/'+$scope.getId,
                            headers: {'Content-type': 'application/json'}
                        }).then(function (response) {
                            if(response.status===200&&response.data.code===0) {
                                $state.go('carrots.Artical-list',
                                    {},
                                    {reload: true}
                                );
                                bootbox.alert('删除成功')
                            }
                        }).catch(function (response) {
                            bootbox.alert(response.status)
                        })
                    }
                }
            })

        };
        //分页最多显示5页，其余隐藏
    $scope.maxSize = 5;
    $scope.bigCurrentPage = 1;
        console.log($scope.currentPage)
        //当model值改变时，把改变的值传给把值传递给$statePramas
    $scope.pageChange=function () {
        $state.go('carrots.Artical-list',
            {
                page:$scope.currentPage,
                size:$scope.items
            },
            {reload: true}
        )
    };
        //改变输入框的每页显示条数，跳到第几页时，把值传递给$statePramas
    $scope.changeDefault=function () {
        console.log($scope.page)
        console.log($scope.size)
        $state.go('carrots.Artical-list',
            {
                page:$scope.page,
                size:$scope.size
            },
            {reload: true}
        )
    };
    //点击编辑把id传给编辑页
    $scope.edit=function (id) {
        $state.go('carrots.Artical-detail',{id:id})
    }
});

