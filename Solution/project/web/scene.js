"use strict";

//--------------------------------//
//              Scene             //
//--------------------------------//

//シーケンス処理におけるシーンを表す基底クラス
//シーンは必ずコンテナを持っており、gStageに直接addしないようにする
function Scene(){
	this.__container = new createjs.Container();
}

//シーンを実行する準備ができているかどうかを返すメソッド
Scene.prototype.isReady = function(){
	return true;
}

//isReadyがtrueになったときに呼び出される初期化メソッド
Scene.prototype.initialize = function(){
	halt(true, this.constructor+"のinitializeメソッドが未定義です。");
}

//シーンが破棄されたときに呼び出されるメソッド
Scene.prototype.finalize = function(){
	halt(true, this.constructor+"のfinalizeメソッドが未定義です。");
}

//更新メソッド
Scene.prototype.update = function(){
	halt(true, this.constructor+"のupdateメソッドが未定義です。");
}