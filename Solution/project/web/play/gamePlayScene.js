"use strict";

//ゲームプレイを表すシーンクラス
function GamePlayScene(){
	Scene.call(this);

	this.fileGroup = gFileManager.getGroup("main");
	this.fileGroup.load();
	this.enable = false;
}
Inherits(GamePlayScene, Scene);	//継承

//ファイルが読み込まれたら準備OK
GamePlayScene.prototype.isReady = function(){
	return this.fileGroup.loaded;
}

//初期化メソッド
GamePlayScene.prototype.initialize = function(){
	//ボードを生成する
	var bmp = new createjs.Bitmap(this.fileGroup.getResult("fig"));
	var bounds = bmp.getBounds();

	this.board = new Board(bmp, 4, 4, this.__container);
}

//ファイルをアンロード
GamePlayScene.prototype.finalize = function(){
	this.fileGroup.unload();
}

//更新メソッド
GamePlayScene.prototype.update = function(){
	if(this.enable){
		this.board.update();
	}
}

//ゲームスタートするメソッド
GamePlayScene.prototype.start = function(){
	this.enable = true;

	//シャッフル
	this.board.shuffle(100);
	//任意。ゲーム開始時のブランク位置を固定するなら
	this.board.setBlankLowerRight();
}