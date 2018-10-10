function Arrow(x, y, color, angle) {
    //箭头中心x坐标，默认值为0
    this.x = x || 0;
    //箭头中心y坐标，默认值为0
    this.y = y || 0;
    //颜色，默认值为“#FF0099”
    this.color = color || "#FF0099";
    //旋转角度，默认值为0
    this.angle = angle || 0;
}
Arrow.prototype = {
    fill: function (cxt,img) {
        
        img.onload=function()
        {
            cxt.save();
            cxt.translate(this.x, this.y);
            cxt.rotate(this.angle);
            cxt.fillStyle = this.color;
            cxt.drawImage(img,0,0);
            cxt.restore();
        }
        
    }
};
