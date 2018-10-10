//定义工具函数集
window.tools = {};
//获取鼠标当前位置
window.tools.getMouse = function (element) {
    var mouse = { x: 0, y: 0 };
    element.addEventListener("mousemove", function (e) {
        var x, y;
        var e = e || window.event;
        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        }
        else {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        x -= element.offsetLeft;
        y -= element.offsetTop;

        mouse.x = x;
        mouse.y = y;
    }, false);
    return mouse;
}
//获取随机颜色值
window.tools.getRandomColor=function(){
    return '#' +
    (function (color) {
        return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
        && (color.length == 6) ? color : arguments.callee(color);
    })('');
}
//外接矩形判定法（碰撞检测）
window.tools.checkRect = function (rectA, rectB) {
    return !(rectA.x + rectA.width < rectB.x ||
             rectB.x + rectB.width < rectA.x ||
             rectA.y + rectA.height < rectB.y ||
             rectB.y + rectB.height < rectA.y);
}

//外接圆判定法（碰撞检测）
window.tools.checkCircle = function (circleB, circleA) {
    var dx = circleB.x - circleA.x;
    var dy = circleB.y - circleA.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < (circleA.radius + circleB.radius)) {
        return true;
    }
    else {
        return false;
    }
}

//获取键盘控制方向
window.tools.getKey = function () {
    var key = {};
    window.addEventListener("keydown", function (e) {
        if (e.keyCode == 38 || e.keyCode == 87) {
            key.direction = "up";
        } else if (e.keyCode == 39 || e.keyCode == 68) {
            key.direction = "right";
        } else if (e.keyCode == 40 || e.keyCode == 83) {
            key.direction = "down";
        } else if (e.keyCode == 37 || e.keyCode == 65) {
            key.direction = "left";
        } else {
            key.direction = "";
        }
    }, false);
    return key;
}

//动画循环，兼容各大浏览器
window.requestAnimationFrame = (
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (callback) {
        return window.setTimeout(callback, 1000 / 60);
    }
);
