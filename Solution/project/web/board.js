"use strict";

function Board(picture, xNum, yNum){
	this.xNum = xNum;
	this.yNum = yNum;

	var bounds = picture.getBounds();
	this.clipWidth = parseInt(bounds.width/xNum);
	this.clipHeight = parseInt(bounds.height/yNum);

	this.__pieces = new Array(xNum*yNum);
	for(var i = 0; i < this.__pieces.length; i++){
		var x = parseInt(i%xNum);
		var y = parseInt(i/xNum);

		//一枚絵から画像を切り取る
		var clip = clipBitmap(picture, this.clipWidth*x, this.clipHeight*y, this.clipWidth, this.clipHeight);
		//ピースを生成
		this.__pieces[i] = new Piece(x, y, xNum, yNum, i, clip);
	}

	//右下のピースは空きとする（クリア時に表示するので画像は保持してもらう）
	this.blankID = xNum*yNum-1; 
	this.__pieces[this.blankID].setBlank(true);
}

Board.prototype.update = function(){
	if(gMouse.downFrame == 1){
		var mx = gMouse.x;
		var my = gMouse.y;

		var gp = new Point(parseInt(mx/this.clipWidth), parseInt(my/this.clipHeight));
		var dir = this.__pieces[this.blankID].point.calcDirectionTo(gp);

		if(dir != null){
			//クリックした位置にいるピースを検索
			var slideID = null;
			for(var id in this.__pieces){
				if(this.__pieces[id].point.equals(gp)){
					slideID = id;
					break;
				}
			}

			this.__pieces[this.blankID].slide(dir);
			this.__pieces[slideID].slide(opposite(dir));
		}
	}
}