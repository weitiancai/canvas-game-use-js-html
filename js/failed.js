function artificial_intelligence(){//一个失败的人工智能函数，还是放在这里好了
	var kill=new Array(30);
	var angle,delta=10/180*Math.PI,pos//36个出射点;
	var MIN=-1,best_angle=0;
	for(angle=0;angle+=45/180*Math.PI;angle<=2*Math.PI)
	{
		hit_nums=0;
		pos=get_circle(angle,robot.trans_x,robot.trans_y,robot.gun_x+3);
		bullet={
			x:pos.x,y:pos.y,vx:15*Math.cos(angle),vy:15*Math.sin(angle),radius:15
		}
		
		var i=kill.length;while(i--)kill[i]=0;//初始化一个记录杀怪的数组
		//下面正式进入模拟程序（人工智能推演）
		while(1){
			bullet.x+=bullet.vx,bullet.y+=bullet.vy;
			
			// barriers.forEach(function(barrier){
			// if(bullet.x+bullet.radius>=barrier.x&&bullet.y+bullet.radius>=barrier.y&&
			// 	bullet.x-bullet.radius<=barrier.x+barrier.width&&bullet.y-bullet.radius<=barrier.y+barrier.height)
			// 	{
			// 		hit_nums++;
			// 		var c_x=barrier.x+barrier.width/2,c_y=barrier.y+barrier.height/2;
			// 		var a=compare_lines(barrier.x,barrier.y,c_x,c_y,bullet.x,bullet.y)
			// 		var b=compare_lines(barrier.x+barrier.width,barrier.y,c_x,c_y,bullet.x,bullet.y);
			// 		if(a^b) bullet.vx=-bullet.vx;
			// 		else bullet.vy=-bullet.vy;
			// 	}
			// })
	//1
			// masters.forEach(function(master,index){
			// if(Math.sqrt((bullet.x-master.x-40)*(bullet.x-master.x-40)+(bullet.y-master.y-30)*(bullet.y-master.y-30))
			// 	<bullet.radius+master.size/2-20&&master.die==false){
			// 	kill[index]=1;
			// }
			// })
	//2
			// blackholes.forEach(function(ball){
			// if(Math.sqrt((bullet.x-ball.x)*(bullet.x-ball.x)+(bullet.y-ball.y)*(bullet.y-ball.y))
			// 	<bullet.radius+ball.radius)
			// {
			// 	hit_nums=MAX_HIT_TIMES;
			// }
			// })
	//3
			check_canvas(bullet);
	//4
			//check_wormhole(bullet);
	//5
		if(hit_nums>=MAX_HIT_TIMES){
			var sum=0;
			for(var i=0;i<kill.length;i++)
				sum+=kill[i];
			if(sum>=MIN) MIN=sum,best_angle=angle;
			break;
		}
	}
	}
	return best_angle;
}