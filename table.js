window.onload=function(){
	var tab=document.getElementById("tab");	
	var table=tab.getElementsByTagName('table')[0];

	//表格获取元素专有词
	var thead=table.tHead;
	var tbody=table.tBodies[0];
	var row=tbody.rows;
	var td=tbody.cells;
	var th=thead.rows[0].cells;

	var data=[//这里把数据写死，项目中数据通过Ajax从后台调用。
		{"name":"张三","age":18,"score":98,"sex":0},
		{"name":"李四","age":22,"score":46,"sex":1},
		{"name":"王五","age":1,"score":44,"sex":0},
		{"name":"赵六","age":24,"score":33,"sex":1},
		{"name":"十七","age":46,"score":55,"sex":0},
		{"name":"傻八","age":25,"score":2,"sex":3}
	];

	//获取数据
	function binddata(){
		var frag=document.createDocumentFragment();
		for(var i=0;i<data.length;i++){
			var cur=data[i];
			cur.name=cur.name||"--";
			cur.age=cur.age||"--";
			cur.score=cur.score||"--";
			cur.sex=cur.sex===0?"男":"女	";
			//每一次循环创建一个tr
			var tr=document.createElement("tr");
			for(var key in cur){
				//每一个tr都创建四个td
				var td=document.createElement("td");
				td.innerHTML=cur[key];
				tr.appendChild(td)
			}
			frag.appendChild(tr)
		};
		tbody.appendChild(frag);
		frag=null;//清空碎片,优化性能。
	}

	binddata();//页面初始化显示数据

	//奇偶行变色
	function changeColor(){
		for(var j=0;j<row.length;j++){
			var col=row[j].style;
			col.backgroundColor=j%2!==0?"lightgreen":null;
			
			//row[j].style.backgroundColor=j%2!==0?"lightgreen":null;
		}
	}

	changeColor();//页面初始化显示隔行变色

	//排序
	function sortList(n){
		//类数组转化成数组
		var rowAry=utils.listToArray(row);
		//排序
		rowAry.sort(function(a,b){
			var curIn=a.cells[n].innerHTML;
			var nexIn=b.cells[n].innerHTML;
			var curInNum=parseFloat(curIn);
			var nexInNum=parseFloat(nexIn);
			if(isNaN(curInNum)){
				return curIn.localeCompare(nexIn)
			}
			return curInNum-nexInNum
		});
		//升序降序开关
		if(this.flag==="asc"){
			rowAry.reverse();
			this.flag="desc";
		}else{
			this.flag="asc"
		}
		//数组添加内容
		var frag=document.createDocumentFragment();
		for(var i=0;i<rowAry.length;i++){
			frag.appendChild(rowAry[i])
		}
		tbody.appendChild(frag);
		frag=null;
		//执行奇偶行变色
		changeColor();	
	}

	//给所有的th加上点击效果
	for(var i=0;i<th.length;i++){
		th[i].index=i;
		th[i].onclick=function(){
			sortList.call(this,this.index)
		}
	}
}
