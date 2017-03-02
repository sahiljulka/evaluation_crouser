(function(){
var users_data=[];var albums_data={};
var photos1=null;var albums1=null;var users1=null;
var flag=0;var drop_down=document.getElementById('drop');
var go=document.getElementById('go');
var albums_list=document.getElementById('sel_user_albums');
var dest_user_albums=document.getElementById('dest_user_albums');
var sel_index=[];
var flag=0;var flag1=0;
var photograph=[];
var user_idx;
var s=document.getElementById('slider');
var slider_photo=document.getElementById('slider_photo');
slider_photo.style.left='-40px';
var count=0;//debugger;
//s.visibility="hidden";
function init()
{
	albums_data=albums1.data.map(function(val)
	{
		val.photos=photos1.data.filter(function(val1)
		{
			if(val1.albumId == val.id && (val1.id%50+5) < 10)
				return true;
			else
				return false;
			
		});
		return val;
	});
	users_data=users1.data.map(function(val)
	{
		val.albums=albums_data.filter(function(val1)
		{
			return val1.userId===val.id;
		});
		return val;
	});
	console.log(users_data);
	var select = document.getElementById("drop"); 
	

	for(var i = 0; i < users_data.length; i++) 
	{
	    var opt = users_data[i].name;
	    var el = document.createElement("option");
	    el.textContent = opt;
	    el.value = opt;
	    select.appendChild(el);
	}
}
function setPage()
{
	
	if(flag==0)
	{
		photos1=function()
		{
			photos1.data=arguments[0];
			persist();
		}
		albums1=function()
		{
			albums1.data=arguments[0];
			//console.log(albums1.data);
			persist();
		}
		users1=function()
		{
			users1.data=arguments[0];
			//console.log(users1.data);
			persist();
		}
		$.ajax({url:"https://jsonplaceholder.typicode.com/photos",success:photos1});	
		$.ajax({url:"https://jsonplaceholder.typicode.com/albums",success:albums1});
		$.ajax({url:"https://jsonplaceholder.typicode.com/users",success:users1});	
		function persist()
		{
			if(photos1.data&&albums1.data&&users1.data)
			{
				init();
			}
		}
	}
}
setPage();
function show()
{
	console.log(albums1.data);
	albums_list.innerHTML="";
	var idx=drop.selectedIndex;
	user_idx=idx;
	var i=0;
	while(i<users_data[idx].albums.length)
	{
		var li=document.createElement('li');
		li.setAttribute("pur","list");
		li.className +="li";
		li.innerHTML=users_data[idx].albums[i].title;
		console.log(li);
		albums_list.appendChild(li);
		i++;
	}
	albums_list.style.visibility="visible";

}

function show_dest()
{
	var src=window.event.srcElement;
	if(src.getAttribute('pur')=='list')
	{
		if(src.style.backgroundColor=="red")
		{
			src.style.backgroundColor="gray";flag--;
		}
		else
		{
			src.style.backgroundColor="red";flag++;
		}
	}
	if(src.getAttribute('pur')=='dest_list')
	{
		if(src.style.backgroundColor=="red")
		{
			src.style.backgroundColor="gray";flag1--;
		}
		else
		{
			src.style.backgroundColor="red";flag1++;
		}
	}
	
	if(src.getAttribute('pur')=='move')
	{
		var src1=document.querySelectorAll('.li');
		if(flag!=0)
			{
				for(var i=0;i<src1.length;i++)
				{
					if(src1[i].style.backgroundColor=="red" && src1[i].getAttribute('pur')=='list')
					{
						src1[i].setAttribute('pur','dest_list');
						src1[i].style.backgroundColor="gray";
						dest_user_albums.appendChild(src1[i]);
					}
				}
			}
			else
			{
							
				for(var i=0;i<src1.length;i++)
				{
					if(src1[i].getAttribute('pur')=='list')
					{
						src1[i].setAttribute('pur','dest_list');
						src1[i].style.backgroundColor="gray";
						dest_user_albums.appendChild(src1[i]);
					}
				}
			}

		dest_user_albums.style.visibility="visible";
		flag=0;
	}
	if(src.getAttribute('pur')=='moveback')
	{
		if(flag1!=0)
			{
				var src1=document.querySelectorAll('.li');
				for(var i=0;i<src1.length;i++)
				{
					if(src1[i].style.backgroundColor=="red" && src1[i].getAttribute('pur')=='dest_list')
					{
						src1[i].setAttribute('pur','list');
						src1[i].style.backgroundColor="gray";
						albums_list.appendChild(src1[i]);
					}
				}
			}
		else
			{
				var src1=document.querySelectorAll('.li');
				for(var i=0;i<src1.length;i++)
				{
					if( src1[i].getAttribute('pur')=='dest_list')
					{
						src1[i].setAttribute('pur','list');
						src1[i].style.backgroundColor="gray";
						albums_list.appendChild(src1[i]);
					}
				}
			}
			flag1=0;
	}
	if(src.getAttribute('pur')=='crs')
	{
		s.style.visibility="visible";
		var src1=document.querySelectorAll('.li');
		for(var i=0;i<src1.length;i++)
				{
					if( src1[i].getAttribute('pur')=='dest_list')
					{
						for(var j=0;j<users_data[user_idx].albums.length;j++)
						{
							if(users_data[user_idx].albums[j].title==src1[i].innerHTML)
							{
								for(var k=0;k<users_data[user_idx].albums[j].photos.length;k++)
								{
									photograph.push(users_data[user_idx].albums[j].photos[k]);
									var lli=document.createElement('li');
									lli.className +="photo_li";
									lli.style.backgroundImage="url("+users_data[user_idx].albums[j].photos[k].thumbnailUrl+")";
									var div=document.createElement('div');
									div.innerHTML=users_data[user_idx].albums[j].photos[k].title;
									div.style.position="absolute";
									div.style.top="60%";
									div.style.width="200px";
									div.style.fontStyle ="italic";
									lli.appendChild(div);
									slider_photo.appendChild(lli);
								}
							}
						}
					}
				}
				//console.log(photograph);
				slider_photo.style.width=photograph.length*220+'px';
	}
	
	if(src.getAttribute('pur')=='l1')
	{
		console.log(count);
		//alert(count);
		slider_photo=document.getElementById('slider_photo');
		var ol=slider_photo.style.left;
			if(ol==' ')
				ol=0;
			else
				ol=parseInt(ol,10);
		if(count+5>=photograph.length)
		{
			var children=slider_photo.children;
			slider_photo.appendChild(children[0]);
			ol=ol+218;
			slider_photo.style.transition='left 0s';
			slider_photo.style.left=ol+'px';
			window.setTimeout(fun2,0);
			return;
		}
		else
		{
			slider_photo.style.left=ol-218+'px';count++;
		}
		//count++;
	}
	if(src.getAttribute('pur')=='r1')
	{
		console.log(count);
		var ol=slider_photo.style.left;
		if(ol==' ')
				ol=0;
			else
				ol=parseInt(ol,10);
		
		if(count<=0)
		{
			slider_photo=document.getElementById('slider_photo');
			var children=slider_photo.children;slider_photo.style.transition='left 0s';
			slider_photo.insertBefore(children[(children.length)-1],children[0]);
			//slider_photo.appendChild(children[(children.length)-1]);
			ol=ol-218;
			slider_photo.style.transition='left 0s';
			slider_photo.style.left=ol+'px';
			window.setTimeout(fun1,0);return;
		}
		else
		{
			slider_photo.style.left=ol+218+'px';count--;
		}
		//count--;
	}
}
function fun1()
{
		var ol=slider_photo.style.left;
		if(ol === ' ')
			ol=0;
		else
			ol=parseInt(ol,10);
		slider_photo.style.transition='left 1s';
		slider_photo.style.left=ol+218+'px';
}
function fun2()
{
		var ol=slider_photo.style.left;
		if(ol === ' ')
			ol=0;
		else
			ol=parseInt(ol,10);
		slider_photo.style.transition='left 1s';
		slider_photo.style.left=ol-218+'px';
}
go.addEventListener("click", show);
window.addEventListener("click",show_dest);
})();