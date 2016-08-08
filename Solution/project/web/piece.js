"use strict";

function Piece(gx, gy, xNum, yNum, id, bitmap){
	this.point = new Point(gx, gy);
	this.xNum = xNum;
	this.yNum = yNum;
	this.id = id;
	this.blank = false;

	this.view = new __PieceView(bitmap);
	this.view.update(this);
}

Piece.prototype.slide = function(dir){
	this.point.moveDir(dir, this.xNum, this.yNum);
	this.view.update(this);
}

Piece.prototype.setBlank = function(flag){
	this.blank = flag;
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

	this.frame = new createjs.Shape();
	this.frame.graphics.setStrokeStyle(2);
	this.frame.graphics.beginStroke("#fff");
	this.frame.graphics.drawRect(0, 0, this.bmpWidth, this.bmpHeight);

	gStage.addChild(this.bitmap);
	gStage.addChild(this.frame);
}

__PieceView.prototype.update = function(piece){
	var gx = piece.point.x * this.bmpWidth;
	var gy = piece.point.y * this.bmpHeight;
	this.bitmap.x = gx;
	this.bitmap.y = gy;
	this.frame.x = gx;
	this.frame.y = gy;

	if(piece.blank){
		this.bitmap.visible = false;
	}
}