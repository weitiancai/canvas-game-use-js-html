/*
	Name  :让子弹飞小游戏
	Author    :魏蒙 刘嘉欢
	Build_Date:2018/1/4
	Version   :1.0
 */
 //1. 公共变量声明块........................................................
var BEGIN_GAME=false;
var canvas=$$("canvas"),
	context=canvas.getContext("2d"),
	cnv=canvas,cxt=ctx=context;
var canvas2=$$("small_canvas"),
	context2=canvas2.getContext("2d");
var gun=new Image();
	gun.src="picture/robot.png";
var img=new Image();
	img.src="picture/robot_left.png";
var back=new Image();
	back.src="picture/back.jpg"
var back2=new Image();
	back2.src="picture/back2.jpg";
var back3=new Image();
	back3.src="picture/back3.jpg";
var back4=new Image();
	back4.src="picture/back4.jpg";
var mouse = tools.getMouse(canvas);
var robot={
		x:0,
		width:140,height:180,
		trans_x:116,trans_y:597,
		gun_x:130,gun_y:40
	};
	var blueball=new Image();
	blueball.src="picture/blueball.png";
var blackhole=new Image();
	blackhole.src="picture/blackhole.png";
var wormhole1=new Image(),wormhole2=new Image();
	wormhole1.src="picture/wormhole1.png",wormhole2.src="picture/wormhole2.png";
var flag=0,flag2=0,flag3=0;//flag 表确定子弹发射位置、 flag2表示子弹生命（存在）状态 flag3 便于判断 输局
var master_die_time=500;
var master_die_flag=0;
var soil=new Image();
	soil.src="picture/soil.png";
var pattern;
var wall=new Image();
	wall.src="picture/wall4.jpg";
	var pattern1;
	wall.onload=function(){
		pattern1=context.createPattern(wall,'repeat');
	}
var wall2=new Image();
	wall2.src="picture/wall5.jpg";
	var pattern2;
	wall2.onload=function(){
		pattern2=context.createPattern(wall2,'repeat');
	}
	var wall_color=0,KILL=0,MAX_KILL=-1;
// var pattern=context.createPattern(blackhole,"repeat");
var STORY=[	"===地球公元2118年，太阳系闯入一群星际怪兽,这",
			"些怪兽大量繁殖造成太阳系大量资源流失，同时也",
			"严重威胁人类的正常太空航行，英勇的你穿上一套",
			"智能套装，套装拥有深度学习功能，利用它，你可",
			"以清理这些太空来的不速之客。。。"]
	RULES=["===勇敢的英雄们，用鼠标移动进行操作，每一关有",
	"十发子弹，发光子弹前将屏幕上的外星侵略者消灭光",
	"即为获胜，而一关的成绩就是发射子弹数（少则更优）",
	"每打一发子弹，智能铠甲都会帮你分析这个子弹的弹",
	"道，如果这个弹道好极了，那么铠甲就会记住这个弹道，",
	"让铠甲工作，学习足够多的弹道，那么关卡会变得很","好过！",
	"注意：怪兽的居住地方，特别是拐角处会有他们的唾","液分泌，子弹容易打滑~"]
var bullet={};

var hit_nums=0,MAX_HIT_TIMES=15;
var barriers=[],blackholes=[],wormholes=[],masters=[];;
var lastTime=0,ENDTIME=150;//小球最终显示0.5s后消失
var MASTER=new Image();//图片怪物是大写字母
	MASTER.src="picture/master.png";
var CHAPTER_NUM=0;//一开始就是开始的。等开始动画加进来再改这个
var sum_of_master=0;
var animate_time=0;
var begin_game=$$("begin_game"),begin__game=$$("begin-game"),
	background_game=$$("background_game"),background__game=$$("background-game")
	how_to_play=$$("how_to_play"),
	how__to__play=$$("how-to-play")
	turn_to_lastpage=$$("turn-to-lastpage"),
	controller=$$("controller"),ai=$$("ai-button");
var winflag=0,loseflag=0;
var MIN_CAPTER_NUM=[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
LEFT_BULLET_NUM=[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10];
// var BEST_ANGLE=new Array(30),BEST_KILL=new Array(30);
// 	memset(BEST_ANGLE,45/180*Math.PI);memset(BEST_KILL,-1);//赋初值 第一次打开这个游戏有用
	if(!window.localStorage){
        alert("浏览器不支持localstorage");
    }
    else{
        var storage=window.localStorage;//storage.setItem("c",3);storage[a]="1"; storage.b=1;
        for(var i=0;i<30;i++){
        	if(!storage[i])
        		storage[i]=0;//如果没有定义过，给初值
        }
        for(var i=30;i<60;i++){
        	if(!storage[i])
        		storage[i]=-1;
        }//找到以前玩游戏的数据
    }
	
var AI_MODE=0,AI_ANGLE=0,best_angle=0;//AI 模式
//下面有关精灵
var alpha=0,calculate_alpha=0,calculate_time=0,
	drawer={
		paint:function(sprite,context){
			context.textAlign="center";
			context.fillStyle="#A0522D";
			if(winflag){
				context.fillText("Congratulation!",canvas.width/2,canvas.height/2);
				play_win_music();
			}
			else if(loseflag){
				context.fillText("What a pity~",canvas.width/2,canvas.height/2);
				play_lose_music();
			}
		}
	},
	bigger={
		execute:function(sprite,context,time){
			context.font=alpha*60+70+"px Blackadder ITC";
			context.globalAlpha=alpha;
			alpha+=0.009;
			if(alpha>=1)//全部呈现后结束需2s
			{
				winflag=0;
				loseflag=0;
			}//噢噢噢噢，没加括号找了半天
		}	
	};
var win_video=new Sprite("win",drawer,[ bigger ]);
//下面是音乐元素
var click_voice=new Audio();click_voice.src="music/clickmusic.mp3";
var chapter_music=new Audio();chapter_music.src="music/chaptermusic.mp3";
var return_music=new Audio();return_music.src="music/returnmusic.mp3";
var win_music=new Audio();win_music.src="music/win.mp3";
var lose_music=new Audio();lose_music.src="music/fail.mp3";
var master_die_music=new Audio();master_die_music.src="music/masterdie.mp3";
var blackhole_music=new Audio();blackhole_music.src="music/blackholemusic.mp3";
var wormhole_music=new Audio();wormhole_music.src="music/wormholemusic.mp3";
var ai_music=new Audio();ai_music.src="music/aimusic.mp3";
var impact_music=new Audio();impact_music.src="music/impactmusic.mp3";
//2. 函数定义块...........................................................

function play_aimusic(){
	ai_music.play();
}
function play_blackhole_music(){
	blackhole_music.play();
}
function play_wormhole_music(){
	wormhole_music.play();
}
function play_impact_music(){
	impact_music.play();
}
function play_master_die_music(){
	master_die_music.play();
}
function play_win_music(){
	win_music.play();
}function play_lose_music(){
	lose_music.play();
}
function play_return_music(){
	return_music.play();
}
function play_click_voice(){
	click_voice.play();
}
function play_chapter_music(){
	chapter_music.play();
}

function memset(a,value){
	for(var i=0;i<a.length;i++)
		a[i]=value;
}

function draw_background(time){
	var get_px=Math.cos(time/1000%(2*Math.PI))*10;//(-10到10，循环)
	if(CHAPTER_NUM%3==2)
	context.drawImage(back4,get_px-10,0,canvas.width+20,canvas.height);
	else if(CHAPTER_NUM%3==1)
		context.drawImage(back2,get_px-10,0,canvas.width+20,canvas.height);
	else if(CHAPTER_NUM%3==0)
		context.drawImage(back3,get_px-10,0,canvas.width+20,canvas.height);
	barriers.forEach(function (barrier){//只用到值value
		context.save();
		// context.fillStyle=barrier.color;
		if(wall_color==1)
			context.fillStyle=pattern1;
		else if(wall_color==2)
			context.fillStyle=pattern2;
		if(wall_color==0)
			context.fillStyle=barrier.color;
		context.lineWidth=3;
		context.strokeStyle="gray";
		context.strokeRect(barrier.x,barrier.y,barrier.width,barrier.height);
		context.fillRect(barrier.x,barrier.y,barrier.width,barrier.height);
		context.restore();
	})
	blackholes.forEach(function(ball){
		context.save();
		context.beginPath();
		context.arc(ball.x,ball.y,ball.radius,0,2*Math.PI);//!!!苍天呐，这里不加beginPathclosePath会死的！！！
		context.closePath();
		context.stroke();
		context.clip();
		draw_blackhole(ball.x,ball.y,ball.radius);
		//context.fillRect(ball.x,ball.y,ball.radius,ball.radius);
		context.restore();
	})
	masters.forEach(function(master){
		if(master.die==false){
			context.drawImage(MASTER,master.x,master.y,master.size,master.size);
		}
		if(master.soil==1)
			show_soil(master);
		else master.last_time=time;
		if(time-master.last_time>master_die_time)//这个灵魂的消失做的我快崩溃了！！
		{
			master.soil=0;
		}
	})	
	wormholes.forEach(function(wormhole){
		draw_wormhole(wormhole.x1-wormhole.radius1,wormhole.y1-wormhole.radius1,wormhole.radius1,1);
		draw_wormhole(wormhole.x2-wormhole.radius2,wormhole.y2-wormhole.radius2,wormhole.radius2,2);
	})
}

function create_rectangle_barrier(x,y,width,height,angle)//矩形 障碍物
{
	if(x==undefined)x=Math.random()*canvas.width;
	if(y==undefined)y=Math.random()*canvas.height;
	if(width==undefined)width=Math.random()*100+20;
	if(height==undefined)height=Math.random()*100+20;
	var barrier={angle:angle,
		x:x,y:y,width:width,height:height,
		color:tools.getRandomColor()
	};
	return barrier;
}
function create_ball(x,y,radius){
	if(x==undefined)x=Math.random()*canvas.width;
	if(y==undefined)y=Math.random()*canvas.height;
	if(radius==undefined)radius=Math.random()*20+30;
	var ball={
		x:x,y:y,radius:radius
	}
	return ball;
}
function create_wormhole(x1,y1,radius1,x2,y2,radius2){
	var wormhole={
		x1:x1,y1:y1,x2:x2,y2:y2,radius1:radius1,radius2:radius2
	}
	return wormhole;
}
function create_master(x,y){
	if(x==undefined)x=Math.random()*canvas.width;
	if(y==undefined)y=Math.random()*canvas.height;
	var master={
		x:x,y:y,size:100,die:false,soil:0,last_time:0
	}
	return master;
}
function drawspider(){
	context.save();
	context.fillStyle="#EE2C2C";
	context.font="15px Arial";
	for(var i=0;;i+=50){
		context.fillText(i,0,i);
		context.fillText(i,canvas.width-30,i);
		if(i>canvas.height)break;
	}
	for(var j=0;;j+=50){
		context.fillText(j,j,15);
		context.fillText(j,j,canvas.height)
		if(j>canvas.width)break;
	}
	context.restore();	
}
function $$(id){
	return document.getElementById(id);
}
function draw_blackhole(x,y,radius){
	context.drawImage(blackhole,x-radius,y-radius,2*radius,2*radius);
}
function draw_wormhole(x,y,radius,i){
	if(i==1)context.drawImage(wormhole1,x,y,2*radius,2*radius);
	else if(i==2)context.drawImage(wormhole2,x,y,2*radius,2*radius);
}
function draw_robot_left(){
		context.drawImage(img,robot.x,canvas.height-robot.height,
			robot.width,robot.height);
}
function get_circle(angle,x,y,radiu)
{
	var circle={};
	circle.x=x+radiu*Math.cos(angle);
	circle.y=y+radiu*Math.sin(angle);
	circle.angle=angle;
	return circle;
}
function draw_robot_gun(){
	
	var dx = mouse.x - robot.trans_x;
  	var dy = mouse.y - robot.trans_y;
    //使用Math.atan2()方法计算出鼠标与箭头中心的夹角
    //var angle = AI_MODE?BEST_ANGLE[CHAPTER_NUM]:Math.atan2(dy, dx);
    var angle = AI_MODE?storage[CHAPTER_NUM]:Math.atan2(dy, dx);
    context.save();
    context.translate(robot.trans_x,robot.trans_y);
    context.rotate(angle);
    context.drawImage(gun,0,-20,robot.gun_x,robot.gun_y);//在requestNextAnimationFrame中我不用加载图片，因为保证加载好会太慢
    context.restore();	
   
    if(flag){
    	best_angle=angle;//记录最佳角度
    	
    	circle=get_circle(angle,robot.trans_x,robot.trans_y,robot.gun_x+3);//旋转中心，半径，角度
    	//得到弹珠起始位置，方向速度，在之后除非碰撞，否则不变
    	bullet={
		x:circle.x,y:circle.y,//bullet.x,bullet.y相当于圆的中心
		vx:15*Math.cos(circle.angle),vy:15*Math.sin(circle.angle),
		radius:15
		}
		flag=0;
	}
    
}

function draw_bullet(){
	if(hit_nums<=MAX_HIT_TIMES)
		bullet.x+=bullet.vx,bullet.y+=bullet.vy;
	check_canvas(bullet);
	check_barrier(bullet);
	check_blackhole(bullet);
	check_master(bullet);
	check_wormhole(bullet);
	context.drawImage(blueball,bullet.x-15,bullet.y-15,30,30);//因为我的球是以正方体画出来的，要减去边长的一半才行
}
function check_blackhole(bullet){
	blackholes.forEach(function(ball){
		if(Math.sqrt((bullet.x-ball.x)*(bullet.x-ball.x)+(bullet.y-ball.y)*(bullet.y-ball.y))
			<bullet.radius+ball.radius)
		{
			flag2=0;hit_nums=0;play_blackhole_music();
			// if(KILL>BEST_KILL[CHAPTER_NUM]){
				if(KILL>=parseInt(storage[CHAPTER_NUM+30])){
				// BEST_KILL[CHAPTER_NUM]=KILL;
				// BEST_ANGLE[CHAPTER_NUM]=best_angle;
				storage[CHAPTER_NUM+30]=KILL;
				storage[CHAPTER_NUM]=best_angle;
			}
		}
	})

}
function check_wormhole(bullet){
	wormholes.forEach(function(wormhole){
		if(Math.sqrt((bullet.x-wormhole.x1)*(bullet.x-wormhole.x1)+(bullet.y-wormhole.y1)*(bullet.y-wormhole.y1))
			<bullet.radius+13)
		{
			bullet.vx=-bullet.vx,bullet.vy=-bullet.vy;
			bullet.x=wormhole.x2+2*bullet.vx,bullet.y=wormhole.y2+2*bullet.vy;
			hit_nums++;play_wormhole_music();
		}else if(Math.sqrt((bullet.x-wormhole.x2)*(bullet.x-wormhole.x2)+(bullet.y-wormhole.y2)*(bullet.y-wormhole.y2))
			<bullet.radius+13)
		{
			bullet.vx=-bullet.vx,bullet.vy=-bullet.vy;
			bullet.x=wormhole.x1+2*bullet.vx,bullet.y=wormhole.y1+2*bullet.vy;//矢量相加就行（*2）自带方向
			hit_nums++;play_wormhole_music();
		}
	})
}
function check_master(bullet){
	masters.forEach(function(master){
		if(Math.sqrt((bullet.x-master.x-40)*(bullet.x-master.x-40)+(bullet.y-master.y-30)*(bullet.y-master.y-30))
			<bullet.radius+master.size/2-20&&master.die==false){
			master.die=true;
			KILL++;
			master.soil=1;play_master_die_music();
		}
	})
	
}
function show_soil(master){
	var size=master.size/2;
	//这里可以设置一个淡出行为
	context.drawImage(soil,master.x,master.y,size*2,size*2);
}
function check_barrier(bullet){
	barriers.forEach(function(barrier){
		if(bullet.x+bullet.radius>=barrier.x&&bullet.y+bullet.radius>=barrier.y&&
			bullet.x-bullet.radius<=barrier.x+barrier.width&&bullet.y-bullet.radius<=barrier.y+barrier.height)
		{
				hit_nums++;
				var c_x=barrier.x+barrier.width/2,c_y=barrier.y+barrier.height/2;
				var a=compare_lines(barrier.x,barrier.y,c_x,c_y,bullet.x,bullet.y)
				var b=compare_lines(barrier.x+barrier.width,barrier.y,c_x,c_y,bullet.x,bullet.y);
				// if((a&&!b)||(!a&&b)) bullet.vx=-bullet.vx;//矩形两条对角线分割的四块区域，反弹效果不同
				if(a^b) bullet.vx=-bullet.vx;//异或
				else bullet.vy=-bullet.vy;
				play_impact_music();
		}
	})//这里为什么不能放return 0？
}
function compare_lines(x1,y1,x2,y2,x,y){
	if((x-x1)/(x2-x1)<(y-y1)/(y2-y1))return 1;
	else return 0;
}
function check_canvas(bullet)//检测外边界
{
	if(bullet.x<bullet.radius){hit_nums++;
		bullet.x=bullet.radius;
		bullet.vx=-bullet.vx;play_impact_music();
	}else if(bullet.x>canvas.width-bullet.radius){hit_nums++;
		bullet.x=canvas.width-bullet.radius;
		bullet.vx=-bullet.vx;play_impact_music();
	}
	if(bullet.y<bullet.radius){hit_nums++;
		bullet.y=bullet.radius;
		bullet.vy=-bullet.vy;play_impact_music();
	}else if(bullet.y>canvas.height-bullet.radius){hit_nums++;
		bullet.y=canvas.height-bullet.radius;
		bullet.vy=-bullet.vy;play_impact_music();
	}
	
}
function check_time(time){
	if(hit_nums<=MAX_HIT_TIMES)
		lastTime=time;//这里lasttime不必考虑初始值
	else {//结束一颗子弹的生命
		if(time-lastTime>ENDTIME){
			flag2=0;hit_nums=0;
			// if(KILL>BEST_KILL[CHAPTER_NUM]){
				if(KILL>=parseInt(storage[CHAPTER_NUM+30])){
				// BEST_KILL[CHAPTER_NUM]=KILL;
				// BEST_ANGLE[CHAPTER_NUM]=best_angle;
				storage[CHAPTER_NUM+30]=KILL;
				storage[CHAPTER_NUM]=best_angle;
			}
		}
	}
}
function judge_end_game(){
	masters.forEach(function(master){
		sum_of_master+=master.die;
	});
	if(sum_of_master==masters.length){
		sum_of_master=0;//一次比较后重新置0
		return true;
	}
	else {
		sum_of_master=0;
		return false;
	}
}
function erase(cxtcxt){
	if(cxtcxt)cxtcxt.clearRect(0,0,canvas.width,canvas.height);
	else context.clearRect(0,0,canvas.width,canvas.height);//即默认是大的canvas
}
function draw_left_bullets(num,context){
	for(var i=0;i<num;i++){
		context.save();
		context.fillStyle="#1C1C1C";
		context.beginPath();
		context.arc(10+i*20,15,10,0,Math.PI*2);
		context.closePath();
		context.fill();
		context.restore();
	}
	context.font="22px Arial";
	var guan=CHAPTER_NUM+1;
	context.fillText("第"+guan+"关 记录:神枪手只需要"+MIN_CAPTER_NUM[CHAPTER_NUM]+"发子弹",990,20);
}
function animate(time){
	if(BEGIN_GAME){
	animate_time=time;
	erase();erase(context2);
	draw_left_bullets(LEFT_BULLET_NUM[CHAPTER_NUM],context2);//画剩余的子弹
	draw_background(time);//绘制各种元素（墙、黑洞、怪物）
	draw_robot_left();//绘制机器人左半身
	draw_robot_gun();//绘制枪
	drawspider();
	check_time(time);//碰撞次数检测
	if(flag2)draw_bullet();
	canvas.onmousemove=function(){AI_MODE=0;}
	canvas.onmousedown=function(){flag=1;flag3=1;LEFT_BULLET_NUM[CHAPTER_NUM]--;}
	canvas.onmouseup=function(){flag2=1;flag3=0;hit_nums=0;KILL=0;play_return_music();}
	if(judge_end_game(time)){
		winflag=1;
		setTimeout(function(){controller.style.display="block",BEGIN_GAME=false;},1800);//在这1500ms内requestNext..继续运行，我的胜利动画就出来了哈哈
	}
	else if(!judge_end_game(time)&&LEFT_BULLET_NUM[CHAPTER_NUM]<=0&&flag2==0&&flag3==0){
		loseflag=1;
		setTimeout(function(){controller.style.display="block",BEGIN_GAME=false;},1800);
	}
	if(winflag||loseflag)play_winorlose_video(time);//胜利动画or失败动画
	requestNextAnimationFrame(animate);
	}
	else {
		tag_display_block(turn_to_lastpage);
		tag_display_none(small_canvas);
		if((10-LEFT_BULLET_NUM[CHAPTER_NUM])<MIN_CAPTER_NUM[CHAPTER_NUM]&&winflag)
			MIN_CAPTER_NUM[CHAPTER_NUM]=10-LEFT_BULLET_NUM[CHAPTER_NUM];
		bullet={};
	}
}
function calculate(time){
	if(time-calculate_time<=1500){
		context.save();
		context.fillStyle="#3CB371";
		context.font="30px Arial";
		for(var i=0;i<25;i++){
			context.fillText(Math.random().toFixed(0),Math.random()*canvas.width,Math.random()*canvas.height);
		}
		context.restore();
	requestNextAnimationFrame(calculate);
	}
}
function draw_back_back(){
	context.drawImage(back,0,0,canvas.width,canvas.height);
}
function play_winorlose_video(time){
	context.save();
	win_video.update(context,time);
	win_video.paint(context);
	context.restore();
}
function show_story(flag){
	erase();
	draw_back_back();
	if(flag)
	{
		context.save();
		context.fillStyle="#0A0A0A";
		for(var i=0;i<STORY.length;i++)
			context.fillText(STORY[i],100,100+60*i);
		context.restore();
	}
}
function show_rules(flag){
	erase();
	draw_back_back();
	if(flag)
	{
		context.save();
		context.fillStyle="#8B1A1A";
		for(var i=0;i<RULES.length;i++)
			context.fillText(RULES[i],100,100+60*i);
		context.restore();
	}
	
}
function tag_display_none(a,b,c)//不显示标签
{
	if(a)a.style.display="none";
	if(b)b.style.display="none";
	if(c)c.style.display="none";
}
function tag_display_block(a,b,c){
	if(a)a.style.display="block";
	if(b)b.style.display="block";
	if(c)c.style.display="block";
}
//3. 引用块............................................................
document.write("<script type=\"text/javascript\" src=\"js/inputs.js\"></script>");//直接引用一段js代码，太强了

function deep_learning(CHAPTER_NUM){
	//return BEST_ANGLE[CHAPTER_NUM];
	return storage[CHAPTER_NUM];
}
                            //0代表第一关，依次类推
function beginGame(chapter){
	loseflag=0,winflag=0,AI_MODE=0;
	LEFT_BULLET_NUM[CHAPTER_NUM]=10;
	small_canvas.style.display="block";
	controller.style.display="none";
	barriers.splice(0,barriers.length);
	blackholes.splice(0,blackholes.length);
	masters.splice(0,masters.length);
	wormholes.splice(0,wormholes.length);

	var chapter_wall=chapter[CHAPTER_NUM].chapter_wall.slice();
	var chapter_ball=chapter[CHAPTER_NUM].chapter_ball.slice();
	var chapter_master=chapter[CHAPTER_NUM].chapter_master.slice();
	var chapter_wormhole=chapter[CHAPTER_NUM].chapter_wormhole.slice();//数组复制
	(function map(){
		for(var i=0;i<chapter_wall.length/4;i++){
			var barrier=create_rectangle_barrier(chapter_wall[i*4],chapter_wall[i*4+1],chapter_wall[i*4+2],
				chapter_wall[i*4+3]);
			barriers.push(barrier);
		}
		for(var i=0;i<chapter_ball.length/3;i++){
			var ball=create_ball(chapter_ball[i*3],chapter_ball[i*3+1],chapter_ball[i*3+2]);
			blackholes.push(ball);
		}
		for(var i=0;i<chapter_master.length/2;i++){
			var master=create_master(chapter_master[i*2+0],chapter_master[i*2+1]);
			masters.push(master);
		}
		for(var i=0;i<chapter_wormhole.length/6;i++){
			var wormhole=create_wormhole(chapter_wormhole[i*6],chapter_wormhole[i*6+1],chapter_wormhole[i*6+2],
				chapter_wormhole[i*6+3],chapter_wormhole[i*6+4],chapter_wormhole[i*6+5]);
			wormholes.push(wormhole);
		}
	})();

	requestNextAnimationFrame(animate);

}
//4. 初始化块............................................................
window.onload=function(){
	context.font="50px Arial";
	context.fillStyle="gray";
	draw_back_back();
		// begin=document.getElementsByClassName("begin");
	var page=1;//用来切换开始页面
	begin_game.onclick=function(e){
		page=1;play_click_voice();
		tag_display_none(begin__game,background__game,how__to__play);
		tag_display_block(controller,turn_to_lastpage);
	}
	background_game.onclick=function(){
		page=1;play_click_voice();
		tag_display_none(begin__game,background__game,how__to__play);
		show_story(page);//背景讲解
		tag_display_block(turn_to_lastpage);
	}
	how_to_play.onclick=function(){
		page=1;play_click_voice();
		tag_display_none(begin__game,background__game,how__to__play);
		show_rules(page);//操作讲解
		tag_display_block(turn_to_lastpage);
	}
	turn_to_lastpage.onclick=function(){
		if(BEGIN_GAME){play_return_music();
			BEGIN_GAME=false;
			erase();
			draw_back_back();tag_display_block(controller);
		}else{play_click_voice();
		tag_display_none(turn_to_lastpage,small_canvas);
		tag_display_block(begin__game,background__game,how__to__play);
		if(controller.style.display=="block")
			controller.style.display="none";
		page=0;
		erase();
		draw_back_back();
		}
	}
	ai.onclick=function(){
		hit_nums=0;play_aimusic();
		// AI_ANGLE=artificial_intelligence();
		calculate_time=window.performance.now();//DOMHighResTimeStamp类型的
		ai.style.display="none";
		requestNextAnimationFrame(calculate);
		setTimeout(function(){AI_MODE=1,play_return_music(),AI_ANGLE=deep_learning(CHAPTER_NUM);flag=1,flag2=1,flag3=0,LEFT_BULLET_NUM[CHAPTER_NUM]--;},1500);
	}
	window.onkeydown=function(e){
		 var currKey = e.keyCode||e.which||e.charCode;
		 if(BEGIN_GAME)
		 	if(currKey==13)
		 		ai.style.display="block";
	}
}
	


