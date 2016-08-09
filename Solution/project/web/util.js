"use strict";

//アサート判定してアラートを出すメソッド
function halt(cond){
	if(cond === true){
		console.assert(false);
		alert("アサートが発生しました。コンソールを確認してください。");
	}
}

//値が整数かどうかを判定するメソッド
function isInteger(x) {
    return Math.round(x) === x;
}

//配列をディープコピーする関数
function copyArray(arr){
	if(Array.isArray(arr)){ return null; }

	var newarr = new Array();
	for(var i = 0; i < arr.length; i++){
		if(Array.isArray(arr[i])){
			newarr[i] = copyArray(arr[i]);
		} else {
			newarr[i] = arr[i];
		}
	}
	return newarr;
}


//------------------------------------//
//                Stack               //
//------------------------------------//
function Stack() {
	this.__a = new Array();
}

Stack.prototype.clone = function(){
	var result = new Stack();
	result.fromArray(this.__a);
	return result;
}

Stack.prototype.fromArray = function(a){
	this.__a = copyArray(a);
}

Stack.prototype.push = function(o) {
	this.__a.push(o);
}

Stack.prototype.pop = function() {
	if( this.__a.length > 0 ){
		return this.__a.pop();
	}
	return null;
}

Stack.prototype.peak = function(){
	if( this.__a.length > 0 ){
		return this.__a[this.__a.length-1];
	}
	return null;
}

Stack.prototype.size = function(){
	return this.__a.length;
}

Stack.prototype.debugLog = function(){
	console.log(this.__a + " >>");
}


//------------------------------------//
//                Queue               //
//------------------------------------//
//低速つき取り扱い注意
function Queue(){
	this.__a = new Array();
}

Queue.prototype.clone = function(){
	var result = new Queue();
	result.fromArray(this.__a);
	return result;
}

Queue.prototype.fromArray = function(a){
	this.__a = copyArray(a);
}

Queue.prototype.enque = function(o){
	this.__a.push(o);
}

Queue.prototype.deque = function(){
	if( this.__a.length > 0 ) {
		return this.__a.shift();
	}
	return null;
}

Queue.prototype.peak = function(){
	if( this.__a.length > 0 ){
		return this.__a[0];
	}
	return null;
}

Queue.prototype.size = function(){
	return this.__a.length;
}

Queue.prototype.debugLog = function(){
	console.log("<< " + this.__a);
}



//------------------------------------//
//                Point               //
//------------------------------------//
//上下左右を定義する定数
var POINT_UP = 0;
var POINT_RIGHT = 1;
var POINT_DOWN = 2;
var POINT_LEFT = 3;

//離散空間におけるx,y座標をまとめて管理するクラス
function Point(x,y){
	this.x = x;
	this.y = y;
}

Point.prototype.clone = function(){
	return new Point(this.x, this.y);
}

Point.prototype.equals = function(p){
	return (this.x == p.x && this.y == p.y);
}

//指定された方向へx,yを書き換えるメソッド
//xNum, yNumは省略可
Point.prototype.moveDir = function(d, xNum, yNum){
	switch(d){
	case POINT_UP:
		if(this.y-1 >= 0){
			this.y--;
			return true;
		}
		break;
	case POINT_DOWN:
		if(yNum != undefined && this.y+1 < yNum){
			this.y++;
			return true;
		}
		break;
	case POINT_LEFT:
		if(this.x-1 >= 0){
			this.x--;
			return true;
		}
		break;
	case POINT_RIGHT:
		if(xNum != undefined && this.x+1 < xNum){
			this.x++;
			return true;
		}
		break;
	}
	return false;
}

//引数pが自身から見てどの方向にあるかを返すメソッド
Point.prototype.calcDirectionTo = function(p){
	var dx = this.x - p.x;
	var dy = this.y - p.y;

	if(dx == -1 && dy == 0){
		return POINT_RIGHT;
	}
	if(dx == 1 && dy == 0){
		return POINT_LEFT;
	}
	if(dy == -1 && dx == 0){
		return POINT_DOWN;
	}
	if(dy == 1 && dx == 0){
		return POINT_UP;
	}

	return null;
}

//自身から指定された方向を見たときの座標を返すメソッド
//xNum, yNumは省略可
Point.prototype.dirPoint = function(d, xNum, yNum){
	switch(d){
	case POINT_UP:
		if(this.y-1 >= 0){
			return new Point(this.x, this.y-1);
		}
		break;
	case POINT_DOWN:
		if(yNum != undefined && this.y+1 < yNum){
			return new Point(this.x, this.y+1);
		}
		break;
	case POINT_LEFT:
		if(this.x-1 >= 0){
			return new Point(this.x-1, this.y);
		}
		break;
	case POINT_RIGHT:
		if(xNum != undefined && this.x+1 < xNum){
			return new Point(this.x+1, this.y);
		}
		break;
	}
	return null;
}

//方向を表す定数を受け取って、反対方向の定数を返すメソッド
function opposite(dir){
	switch(dir){
	case POINT_UP:
		return POINT_DOWN;
	case POINT_DOWN:
		return POINT_UP;
	case POINT_LEFT:
		return POINT_RIGHT;
	case POINT_RIGHT:
		return POINT_LEFT;
	}
}