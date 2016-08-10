"use strict";

function GameClearScene(gamePlayScene, noOfMove){
	Scene.call(this);
	this.gamePlayScene = gamePlayScene;
	this.noOfMove = noOfMove;
	this.blinkCount = 0;
	this.BLINK_CYCLE = 50;
}
Inherits(GameClearScene, Scene);	//継承


//初期化メソッド
GameClearScene.prototype.initialize = function(){
	var textBaseY = (STAGE_HEIGHT - 220)/2

	//テキストの生成
	var textOffsetY = textBaseY;
	var t1Height = 80;
	var t1 = new createjs.Text("ゲームクリア！", "48px sans-serif", "#ffffff");
	t1.textAlign = "center";
	t1.textBaseline = "middle";
	t1.x = STAGE_WIDTH/2;
	t1.y = textOffsetY + t1Height/2;
	textOffsetY += t1Height;

	var t2Height = 40;
	var t2 = new createjs.Text("～ 動かした数  " + this.noOfMove + " 回 ～", "30px sans-serif", "#ffffff");
	t2.textAlign = "center";
	t2.textBaseline = "middle";
	t2.x = STAGE_WIDTH/2;
	t2.y = textOffsetY + t2Height/2;
	textOffsetY += t2Height;

	var t3Height = 80;
	var t3 = new createjs.Text("クリックではじめから", "32px sans-serif", "#ffffff");
	t3.textAlign = "center";
	t3.textBaseline = "middle";
	t3.x = STAGE_WIDTH/2;
	t3.y = textOffsetY + t3Height/2 + 20;
	textOffsetY += t3Height;

	this.blinkText = t3;

	//ボックスの生成
	var boxHeight = 240;
	var box = new createjs.Shape();
	box.graphics.beginFill("rgba(0,0,0,0.8)");
	box.graphics.drawRect(0, 0, STAGE_WIDTH, boxHeight);
	box.y = (STAGE_WIDTH/2) - (boxHeight/2);

	//コンテナに追加
	this.__container.addChild(box);
	this.__container.addChild(t1);
	this.__container.addChild(t2);
	this.__container.addChild(t3);
}

//破棄メソッド
GameClearScene.prototype.finalize = function(){
	//何もしない
}

//更新メソッド
GameClearScene.prototype.update = function(){
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