"use strict";

var gSceneManager = new SceneManager();
//---------------------------------------//
//              SceneManager             //
//---------------------------------------//

//プログラムのシーケンス制御を行うマネージャクラス
function SceneManager(){
	//準備中のシーンを管理する配列
	this.__preparingScenes = new Array();
	//アクティブなシーンを管理する配列
	this.__activeScenes = new Array();
	//このフレームで破棄するシーンを管理する配列
	this.__finalizeScenes = new Array();
}

//更新メソッド
SceneManager.prototype.update = function(){
	//===準備中のシーンを管理===//
	for(var i = 0; i < this.__preparingScenes.length; i++){
		//準備ができているなら
		var scene = this.__preparingScenes[i];
		if(scene.isReady()){
			//アクティブシーン配列に追加
			this.__activeScenes.push(scene);
			//配列のインデックス+1をdepthに指定
			scene.__container.depth = this.__activeScenes.length;

			//準備中シーン配列から削除
			this.__preparingScenes.splice(i, 1);
			i--;

			//ステージに乗せて、初期化メソッドを呼び出す
			gStage.addChild(scene.__container);
			scene.initialize();

			//ステージの階層をソート
			SortStageDepth();
		}
	}

	//===アクティブなシーンを管理===//
	for(var i = 0; i < this.__activeScenes.length; i++){
		this.__activeScenes[i].update();
	}

	//===破棄するシーンを管理===//
	for(var i = 0; i < this.__finalizeScenes.length; i++){
		//破棄メソッドを呼び出して、ステージから下ろす
		this.__finalizeScenes[i].finalize();
		gStage.removeChild(this.__finalizeScenes[i].__container);

		//アクティブシーン配列から削除
		for(var j = 0; j < this.__activeScenes.length; j++){
			if(this.__finalizeScenes[i] == this.__activeScenes[j]){
				this.__activeScenes.splice(j, 1);
			}
		}
	}
	//毎フレーム初期化する
	this.__finalizeScenes.length = 0;
}

//シーンを切り替えるメソッド
//今アクティブなシーンはすべて破棄される
SceneManager.prototype.change = function(scene){
	//アクティブなシーンの配列を、破棄するシーンの配列にコピー
	this.__finalizeScenes = copyArray(this.__activeScenes);
	//他の配列は初期化
	this.__activeScenes.length = 0;
	this.__preparingScenes.length = 0;

	//シーンを追加する
	this.__preparingScenes.push(scene);
}

//シーンを追加するメソッド
SceneManager.prototype.add = function(scene){
	this.__preparingScenes.push(scene);
}

//シーンを破棄するメソッド
SceneManager.prototype.remove = function(scene){
	this.__finalizeScenes.push(scene);
}

//シーンの深度をセットするメソッド
SceneManager.prototype.setDepth = function(scene, depth){
	var index = this.__activeScenes.indexOf(scene);
	//今あるインデックスから削除
	this.__activeScenes.splice(index, 1);
	//指定されたインデックスへ追加
	this.__activeScenes.splice(depth-1, 0, scene);

	//今あるインデックス+1を深度とする
	for(var i = 0; i < this.__activeScenes.length; i++){
		this.__activeScenes[i].__container.depth = i+1;
	}

	SortStageDepth();
}