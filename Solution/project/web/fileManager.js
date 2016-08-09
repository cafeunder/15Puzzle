﻿"use strict";

var gFileManager = new FileManager();
//-------------------------------------//
//             FileManager             //
//-------------------------------------//
function FileManager(){
	//以下に読み込む画像を指定します。
	//読み込みのタイミングが同じファイル同士をグループ化してください。	
	var manifests = {
		"main" : [
			{"id":"fig", "src":"img/sepia.png"},
		],
	};

	//ファイルグループの作成
	this.__fileGroup = new Object();
	for(var key in manifests){
		this.__fileGroup[key] = new FileGroup(manifests[key]);
	}
}

//指定されたグループの画像を読み込むメソッド
FileManager.prototype.load = function(groupID){
	halt(this.__fileGroup[groupID] == undefined);
	this.__fileGroup[groupID].load();
}

//指定されたグループの画像を破棄するメソッド
FileManager.prototype.unload = function(groupID){
	halt(this.__fileGroup[groupID] == undefined);
	this.__fileGroup[groupID].unload();
}

//指定されたグループが読み込み済みかを調べるメソッド
FileManager.prototype.isLoaded = function(groupID){
	halt(this.__fileGroup[groupID] == undefined);
	return this.__fileGroup[groupID].loaded;
}

//指定されたグループの読み込み進捗を返すメソッド
FileManager.prototype.getProgress = function(groupID){
	halt(this.__fileGroup[groupID] == undefined);
	return this.__fileGroup[groupID].progress();
}

//グループIDとファイルIDを受け取ってFileオブジェクトを返すメソッド
FileManager.prototype.getResult = function(groupID, fileID){
	halt(this.__fileGroup[groupID] == undefined);
	return this.__fileGroup[groupID].getResult(fileID);
}

//指定されたグループを返すメソッド
FileManager.prototype.getGroup = function(groupID){
	halt(this.__fileGroup[groupID] == undefined);
	return this.__fileGroup[groupID];
}


//------------------------------------//
//              FileGroup             //
//------------------------------------//
function FileGroup(manifest){
	this.loaded = false;
	this.__lock = false;
	this.__manifest = manifest;
	this.__queue = new createjs.LoadQueue(true);	

	var instance = this;
	this.__queue.addEventListener("complete", function(){ instance.loaded = true; });
	this.__queue.addEventListener("progress", function(){ console.log("Progress:", instance.__queue.progress); });
}

//ロードを開始するメソッド
FileGroup.prototype.load = function(){
	if(this.__lock) { return; }
	this.__lock = true;

	this.__queue.loadManifest(this.__manifest, true);
}

//ロードしたファイルを削除するメソッド
FileGroup.prototype.unload = function(){
	this.__queue.removeAll();
	this.__lock = false;
	this.loaded = false;
}

//ロード状態を返すメソッド
FileGroup.prototype.progress = function(){
	return this.__queue.progress;
}

//ロードしたファイルを返すメソッド
FileGroup.prototype.getResult = function(fileID){
	halt(!this.loaded);

	var result = this.__queue.getResult(fileID);
	halt(result == null);

	return result;
}