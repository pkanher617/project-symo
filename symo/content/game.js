var oDragTargets = [];
var oDragTarget = null;
var oDragItem = null;
var iClickOffsetX = 0;
var iClickOffsetY = 0;
var INTERVAL = 20;
var numPrims = 7;
var solution = [];
var startTime = 0;
var attempts = 0;
var levelNumber = 0;

function beginLevel() {
    $.post("./beginLevel", {userID: 1337}, function (data) {
        levelNumber = data.level;
        var level = generateLevel(data);
        for (var i = 0; i < numPrims; i++) {
            $("#prim"+i).hide();
        }
        for (var i = 0; i < level.primitives.length; i++) {
            $("#prim"+i).show();
            $("#prim"+i).attr("title", level.primitives[i]);
        }
        solution = level.solution;
        startTime = new Date().getTime();
        attempts = 0;
    });
}

function generateLevel(levelData) {
    return {primitives: ["Jason works hard", "his son will go to college", "his wife can buy lots of things"], solution: ["pred_if", "prim0", "pred_and", "prim1", "prim2"]};
}

function endLevel() {
    var endTime = new Date().getTime();
    $.post("./endLevel", {userID: 1337, level: levelNumber, completed: true, timeTaken: (endTime-startTime)/1000, numTries: attempts}, function (data) {
        location.reload();
    });
}

function OnLoad(){
	document.getElementById("ins1").style.font = "italic bold 20px arial,serif";
	document.getElementById("ins2").style.font = "italic bold 20px arial,serif";
	document.getElementById("t1").style.font = "italic bold 20px arial,serif";
	document.getElementById("gameSentence").style.font = "italic bold 30px arial,serif";

    $("#game1Check").click(checkWin);


	//alert(condition[0][0]);
	SetupDragDrop();
	//appendColumn();
    
    beginLevel();
}

function SetupDragDrop(){
	oDragTargets = [];
	
	var oList = document.getElementsByTagName("div");
	for(var i=0; i<oList.length; i++){
		var o = oList[i];
		if (o.className == "DropTarget" || o.className == "StartTarget"){
			oDragTargets[oDragTargets.length] = GetObjPos(o);
		}else if (o.className == "Draggable" || o.className == "StarDraggable" || o.className == "TriangleDraggable" || o.className == "CloudDraggable" || o.className == "DiamondDraggable" || o.className == "DropletDraggable" || o.className == "EyeDraggable" || o.className == "HeartDraggable" || o.className == "HexagonDraggable" || o.className == "LightningDraggable" || o.className == "PentagonDraggable"){
			MakeDragable(o);
		}
	}
}

function MakeDragable(oBox){
	if (navigator.platform=="iPad"){
		oBox.ontouchstart= function(e){TouchStart(e)};
		oBox.ontouchmove=function(e){TouchMove(e)};
		oBox.ontouchend=function(e){TouchEnd(e)};
	}else{
		oBox.onmousemove= function(e){DragMove(oBox,e)};
		oBox.onmouseup=function(e){DragStop(oBox,e)};
		oBox.onmousedown=function(e){DragStart(oBox,e);return false};
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

function TouchMove(e){
    e.preventDefault();
    var x = e.targetTouches[0].pageX - iClickOffsetX;
    var y = e.targetTouches[0].pageY - iClickOffsetY;
    oDragItem = e.targetTouches[0].target;
    HandleDragMove(x,y);
}

function DragStop(o,e){
	if (o.releaseCapture){
		o.releaseCapture();
	}else if (oDragItem){
		window.removeEventListener ("mousemove", DragMove2, true);
		window.removeEventListener ("mouseup",   DragStop2, true);
	}
	
	HandleDragStop();
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
    
    var completed = true;
    for (var i = 0; i < solution.length; i++) {
        completed = completed && (oDrop[i].lastChild.id == solution[i]);
    }
    
    attempts++;
    
    if (completed) {
        alert("You're correct! Good job!");
        endLevel();
    }
    else
        alert("Sorry, that's wrong. Maybe try again?");

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
		//alert(oDrop[i].innerHTML);
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
	
		
	if (oDragItem==null) return;

	if (oDragTarget){
	    
		OnTargetOut();
		OnTargetDrop();
		
		checkAllFill();
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
	oDragTarget.appendChild(oDragItem);
	if (navigator.platform=="iPad") MakeDragable(oDragItem);
	
	oDropTargets = [];
	
	var oList = document.getElementsByTagName("div");
	for(var i=0; i<oList.length; i++){
		var o = oList[i];
		if (o.className == "DropTarget"){
			oDropTargets.push(o);
			
		}
	}
	
	
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
