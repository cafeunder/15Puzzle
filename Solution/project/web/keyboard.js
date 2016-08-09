"use strict";

var gKeyboard;
function keyboardInitialize(){
	gKeyboard = new Keyboard();
	window.addEventListener("keydown", function(event){ gKeyboard.keyDown(event); });
	window.addEventListener("keyup", function(event){ gKeyboard.keyUp(event); });
}

//----------------------------------------//
//                Keyboard                //
//----------------------------------------//
function Keyboard(){
	this.__keyDownFlagList = new Array(256);
	this.__keyCountList = new Array(256);
	for(var i = 0; i < this.__keyCountList.length; i++){
		this.__keyDownFlagList[i] = false;
		this.__keyCountList[i] = 0;
	}
}

Keyboard.prototype.keyDown = function(event){
	this.__keyDownFlagList[event.keyCode] = true;
}
Keyboard.prototype.keyUp = function(event){
	this.__keyDownFlagList[event.keyCode] = false;
}

Keyboard.prototype.update = function(){
	for(var i = 0; i < this.__keyCountList.length; i++){
		if(this.__keyDownFlagList[i]){
			this.__keyCountList[i]++;
		} else {
			this.__keyCountList[i] = 0;
		}
	}
}

//キーコードを受け取って押されたフレーム数を返すメソッド
Keyboard.prototype.getKeyCount = function(keycode){
	return this.__keyCountList[keycode];
} 



//キーコード一覧（最低限のものだけ）
var KEY_CODE_TAB = 9;
var KEY_CODE_ENTER = 13;
var KEY_CODE_SHIFT = 16;
var KEY_CODE_CTRL = 17;
var KEY_CODE_SPACE = 32;
var KEY_CODE_LEFT = 37;
var KEY_CODE_UP = 38;
var KEY_CODE_RIGHT = 39;
var KEY_CODE_UP = 40;
var KEY_CODE_A = 65;
var KEY_CODE_B = 66;
var KEY_CODE_C = 67;
var KEY_CODE_D = 68;
var KEY_CODE_E = 69;
var KEY_CODE_F = 70;
var KEY_CODE_G = 71;
var KEY_CODE_H = 72;
var KEY_CODE_I = 73;
var KEY_CODE_J = 74;
var KEY_CODE_K = 75;
var KEY_CODE_L = 76;
var KEY_CODE_M = 77;
var KEY_CODE_N = 78;
var KEY_CODE_O = 79;
var KEY_CODE_P = 80;
var KEY_CODE_Q = 81;
var KEY_CODE_R = 82;
var KEY_CODE_S = 83;
var KEY_CODE_T = 84;
var KEY_CODE_U = 85;
var KEY_CODE_V = 86;
var KEY_CODE_W = 87;
var KEY_CODE_X = 88;
var KEY_CODE_Y = 89;
var KEY_CODE_Z = 90;
var KEY_CODE_ESC = 243;