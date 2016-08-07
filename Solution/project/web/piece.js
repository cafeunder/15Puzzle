"use strict";

function Piece(gx, gy, xNum, yNum, id, bitmap){
	this.__p = new Point(gx, gy);
	this.xNum = xNum;
	this.yNum = yNum;
	this.id = id;

	this.view = new __PieceView(bitmap);
	this.view.update(this);
}

Piece.prototype.slide = function(dir){
	this.__p.moveDir(dir, this.xNum, this.yNum);
	this.view.update(this);
}

//------------------------------------//
//                View                //
//------------------------------------//
function __PieceView(bitmap){
	this.bitmap = bitmap;
	
	var bounds = bitmap.getBounds();
	this.bmpWidth = bounds.width;
	this.bmpHeight = bounds.height;
}

__PieceView.prototype.update = function(piece){
	this.bitmap.x = piece.__p.x * this.bmpWidth;
	this.bitmap.y = piece.__p.y * this.bmpHeight;
}