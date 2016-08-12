"use strict";

var gMouse;
function mouseInitialize(stage){
	//ヒットエリアの生成
	var hitArea = new createjs.Shape();
	//アタリ領域を表す四角形を生成
	hitArea.graphics = new createjs.Graphics().beginFill("#FFF").drawRect(0,0,STAGE_WIDTH, STAGE_HEIGHT);

	//ヒットエリアオブジェクトの生成
	var hitAreaBox = new createjs.Shape();
	hitAreaBox.hitArea = hitArea;
	hitAreaBox.visible = true;
	hitAreaBox.depth = -1;
	gStage.addChild(hitAreaBox);

	gMouse = new Mouse(stage);
	stage.on("mousedown", function(){ gMouse.mouseDown(); });
	stage.on("pressup", function(){ gMouse.mouseUp(); });
}

//-------------------------------------//
//                Mouse                //
//-------------------------------------//
function Mouse(stage){
	this.down = false;
	this.downFrame = 0;
	this.x = -1;
	this.y = -1;
	this.stage = stage;
}

Mouse.prototype.mouseDown = function(){
	this.down = true;
}
Mouse.prototype.mouseUp = function(){
	this.down = false;
}

Mouse.prototype.update = function(){
	this.x = this.stage.mouseX;
	this.y = this.stage.mouseY;

	if(this.down){
		this.downFrame++;
	} else {
		this.downFrame = 0;
	}
}