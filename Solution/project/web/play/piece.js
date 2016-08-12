"use strict";

//-------------------------------------//
//                Piece                //
//-------------------------------------//
//ピースを表すクラス
function Piece(gx, gy, xNum, yNum, id, view){
	this.__homePoint = new Point(gx, gy);
	this.point = new Point(gx, gy);
	this.xNum = xNum;
	this.yNum = yNum;
	this.id = id;
	this.view = view;

	this.view.update(this);
	this.blank = false;
}

//指定された方向へスライドするメソッド
Piece.prototype.slide = function(dir){
	this.point.moveDir(dir, this.xNum, this.yNum);
	this.view.update(this);
}

//このピースをブランクとして設定する
Piece.prototype.setBlank = function(flag){
	this.blank = flag;
	this.view.update(this);
}

//正しい位置にいるか？
Piece.prototype.isCorrect = function(){
	return this.point.equals(this.__homePoint);
}

//------------------------------------//
//                View                //
//------------------------------------//
function PieceView(bitmap, container){
	this.__bitmap = bitmap;
	
	//テキストの生成
	this.__numText = new createjs.Text("/N", "48px sans-serif", "rgba(250,250,250,0.7)");
	this.__numText.textAlign = "center";
	this.__numText.textBaseline = "middle";

	//ピースのサイズを取得
	var bounds = bitmap.getBounds();
	this.__bmpWidth = bounds.width;
	this.__bmpHeight = bounds.height;

	//ピースのフレームを生成
	this.__frame = new createjs.Shape();
	this.__frame.graphics.setStrokeStyle(2);
	this.__frame.graphics.beginStroke("#fff");
	this.__frame.graphics.drawRect(0, 0, this.__bmpWidth, this.__bmpHeight);

	//コンテナに画像とフレームを追加
	container.addChild(this.__bitmap);
	container.addChild(this.__frame);
	container.addChild(this.__numText);
}

PieceView.prototype.update = function(piece){
	var gx = piece.point.x * this.__bmpWidth;
	var gy = piece.point.y * this.__bmpHeight;

	this.__bitmap.x = gx;
	this.__bitmap.y = gy;
	this.__frame.x = gx;
	this.__frame.y = gy;
	this.__numText.x = gx + this.__bmpWidth/2;
	this.__numText.y = gy + this.__bmpHeight/2;
	this.__numText.text = (piece.id + 1) + "";

	if(piece.blank){
		this.__bitmap.visible = false;
		this.__frame.visible = false;
		this.__numText.visible = false;
	}
}