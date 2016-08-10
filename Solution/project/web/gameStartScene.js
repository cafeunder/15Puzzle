"use strict";

function GameStartScene(gamePlayScene){
	Scene.call(this);
	this.gamePlayScene = gamePlayScene;
	this.blinkCount = 0;
	this.BLINK_CYCLE = 50;
}
Inherits(GameStartScene, Scene);	//継承


//初期化メソッド
GameStartScene.prototype.initialize = function(){
	//テキストの生成
	var t = new createjs.Text("クリックでスタート", "48px sans-serif", "#ffffff");
	t.textAlign = "center";
	t.textBaseline = "middle";
	t.x = STAGE_WIDTH/2;
	t.y = STAGE_HEIGHT/2;

	this.blinkText = t;

	//ボックスの生成
	var boxHeight = 120;
	var box = new createjs.Shape();
	box.graphics.beginFill("rgba(0,0,0,0.8)");
	box.graphics.drawRect(0, 0, STAGE_WIDTH, boxHeight);
	box.y = (STAGE_WIDTH/2) - (boxHeight/2);

	//コンテナに追加
	this.__container.addChild(box);	
	this.__container.addChild(t);
}

//破棄メソッド
GameStartScene.prototype.finalize = function(){
	//何もしない
}

//更新メソッド
GameStartScene.prototype.update = function(){
	if(this.blinkCount > this.BLINK_CYCLE/2){
		this.blinkText.visible = false;
	} else {
		this.blinkText.visible = true;
	}
	this.blinkCount = (this.blinkCount + 1)%this.BLINK_CYCLE;

	if(gMouse.downFrame == 1){
		gSceneManager.remove(this);
		this.gamePlayScene.start();
	}
}