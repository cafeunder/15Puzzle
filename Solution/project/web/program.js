﻿"use strict";

//キャンバスの横幅と縦幅
var STAGE_HEIGHT, STAGE_WIDTH;
//
var gStage;

onload = function(){
	//ステージの生成（引数はキャンバスID）
	gStage = new createjs.Stage("myCanvas");

	//マウスオブジェクトの生成（以下をセットで呼び出すこと）
	MouseInitialize(gStage);

	//タッチデバイスかどうか
	if(createjs.Touch.isSupported() == true){
		//タッチデバイスの有効化（引数はステージオブジェクト）
		createjs.Touch.enable(gStage)
	} else {
		//マウスオーバーを有効にする
		//マルチデバイスではあまり推奨されない
		gStage.enableMouseOver();
	}
	
	//ステージの横幅と縦幅の取得
	STAGE_WIDTH = gStage.canvas.width;
	STAGE_HEIGHT = gStage.canvas.height;

	//=====背景の生成=====//
	//シェイプオブジェクトの生成
	var backGround = new createjs.Shape();
	//ぬりつぶす（引数は色）
	backGround.graphics.beginFill("#fff");
	//四角形とする（引数はx,y,width,height）
	backGround.graphics.drawRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
	//ステージに追加
	gStage.addChild(backGround);

	//fps表示
	var fpsLabel = new createjs.Text("-- fps", "bold 18px Arial", "#000");
	gStage.addChild(fpsLabel);

	//FPSベース
	createjs.Ticker.setFPS(30);
	createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;

	var fileGroup = fileManager.getGroup("main");
	fileGroup.load();

	//タイマーイベント
	var bool = false;
	var bmp = null;
	createjs.Ticker.on("tick", function () {
		//mouseアップデート
		mouse.update();

		//更新メソッド
		if(!bool && fileGroup.loaded){
			bmp = new createjs.Bitmap(fileGroup.getResult("fig"));

			var bounds = bmp.getBounds();
			console.log(bounds.x + " " + bounds.y + " " + bounds.width + " " + bounds.height);
			console.log(bmp.image);

			var board = new Board(bmp, 4, 4);

			bool = true;
		}

		//fps計測
		fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS());

		gStage.update();
	});
};

function copyArray(arr){
	var newarr = [];
	for(var i = 0; i < arr.length; i++){
		if(Array.isArray(arr[i])){
			newarr[i] = copyArray(arr[i]);
		} else {
			newarr[i] = arr[i];
		}
	}
	return newarr;
}