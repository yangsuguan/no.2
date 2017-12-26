//获取9个小格子
var square=document.getElementsByClassName("square");

function flash() {
    //每次改变颜色前重置颜色，否则会造成超过3个格子不是黄色的情况
    for(var i=0;i<9;i++){
        square[i].style.background="orange";
    }
    //创建乱序数组
    function ranDomNumber() {
        var index,
            temp,
            Arr=[];
        for(var i=0;i<9;i++){//创建数组Arr长度为9
            Arr[i]=i;
        }
        for(var i=0;i<9;i++){//打乱数组，将抽取的随机值和元素值交换
            index=Math.floor(Math.random()*9);//从0-8抽取随机值
            if(index!=i) {
                temp = Arr[i];
                Arr[i] = Arr[index];
                Arr[index] = temp;
            }
        }
        return Arr//输出乱序数组
    }
    var ranDomArray=ranDomNumber();//使用变量存储乱序数组

    console.log(ranDomArray);
    //随机选取颜色
    var ranDomColor=function () {
        var r=Math.floor(Math.random()*257);
        var g=Math.floor(Math.random()*257);
        var b=Math.floor(Math.random()*257);
        return "rgb"+"("+ r + "," + g + "," + b +")";
    };
    //改变随机三个格子的颜色
    for(var i=0;i<3;i++){
        square[ranDomArray[i]].style.background=ranDomColor();
    }
}
var timer;//定时器
function start() {
    clearInterval(timer);//每次点击时清除定时器，否则连续点击时会出现加速循环情况
    timer=setInterval(flash,1000);
}
function stop() {
    for(var i=0;i<9;i++){
        square[i].style.background="orange"
    }//清除定时器前重置颜色
    clearInterval(timer)//清除定时器
}

