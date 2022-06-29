// 轮播图特效
// 日期:2022-6-28
// 姓名:C
window.addEventListener('load', function () {
    // 1.得到元素
    var left_btn = document.querySelector('.prev');
    var right_btn = document.querySelector('.next');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 2.鼠标经过就显示隐藏的左右按钮
    focus.addEventListener('mouseenter', function () {
        left_btn.style.display = 'block';
        right_btn.style.display = 'block';
        clearInterval(timer);
        timer=null;  
    })
    focus.addEventListener('mouseleave', function () {
        left_btn.style.display = 'none';
        right_btn.style.display = 'none';
        timer=setInterval(function(){
            right_btn.click();
        },2000);
    })
    //3.动态生成小圆圈  有几张图片，我就生成几个小圆圈
    var carousel_list = document.querySelector('.carousel_list');
    var promo_nav = document.querySelector('.promo-nav');
    // console.log(carousel_list.children.length);
    for (var i = 0; i < carousel_list.children.length; i++) {
        // 创建小li
        var promo_li = document.createElement('li');
        // 记录当前小圆圈的索引号,通过自定义属性来做
        promo_li.setAttribute('index', i);
        // 把小li插入ul里面
        promo_nav.appendChild(promo_li);
        // 4.小圆圈排它思想  我们可以直接在生成小圆圈的同时，直接绑定点击事件
        promo_li.addEventListener('click', function () {
            // 干掉所有人
            for (var i = 0; i < promo_nav.children.length; i++) {
                promo_nav.children[i].className = '';
            }
            // 留下我自己
            this.className = 'selected';
            // 5.点击小圆圈,移动图片,移动的是ul
            // 当我们点击了小li,就得到了小li的索引号
            var index = this.getAttribute('index');
            // 当我们点击小li,把index给num
            num = index;
            // 当我们点击li,也要给circle
            circle = index;
            animate(carousel_list, -index * focusWidth);
        })
    }
    // 把第一个小圆圈设为selected
    promo_nav.children[0].className = 'selected';

    // 6.克隆第一张
    var clone_li = carousel_list.firstElementChild.cloneNode(true);
    // 上树
    carousel_list.appendChild(clone_li);
    // 7.点击右侧按钮,图片滚动一张
    var circle = 0;
    var num = 0;
    var flag=true;

    right_btn.addEventListener('click', function () {
        if(flag){
            flag=false;
            if (num == carousel_list.children.length - 1) {
                num = 0;
                carousel_list.style.left = 0;
                // num=0;
            }
            num++;
            animate(carousel_list, -num * focusWidth ,function(){
                flag=true;
            });
        
            // 8.点击右侧按钮,小圆圈跟随一起变化,可以再声明一个变量控制小圆圈的播放
            circle++;
            if (circle == promo_nav.children.length) {
                circle = 0;
            }
            circleChange();
        }
        
    });
    // 左侧按钮
    left_btn.addEventListener('click', function () {
        if(flag){
            flag=false;
            if (num == 0) {
                num = carousel_list.children.length - 1;
                carousel_list.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(carousel_list, -num * focusWidth,function(){
                flag=true;
            });
            // 8.点击右侧按钮,小圆圈跟随一起变化,可以再声明一个变量控制小圆圈的播放
            circle--;
            if (circle < 0) {
                circle = carousel_list.children.length - 1;
            }
            circleChange();
        }
    });
    function circleChange(){
        // 先清除其余小圆圈的类名
        for (var i = 0; i < promo_nav.children.length; i++) {
            promo_nav.children[i].className = '';
        }
        // 留下当前的
        promo_nav.children[circle].className = 'selected';
    }
    // 10.自动播放
    var timer=setInterval(function(){
        right_btn.click();
    },2000);

})