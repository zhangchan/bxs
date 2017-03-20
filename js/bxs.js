var timer,count;
function initPage () {
	var rate = 576/539;
	var cH = document.documentElement.clientHeight;
	var cW = document.body.offsetWidth;
	var sbar = document.querySelector(".siderbar");
	var map = document.querySelector(".map");
	var histogram = document.querySelector(".histogram");
	var content = document.querySelector(".content");
	var mapdesc = document.querySelector(".mapdesc");
	sbar.style.height = cH-53 +"px";

	//设置宽
	histogram.style.width = cW - sbar.offsetWidth -14 + "px";

	myChart.resize();
	content.style.width = cW - sbar.offsetWidth -14 + "px";
	content.style.height = sbar.offsetHeight - histogram.offsetHeight + "px";
	//地图
	var mapH,mapW, mapHa,mapWa,mapHb,mapWb;
	mapHa = sbar.offsetHeight - histogram.offsetHeight -2;
	mapWa = mapHa*rate;
	mapWb = histogram.offsetWidth-mapdesc.offsetWidth;
	if(mapWa > mapWb){
		mapW =  mapWb;
		mapH =  mapWb/rate
	}else{
		mapW =  mapWa;
		mapH =  mapHa;
	}
	map.style.height = mapH + "px";
    map.style.width = mapW + "px";
    var exWidth =  content.offsetWidth - map.offsetWidth - 610;
    mapdesc.style.marginLeft =  (exWidth > 0 ? exWidth : 0)/2 + "px";
    // mapdesc.style.width = content.offsetWidth - mapW -10 + "px";
	chartsResize();
    // setCountWidth() 
    cboxChange();

}
function curTime(){
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m > 9 ? m : ('0'+m);
	var d = date.getDate() > 9 ? date.getDate() : '0'+date.getDate();
	var h = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
	var min = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
	var sec = date.getSeconds() > 9 ? date.getSeconds() : '0' +date.getSeconds();
	return y +'-'+ m +'-'+ d + ' ' + h +':'+ min +':'+ sec;
}
function countdown(total){
	clearInterval(count)
	count =  setInterval(function(){
		total--
		var m = parseInt(total/60);
		var s = total%60;
		document.querySelector(".Countdown").innerHTML = '('+m+'分'+s+'秒后更新数据)';
		if(!m&&!s){
			countdown(300)
		}
	},1000);
}
function setCountWidth(){
	var all = document.querySelector(".countNum").querySelectorAll("span");
	var max =0;
	for (var i = 0; i < all.length; i++) {
		max = max > parseInt(all[i].getAttribute('param')) ? max : parseInt(all[i].getAttribute('param'));
	}
	for (var i = 0; i < all.length; i++) {
		all[i].style.width = 110*parseInt(all[i].getAttribute('param'))/max + "px";
	}				
}
function setWidth(mapH){
	var w = 140,zv =1;
	var ul = document.querySelector(".area");
	var lis = ul.querySelectorAll("li");
	if (mapH > 420) {
		w = 140;
		zv =1
	}else{
		w = 100;
		zv =0.9;
	}
	ul.style.zoom = zv;
	for(var i=0; i<lis.length; i++){
		lis[i].style.width = w + "px";
	}
}
// function descChage(){
//     var contentH = document.querySelector(".content").offsetHeight;
// 	var hcfxH = document.getElementById('hcfx').offsetHeight;
// 	var eH = (contentH - hcfxH)/3;
//     if(document.querySelector(".siderbar").offset > 555){
//         document.querySelector("#histogram").style.height = "170px";
//         myChart.resize(); 
//     }
// 	// eH = eH < 95 ? 95 : eH;
// 	var ts = document.querySelectorAll(".stimes");
// 	for (var i = 0; i < ts.length; i++) {
// 		ts[i].style.height = eH + "px";
// 	}
             

// }
function cboxChange(){
    var ch = $(".content").height(),
        zh = $(".zdtime").height(),
        counth = $(".hcfx").height()+10;
        var oth = zh + counth;
    var lih = (ch-oth)/2 > 125 ?  (ch-oth)*5/7 : 125;
    var mt = (ch-oth)/2 > 125 ? ((ch-oth)/7 -15) : 0;
    $(".cbox,.sttjbtn").height(lih).css("top",(mt-30)+"px");
    chartsResize();
}

var option = {
    title : {
        text: '当天各时段使用次数(次)',
        padding:10,
        textStyle:{
        	fontSize: 16,
		    fontWeight: 'normal',
		    color: '#686868'
        }      
    },
    grid: {
        x: 25,
        y: 55,
        x2: 30,
        y2: 25,
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 0,
        borderColor: '#ccc'
    },
    xAxis : [
        {
            type : 'category',
            name:'时段',
            boundaryGap: true,
            splitLine:{
	    		show : false
	    	},
            axisLabel :{  
                interval:0   
            },
            data : ['09-10','08-09','07-08','06-07','05-06','04-05','03-04','02-03','01-02','00-01']
        }
    ],
    yAxis : [
        {
            type : 'value',
            splitLine:{
	    		show : false
	    	}
        }
    ],
    series : [
    	{
            name:'登录',
            type:'bar',
            itemStyle:{
		    	normal : {
		    		color : '#a9df34',
                    label : {
                        show: true, position: 'top'
                    }
		    	}
		    },
            data:[20, 18, 9, 13, 8, 9, 10, 13, 10, 10]
        },
        {
            name:'采集',
            type:'bar',
            itemStyle:{
		    	normal : {
		    		color : '#7fb9fb',
                    label : {
                        show: true, position: 'top'
                    }
		    	}
		    },
            data:[31, 20, 9, 7, 5, 5, 4, 5, 8, 5]
        },
        {
            name:'核查',
            type:'bar',
            itemStyle:{
		    	normal : {
		    		color : '#ea525a',
		    		label : {
                        show: true, position: 'top'
                    }
		    	}
		    },
            data:[50, 25, 10, 8, 10, 10, 8, 5, 8, 8]
        }
    ]
};
var optionHC = {
	title:{
    	text:"核查人员分类统计",
         x:"left",
         padding:5,
     	 textStyle:{
            fontSize : 14,
         	color:"#686868"
         }
    },
	color:["#f9112c","#45b7f8","#ff7200","#fffc20"],
    series : [
        {
            name:'访问来源',
            type:'pie',
            center: ['50%', '55%'],
            radius : ['25%', '50%'],
            itemStyle : {
                normal : {
                    label : {
                        show : true,
                      	textStyle:{
                          color:"#686868"
                        }
                    },
                    labelLine : {
                        show : true,
                        length:0,
                      	lineStyle:{
                          color:"#686868"
                        }
                    }
                }
            },
            data:[
                {value:1200, name:'红色：1200'},
                {value:1100, name:'蓝色：1100'},
               	{value:900, name:'橙色：900'},
             	 {value:368, name:'黄色：368'}
            ]
        }
    ]
};                 
var colorArg = {
    "州公安局" : "#db70d7",
    "和静县" : "#faea8a",
    "和硕县" : "#fabe88",
    "且末县" : "#bbe1ea",
    "若羌县" : "#d8d1a7",
    "尉犁县" : "#fad678",
    "库尔勒市" : "#d8d2ec",
    "焉耆县" : "#a37053",
    "轮台县" : "#d1b6a5",
    "博湖县" : "#528e96",
    "其他":"#a9df34",
    "塔里木":"#3050b9"
};
var dldata = [{
        "area": "和静县",
        "times" : 32
    },{
        "area" : "和硕县",
        "times" : 31
    },{
        "area" : "且未县",
        "times" : 26
    },{
        "area" : "塔里木",
        "times" : 26
    },{
        "area" : "塔里木",
        "times" : 26
    },{
        "area" : "若羌县",
        "times" : 65
    },{
        "area" : "尉犁县",
        "times" : 10
    },{
        "area" : "库尔勒市",
        "times" : 26
    },{
        "area" : "焉耆县",
        "times" : 53
    },{
        "area" : "轮台县",
        "times" : 42
    },{
        "area" : "博湖县",
        "times" : 41
    }];
var cjdata = [{
        "area": "和硕县",
        "times" : 23
    },{
        "area": "且未县",
        "times" : 9
    },{
        "area": "和静县",
        "times" : 54
    },{
        "area": "尉犁县",
        "times" : 11
    },{
        "area": "库尔勒市",
        "times" : 66
    },{
        "area": "若羌县",
        "times" : 32
    },{
        "area": "焉耆县",
        "times" : 55
    },{
        "area": "博湖县",
        "times" : 22
    },{
        "area": "轮台县",
        "times" : 33
    }];
var hcdata = [{
        "area": "且未县",
        "times" : 32
    },{
        "area": "若羌县",
        "times" : 11
    },{
        "area": "尉犁县",
        "times" : 26
    },{
        "area" : "塔里木",
        "times" : 26
    },{
        "area": "库尔勒市",
        "times" : 65
    },{
        "area": "和静县",
        "times" : 14
    },{
        "area": "博湖县",
        "times" : 6
    },{
        "area": "和硕县",
        "times" : 32
    },{
        "area": "轮台县",
        "times" : 79
    },{
        "area": "焉耆县",
        "times" : 13
    }];
 
dldata = jsonSort(dldata);
cjdata = jsonSort(cjdata);
hcdata = jsonSort(hcdata);

function jsonSort(arr){
    return arr.sort(function(a,b){
        return b.times -a.times;
    });
}
function getXArr(json){
    return json.map(function(ele){
        return ele.area;
    });
}
function getColorArr(arr){
    var newArr=[];
    for (var i = 0; i < arr.length; i++) {
        newArr[i] = colorArg[arr[i].area];
    }
    return newArr;
}
function getDataArr(json){
    return json.map(function(ele){
        return ele.times;
    });
}
function bulidParam(data,type){
    return {
        title:{
            text: type+"(次)"
        },
        x:{
            data : getXArr(data),
        },
        series :[
            {
                name: type,
                type:'bar',
                barWidth : 15,
                itemStyle:{normal : {
                        color : function(obj,a,b,c){
                            return colorArg[data[obj.dataIndex].area];
                        },
                        label : {
                            show: true, position: 'top'
                        }
                    }
                },
                data:getDataArr(data)
            }
        ]
    }
} 
function pzChart(data){
   return {
        title : {
            text: data.title.text,
            padding:0,
            x: data.title.x ? data.title.x : 15,
            y:0,
            textStyle:{
                fontSize: 12,
                fontWeight: 'normal',
                color: '#333'
            }      
        },
        color: data.color,
        grid: {
            x: 25,
            y: 36,
            x2: 50,
            y2: 30,
            backgroundColor: 'rgba(0,0,0,0)',
            borderWidth: 0,
            borderColor: '#ccc'
        },
        xAxis : [
            {
                type : 'category',
                name : (data.x.name ? data.x.name : '县（市）'),
                splitLine:{
                    show : false
                },
                axisLabel :{  
                    interval:0   
                },
                data : data.x.data
            }
        ],
        yAxis : [
            {
                //type : 'value',
                splitLine:{
                    show : false
                }
            }
        ],
        series : data.series
    }; 
} 
var dlparam = bulidParam(dldata,"登录次数");
var cjparam = bulidParam(cjdata,"采集次数");
var hcparam = bulidParam(hcdata,"核查次数");

var sjparam = {
        title:{
            text : "使用次数(次)",
            x: 1
        },
        x:{
            name : '时段',
            data : ["03-07","03-06","03-05","03-04","03-03","03-02","03-01"]
        },
        y:{
            name : '使用次数（次）'
        },
        series :[
            {
                name:'登录',
                type:'bar',
                itemStyle:{
                    normal : {
                        color : '#a9df34',
                        label : {
                            show: true, position: 'top'
                        }
                    }
                },
                data:[20, 18, 9, 13, 8, 9, 10]
            },
            {
                name:'采集',
                type:'bar',
                itemStyle:{
                    normal : {
                        color : '#7fb9fb',
                        label : {
                            show: true, position: 'top'
                        }
                    }
                },
                data:[31, 20, 9, 7, 5, 5, 4]
            },
            {
                name:'核查',
                type:'bar',
                itemStyle:{
                    normal : {
                        color : '#ea525a',
                        label : {
                            show: true, position: 'top'
                        }
                    }
                },
                data:[50, 25, 10, 8, 10, 10, 8]
            }
        ]
    }

 

function chartsResize(){
    var w = $(".cbox").width(),
        h = $(".cbox").height();
    $(".cbox ul li").width(w).height(h);
    if(!dlchart) return false; 
    dlchart.resize();    
    cjchart.resize();    
    hcchart.resize();    
    sjchart.resize();  
}    
              

var start = {
  elem: '#start',
  format: 'YYYY-MM-DD hh:mm:ss',
  max: '2099-06-16 23:59:59',
  istime: true,
  istoday: false,
  choose: function(datas){
     end.min = datas;
     end.start = datas
  }
};
var end = {
  elem: '#end',
  format: 'YYYY-MM-DD hh:mm:ss',
  max: '2099-06-16 23:59:59',
  istime: true,
  istoday: false,
  choose: function(datas){
    start.max = datas;
  }
};

var zdstart = {
  elem: '#zdstart',
  format: 'YYYY-MM-DD',
  max: '2099-06-16 23:59:59',
  // istime: true,
  istoday: false,
  choose: function(datas){
     zdend.min = datas;
     zdend.start = datas
  }
};
var zdend = {
  elem: '#zdend',
  format: 'YYYY-MM-DD',
  max: '2099-06-16 23:59:59',
  // istime: true,
  istoday: false,
  choose: function(datas){
    zdstart.max = datas;
  }
};
// laydate.skin('danlan');
laydate(start);
laydate(end);
laydate(zdstart);
laydate(zdend);


var myChart = echarts.init(document.getElementById('histogram')); 
var hcfx = echarts.init(document.getElementById('hcfx')); 


var dlchart = echarts.init(document.getElementById('dlchart'));
var cjchart = echarts.init(document.getElementById('cjchart')); 
var hcchart = echarts.init(document.getElementById('hcchart')); 
var sjchart = echarts.init(document.getElementById('sjchart')); 
myChart.setOption(option);
hcfx.setOption(optionHC);               
           
dlchart.setOption(pzChart(dlparam));    
cjchart.setOption(pzChart(cjparam));    
hcchart.setOption(pzChart(hcparam));    
sjchart.setOption(pzChart(sjparam));    



initPage();
setCountWidth()
countdown(300);
window.onresize = initPage;

var index=0;

$(".sttjbtn").on("click","li",function(){
    index = $(this).index()
    // $(".cbox ul").css("left",-w*index + "px");
    $(this).addClass('cur').siblings().removeClass('cur');
    clearInterval(chartTimer);
    move(index);
    chartTimer = setTimer()
});
function move(i){
    var w = $(".cbox").width()
    $(".cbox ul").stop().animate({
        "left": -w*i + "px"
    },600);  
}
function setTimer(){
    return setInterval(function(){
        move(index);
        $(".sttjbtn ul li").eq(index).addClass('cur').siblings().removeClass('cur');
        index = ++index > 3 ? 0 : index;
    },3000);
}
var chartTimer = setTimer();


//右上角的日历
    timer = setInterval(function(){
        document.querySelector(".now").innerHTML = curTime();
    },1000);