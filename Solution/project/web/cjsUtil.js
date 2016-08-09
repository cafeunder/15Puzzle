"use strict";

//Bitmapから一部を切り取って新しいBitmapを作る関数
//速度は測定していない。遅いかも
function clipBitmap(bitmap, clipX, clipY, clipWidth, clipHeight){
	var img = bitmap.image;

	//context化のためのcanvasを新しく生成する
	var clipCanvas = document.createElement("canvas");
	clipCanvas.setAttribute("width",clipWidth);
	clipCanvas.setAttribute("height",clipHeight);

	//contextを取得
	var context = clipCanvas.getContext("2d");

	//描画
	context.drawImage(img, clipX, clipY, clipWidth, clipHeight, 0, 0, clipWidth, clipHeight);

	//Bitmapを生成
	return new createjs.Bitmap(clipCanvas);
}