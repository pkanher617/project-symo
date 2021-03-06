var oDragTargets = [];
var oDragTarget = null;
var oDragItem = null;
var iClickOffsetX = 0;
var iClickOffsetY = 0;
var INTERVAL = 20;
var glob = 0;
var indexRec = 0;
var solution = [];

var condition = {};
condition.predList = [];

condition.predList.push({
		predName: "and",
		color: "ff0000",
        evaluation: function (stack) {
            var arg1 = stack[stack.length-1];
            var arg2 = stack[stack.length-2];
            stack.splice(stack.length-2, 2, arg1 && arg2);
        },
		arity: 2,
		image: "and.png"
});

condition.predList.push({
		predName: "prim",
		color: "ff0000",
        evaluation: function (stack) {
            var arg1 = stack[stack.length-1];
            var arg2 = stack[stack.length-2];
            stack.splice(stack.length-2, 2, arg1 && arg2);
        },
		arity: 0,
		image: "and.png"
});

condition.predList.push({
		predName: "or",
		color: "00ff00",
        evaluation: function (stack) {
            var arg1 = stack[stack.length-1];
            var arg2 = stack[stack.length-2];
            stack.splice(stack.length-2, 2, arg1 || arg2);
        },
		arity: 2,
		image: "or.png"
});

condition.predList.push({
		predName: "if",
		color: "0000ff",
        evaluation: function (stack) {
            var arg1 = stack[stack.length-1];
            var arg2 = stack[stack.length-2];
            stack.splice(stack.length-2, 2, (!arg1) || arg2);
        },
		arity: 2,
		image: "if.png"
});

condition.predList.push({
		predName: "not",
		color: "ffff00",
        evaluation: function (stack) {
            var arg1 = stack[stack.length-1];
            stack.splice(stack.length-1, 1, !arg1);
        },
		arity: 1,
		image: "not.png"
});

				

function OnLoad(){
	solution = ["if", 1, "and", 2, 3];
	document.getElementById("ins1").style.font = "italic bold 20px arial,serif";
	document.getElementById("ins2").style.font = "italic bold 20px arial,serif";
	document.getElementById("t1").style.font = "italic bold 20px arial,serif";
	document.getElementById("gameSentence").style.font = "italic bold 30px arial,serif";

	SetupDragDrop();
}

function SetupDragDrop(){
	oDragTargets = [];
	
	var oList = document.getElementsByTagName("div");
	for(var i=0; i<oList.length; i++){
		var o = oList[i];
		if (o.className == "DropTarget" || o.className == "StartTarget" || o.className == 'primStartTarget'){
			oDragTargets[oDragTargets.length] = GetObjPos(o);
		}else if (o.className.indexOf("Draggable") > -1){
			MakeDragable(o);
		}
	}
}

function MakeDragable(oBox){
	if (navigator.platform=="iPad"){
		oBox.ontouchstart= function(e){TouchStart(e);};
		oBox.ontouchmove=function(e){TouchMove(e);};
		oBox.ontouchend=function(e){TouchEnd(e);};
	}else{
		oBox.onmousemove= function(e){DragMove(oBox,e);};
		oBox.onmouseup=function(e){DragStop(oBox,e);};
		oBox.onmousedown=function(e){DragStart(oBox,e);
			return false;};
	}	
}

function TouchStart(e){
	
	var oPos = GetObjPos(e.target);
	iClickOffsetX = e.targetTouches[0].pageX - oPos.x;
	iClickOffsetY = e.targetTouches[0].pageY - oPos.y;
}

function DragStart(o,e){
	
	if(!e) var e = window.event;
	oDragItem = o;
	
	if (e.offsetX){
		iClickOffsetX = e.offsetX;
		iClickOffsetY = e.offsetY;	
	}else{
		var oPos = GetObjPos(o);
		iClickOffsetX = e.clientX - oPos.x;
		iClickOffsetY = e.clientY - oPos.y;
	}
	
	if (o.setCapture){
		o.setCapture();
	}else{
		window.addEventListener ("mousemove", DragMove2, true);
		window.addEventListener ("mouseup",   DragStop2, true);
	}
}

function DragMove2(e){
	DragMove(oDragItem,e);
}

function DragStop2(e){
	DragStop(oDragItem,e);
}

function DragMove(o,e){
	if (oDragItem==null) return;

	if(!e) var e = window.event;
	var x = e.clientX + document.body.scrollLeft - document.body.clientLeft - iClickOffsetX;
	var y = e.clientY + document.body.scrollTop  - document.body.clientTop - iClickOffsetY;
	
	HandleDragMove(x,y);
}

function HandleDragMove(x,y){
	
	with(oDragItem.style){
		zIndex = 1000;
		position="absolute";
		left=x;
		top=y;
	}
	
	
	if (oDragItem.parentNode.className.indexOf("DropTarget") > -1){
		var first = oDragItem.parentNode.parentNode.cellIndex;
		glob = first;
		indexRec = 1;
		CountRemoveIndex();
		//alert(glob);
		deleteBoxes(first, glob - 1);
		glob = 0;
		oDragItem.parentNode.removeChild(oDragItem);
		oDragItem = null;
		return;
		
		
	}
	
	for (var i=0; i< oDragTargets.length; i++){
		var oTarget = oDragTargets[i];
		if (oTarget.x < x && oTarget.y < y && (oTarget.x + oTarget.w) > x && (oTarget.y + oTarget.h) > y){
			if (oDragTarget!=null && oDragTarget != oTarget.o) OnTargetOut();
			oDragTarget = oTarget.o;
			OnTargetOver();
			return;
		}
	}
	
	
	
	if (oDragTarget){
		OnTargetOut();
		oDragTarget = null;
	}
}



function deleteBoxes(startIndex, endIndex){
	var row = document.getElementById("rowlist");
	for (var i = endIndex; i > startIndex; i--){
		row.deleteCell(i);
	}
	SetupDragDrop();
}

function CountArgs(){
	numOfArgs = 0;
	if (oDragItem.parentNode.parentNode.parentNode.cells[glob].childNodes[0].innerHTML == ""){
		return 0;
	}
	for (oo in condition.predList){
		var object = condition.predList[oo];
		if (oDragItem.parentNode.parentNode.parentNode.cells[glob].childNodes[0].childNodes[0].className.indexOf(object.predName) > -1){
			numOfArgs = object.arity;
		}		
	}
	return numOfArgs;
}


function CountRemoveIndex(){
	var condToDetectEmpty;
	var currentObject;
	var detectClassName;

	while (indexRec > 0){
		indexRec = indexRec - 1;
		if (oDragItem.parentNode.parentNode.parentNode.cells[glob].childNodes[0].innerHTML == ""){
			glob = glob + 1;
		}
		else{
			indexRec = indexRec + CountArgs();
			glob = glob + 1;
		}
	}
}


function TouchMove(e){
    e.preventDefault();
    var x = e.targetTouches[0].pageX - iClickOffsetX;
    var y = e.targetTouches[0].pageY - iClickOffsetY;
    oDragItem = e.targetTouches[0].target;
    HandleDragMove(x,y);
}

function DragStop(o,e){
	if (o == null) return;
	if (o.releaseCapture){
		o.releaseCapture();
	}else if (oDragItem){
		window.removeEventListener ("mousemove", DragMove2, true);
		window.removeEventListener ("mouseup",   DragStop2, true);
	}

	HandleDragStop();
}

function getSolution(){
    var statement = getCurrent();
	if (!validateSolution(statement, solution, condition)) {
        alert("Sorry, that's incorrect. Try again.");
    }
    else {
        // Go to game 2
        alert("Correct! You will now proceed to game 2.");
        location.href = "/game2.html?" + statement.join();
    }
}

function getCurrent(){
	var currentList = [];
	var oList = document.getElementsByTagName("div");
	for(var i=0; i<oList.length; i++){
		var o = oList[i];
		if (o.className == "DropTarget"){
            var id = o.lastChild.id;
            var statementPart;
            if (id.startsWith("prim"))
                statementPart = parseInt(id.substring(4)) + 1;
            else
                statementPart = id.substring(5);
			currentList[currentList.length] = statementPart;
		}
	}
	//alert(currentList);
	return currentList;
}

function checkWin(){
	oDrop = [];
	var oList = document.getElementsByTagName("div");
	for(var i=0; i<oList.length; i++){
		var o = oList[i];
		if (o.className == "DropTarget"){
			oDrop.push(o);
		}
	}
	var ind = 0;
	for(var i=0; i<oDrop.length; i++){
		
		if (oDrop[i].innerHTML == ''){
			if (ind == 1){
				ind = 2;
			}
			else{ind = 1;}
		}
		
	}
	if (ind == 1 && oDrop.length >= 6){
		
		if (oDrop[0].lastChild.id == "pred_if" &&
			oDrop[1].lastChild.id == "prim1" &&
			oDrop[2].lastChild.id == 'pred_and'&&
			oDrop[3].lastChild.id == 'prim2'&&
			oDrop[4].lastChild.id == 'prim3'){
			alert("You Are Winner!");}
		
	}
}


function checkAllFill(){
	oDrop = [];
	var oList = document.getElementsByTagName("div");
	for(var i=0; i<oList.length; i++){
		var o = oList[i];
		if (o.className == "DropTarget"){
			oDrop.push(o);
		}
	}
	var ind = 0;
	for(var i=0; i<oDrop.length; i++){
		if (oDrop[i].innerHTML == ''){
			ind = 1;
		}
		
	}
	if (ind == 0){
		appendColumn();
		SetupDragDrop();
	}
	
}


function HandleDragStop(){
	
	if (oDragItem==null||oDragTarget==null) return;

	if (oDragTarget){
	    
		OnTargetOut();
		OnTargetDrop();
		
		checkWin();
		if (oDragItem==null||oDragTarget==null) return;
		oDragTarget = null;
	}
	
	oDragItem.style.zIndex = 1;
	oDragItem = null;
}

function TouchEnd(e){
	e.target.innerHTML = "TouchEnd";
	HandleDragStop();
}


function GetObjPos(obj){
	var x = 0;
	var y = 0;
	var o = obj;
	
	var w = obj.offsetWidth;
	var h = obj.offsetHeight;
	if (obj.offsetParent) {
		x = obj.offsetLeft
		y = obj.offsetTop
		while (obj = obj.offsetParent){
			x += obj.offsetLeft;
			y += obj.offsetTop;
		}
	}
	return {x:x, y:y, w:w, h:h, o:o};
}

//Drag and Drop Events
function OnTargetOverO(){
	oDragTarget.style.border = "10px solid white";	
}

function OnTargetOver(){
	oDragTarget.style.border = "10px solid red";
}

function OnTargetOut(){
	oDragTarget.style.border = "";
}

function OnTargetDrop(){
	oDragItem.style.position="";
	
	if (oDragItem.parentNode.className.indexOf("DropTarget") <= -1 && oDragTarget.className != "StartTarget"){
		var n = 0;
		var e = false;
		for (oo in condition.predList){
			var object = condition.predList[oo];
			if (oDragItem.className.indexOf(object.predName) > -1){
				n = object.arity;
				e = true;
                break;
			}
			
		}
		if (!e) {
			//temp = oDragItem.cloneNode();
			//oDragTarget.appendChild(temp);
			//alert(oDragTarget.parentNode.innerHTML);
			//alert(oDragTarget.innerHTML);
			SetupDragDrop();
			return;
		}
		for (i = 0; i < n; i++){
			//if (oDragTarget.lastChild == null){
				ntd = document.createElement("td");
				temp = oDragTarget.cloneNode();
				ntd.appendChild(temp);
				oDragTarget.parentNode.parentNode.insertBefore(ntd,oDragTarget.parentNode.nextSibling);
				oDragTarget.innerHTML = "";
				SetupDragDrop();
			//}
		}
		temp = oDragItem.cloneNode();
		//alert(oDragTarget.innerHTML);
		if (oDragTarget.lastChild == null){
			oDragTarget.appendChild(temp);
			SetupDragDrop();
		}
		
	}
	else{
		if (oDragTarget.className != "StartTarget"){
			oDragItem.parentNode.removeChild(oDragItem);
		}
			
		
	}
		
	
	if (navigator.platform=="iPad") MakeDragable(oDragItem);
	
	oDropTargets = [];
	
	var oList = document.getElementsByTagName("div");
	
	for(var i=0; i<oList.length; i++){
		var o = oList[i];
		if (o.className == "DropTarget"){
			if (typeof o.innerHTML.className != 'undefined'){
				oDropTargets.push(o);
			}
			
		}
	}
	
	oDragItem = null;
	oDragTarget = null;
	SetupDragDrop();
}


//Draw different shapes

function addRect (){
	var rect = new Box;
	rect.x = x;
	rect.y = y;
	rect.w = w
	rect.h = h;
	rect.fill = fill;
	boxes.push(rect);
	invalidate();
}

function addStar(ctx,cx,cy,spikes,r0,r1){ 
 	var rot=Math.PI/2*3,x=cx,y=cy,step=Math.PI/spikes 
 	ctx.strokeSyle="#000"; 
	ctx.beginPath(); 
 	ctx.moveTo(cx,cy-r0) 
 	for(i=0;i<spikes;i++){ 
		x=cx+Math.cos(rot)*r0; 
		y=cy+Math.sin(rot)*r0; 
		ctx.lineTo(x,y) 
		rot+=step 
		
 		x=cx+Math.cos(rot)*r1; 
 		y=cy+Math.sin(rot)*r1; 
 		ctx.lineTo(x,y) 
 		rot+=step 
 	} 
 	ctx.lineTo(cx,cy-r0) 
 	ctx.stroke(); 
 	ctx.closePath();
} 

var appender = 1;

function appendColumn() {
    var tbl = document.getElementById('boxes'), // table reference
        i;
    // open loop for each row and append cell
    for (i = 0; i < tbl.rows.length; i++) {
        createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), tbl.rows[0].cells.length, 'DropTarget');
		
    }
}


function createCell(cell, text, style) {
    
    var div = document.createElement('div'); // create DIV element
	div.id = 'box' + (text - 1);
    //txt = document.createTextNode(text); // create text node
    //div.appendChild(txt);                    // append text node to the DIV
    div.setAttribute('class', style);        // set DIV class attribute
    div.setAttribute('className', style);    // set DIV class attribute for IE (?!)
    cell.appendChild(div);                   // append DIV to the table cell
}

