var apple_index;
var apple_id;

var head_index = 608;
var head_id;

var refreshing_ratio= 80;
var direction=1;

var score=0;
var tail = new Array();

document.onkeydown=checkKey;
window.onload=start;

var up = true;
var down = true;
var right = true;
var left = false;

var pause = 1;

function start()
{

	var poj=" ";
	for(var i=1;i<1261;i++)
	{
		index=i+1;
		poj=poj + '<div class="kawalek" id=k'+i+'></div>';
	}
	document.getElementById("main").innerHTML = poj;

	make_apple();
	make_head();	
	setInterval("move()",refreshing_ratio);

}


function make_head()
{	
	head_id = "k" + head_index;
	document.getElementById(head_id).style.background="green";
	document.getElementById(head_id).style.border="1px solid green";
	
}

function clear(k)
{	
	id = "k" + k;
	document.getElementById(id).style.background="LightGray";
	document.getElementById(head_id).style.border="1px solid white";
}


function make_apple()
{
	apple_index = Math.floor(Math.random()*1260);
	
	for(var i=0;i<tail.length;i++)
	{
		if(apple_index == tail[i]  || head_index ==tail[i])
		{
			make_apple();
			//alert('ZLE JAPKO');
		}
	}
	apple_id = "k" + apple_index;
	document.getElementById(apple_id).style.background="red";
}

function make_tail()
{	
	
	for(var i=0;i<score;i++)
	{
		document.getElementById("k" + tail[i]).style.background="GreenYellow";
		document.getElementById("k" + tail[i]).style.border="1px solid green";
	}
	
	for(var i=score;i<tail.length;i++)
	{
		document.getElementById("k" + tail[i]).style.background="LightGray";
		document.getElementById("k" + tail[i]).style.border="1px solid white";
		tail.pop();
	}
		
}


function move()
{	
	if(pause==1)
	{
		borders();
		clear(head_index);
		tail.unshift(head_index);
		head_index=head_index + direction;

		//document.getElementById("score").innerHTML=tail;
		make_head();
		make_tail();
	
		collisions();
		checkKey();
	}

}

function checkKey(e)
{
	e = e || window.event;
	
	if(e.keyCode =='83' && down==true)
	{
		direction = 42;
		up=false;
		down=true;
		right=true;
		left=true;
	}

	else if(e.keyCode == '87' && up==true)
	{
		direction = -42;
		up=true;
		down=false;
		right=true;
		left=true;
	}

	else if(e.keyCode == '65' && left==true)
	{
		direction = -1;
		up=true;
		down=true;
		right=false;
		left=true;
	}

	else if(e.keyCode == '68' && right==true)
	{
		direction = 1;
		up=true;
		down=true;
		right=true;
		left=false;
	}

	
	else if(e.keyCode == '32')
	{
		pause=pause*-1;
	}
}

function collisions()
{
	if(apple_index == head_index)
	{
		score = score + 1;
		make_apple();
		document.getElementById("score").innerHTML="SCORE : "+score; 
	}

	for(var i=0;i<tail.length;i++)
	{
		if(head_index == tail[i])
		{
			document.getElementById("main").innerHTML = 'PRZEGRANKO <br> <span style="font-size:40; color:black">Zdobyles : '+score+'pkt';
		}
	}

}

function borders()
{
	if(head_index< 42 && direction == -42)
	{
		document.getElementById("main").innerHTML = 'PRZEGRANKO <br> <span style="font-size:40; color:black">Zdobyles : '+score+'pkt';
	}

	if(head_index>1218  && direction == 42)
	{
		document.getElementById("main").innerHTML = 'PRZEGRANKO <br> <span style="font-size:40; color:black">Zdobyles : '+score+'pkt';
	}
	
	if(head_index%42 == 0 && direction == 1)
	{
		document.getElementById("main").innerHTML = 'PRZEGRANKO <br> <span style="font-size:40; color:black">Zdobyles : '+score+'pkt';
	}
	
	if((head_index-1)%42 == 0 && direction == -1)
	{
		document.getElementById("main").innerHTML = 'PRZEGRANKO <br> <span style="font-size:40; color:black">Zdobyles : '+score+'pkt';
	}
}


