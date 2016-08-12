"use strict";

//キャンバスの横幅と縦幅
var STAGE_HEIGHT, STAGE_WIDTH;
//グローバル宣言されたステージオブジェクト
var gStage;

onload = function(){
	//ステージの生成（引数はキャンバスID）
	gStage = new createjs.Stage("myCanvas");

	//マウスオブジェクトの生成
	mouseInitialize(gStage);
	//キーボードオブジェクトの生成
	keyboardInitialize();

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

	//=====システム背景の生成=====//
	//シェイプオブジェクトの生成
	var backGround = new createjs.Shape();
	//ぬりつぶす（引数は色）
	backGround.graphics.beginFill("#fff");
	//四角形とする（引数はx,y,width,height）
	backGround.graphics.drawRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
	//深度を一番深く設定
	backGround.depth = Number.POSITIVE_INFINITY;
	//ステージに追加
	gStage.addChild(backGround);

	//fps表示
	var fpsLabel = new createjs.Text("-- fps", "bold 18px Arial", "#000");
	fpsLabel.visible = false;
	//深度を一番浅く設定
	fpsLabel.depth = 0;
	gStage.addChild(fpsLabel);

	//FPSベース
	createjs.Ticker.setFPS(30);
	createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;

	var gp = new GamePlayScene();
	gSceneManager.change(gp);
	gSceneManager.add(new GameStartScene(gp));

	//タイマーイベント
	var initialized = false;
	var bmp = null;
	var board;
	createjs.Ticker.on("tick", function () {
		//mouseアップデート
		gMouse.update();
		//keyboardアップデート
		gKeyboard.update();

		//処理本体
		gSceneManager.update();


		//fps計測
		if(gKeyboard.getKeyCount(KEY_CODE_F) == 1){ fpsLabel.visible = !fpsLabel.visible; }
		fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS());

		gStage.update();
	});
};

//オブジェクトが持っているdepthの値で階層をソート
//depthが無指定なら一番下になる
function SortStageDepth(){
	gStage.sortChildren(
		function(a, b){
			var aDepth = (a.depth == undefined) ? Number.POSITIVE_INFINITY : a.depth;
			var bDepth = (b.depth == undefined) ? Number.POSITIVE_INFINITY : b.depth;
			return bDepth - aDepth;
		}
	);
}