"use strict";

function GameStartScene(gamePlayScene){
	Scene.call(this);
	this.gamePlayScene = gamePlayScene;
}
Inherits(GameStartScene, Scene);	//継承


//初期化メソッド
GameStartScene.prototype.initialize = function(){
	var t = new createjs.Text("クリックでスタート", "48px sans-serif", "#ffffff");
	t.textAlign = "center";
	t.textBaseline = "middle";
	t.x = STAGE_WIDTH/2;
	t.y = STAGE_HEIGHT/2;

	var boxHeight = 120;
	var box = new createjs.Shape();
	box.graphics.beginFill("rgba(0,0,0,0.7)");
	box.graphics.drawRect(0, 0, STAGE_WIDTH, boxHeight);
	box.y = (STAGE_WIDTH/2) - (boxHeight/2);

	this.__container.addChild(box);	
	this.__container.addChild(t);
}

//破棄メソッド
GameStartScene.prototype.finalize = function(){
	//何もしない
}

//更新メソッド
GameStartScene.prototype.update = function(){
	if(gMouse.downFrame == 1){
		gSceneManager.remove(this);
		this.gamePlayScene.start();
	}
}