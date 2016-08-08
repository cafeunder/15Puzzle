"use strict";

function Board(picture, xNum, yNum){
	this.xNum = xNum;
	this.yNum = yNum;

	var bounds = picture.getBounds();
	var cw = parseInt(bounds.width/xNum);
	var ch = parseInt(bounds.height/yNum);

	this.__pieces = new Array(xNum*yNum);
	for(var i = 0; i < this.__pieces.length; i++){
		var x = parseInt(i%xNum);
		var y = parseInt(i/xNum);

		//一枚絵から画像を切り取る
		var clip = clipBitmap(picture, cw*x, ch*y, cw, ch);
		//ピースを生成
		this.__pieces[i] = new Piece(x, y, xNum, yNum, i, clip);
	}

	//右下のピースは空きとする（クリア時に表示するので画像は保持してもらう）
	this.__pieces[xNum*yNum-1].setBlank(true);
}