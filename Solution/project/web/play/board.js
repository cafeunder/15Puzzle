"use strict";

function Board(picture, xNum, yNum, container){
	this.__container = container;

	//ボードのサイズ
	this.xNum = xNum;
	this.yNum = yNum;

	//ピースのサイズ
	var bounds = picture.getBounds();
	this.clipWidth = parseInt(bounds.width/xNum);
	this.clipHeight = parseInt(bounds.height/yNum);

	//ピースを格納する配列
	this.__pieces = new Array(xNum*yNum);
	//IDをインデックスにとり、そのIDがいる線形の位置を返す配列
	this.__linearPointToID = new Array(xNum*yNum);

	//ピースの初期化
	for(var i = 0; i < this.__pieces.length; i++){
		//idに対応するピースの位置
		var x = parseInt(i%xNum);
		var y = parseInt(i/xNum);

		//一枚絵から画像を切り取る
		var clip = clipBitmap(picture, this.clipWidth*x, this.clipHeight*y, this.clipWidth, this.clipHeight);
		//ピースを生成
		var view = new PieceView(clip, this.__container);
		this.__pieces[i] = new Piece(x, y, xNum, yNum, i, view);
		this.__linearPointToID[i] = i;
	}

	//右下のピースは空きとする（クリア時に表示するので画像は保持してもらう）
	this.blankID = xNum*yNum-1; 
	this.__pieces[this.blankID].setBlank(true);
}

Board.prototype.update = function(){
	//マウスが押されていたら
	if(gMouse.downFrame == 1){
		//マウス位置
		var mx = gMouse.x;
		var my = gMouse.y;

		//クリックしたボード上の位置
		var gp = new Point(parseInt(mx/this.clipWidth), parseInt(my/this.clipHeight));
		//ブランクから見たgpの方向（隣接していなければnullが返る）
		var dir = this.__pieces[this.blankID].point.calcDirectionTo(gp);

		if(dir != null){
			//ブランクとクリックしたピースをスライド
			this.swap(this.__pieces[this.blankID], dir);
		}
	}
}

//fromに指定されたピースを、dir方向へスライドするメソッド
Board.prototype.swap = function(from, dir){
	//fromから見たdir方向の位置を計算
	var toPoint = from.point.dirPoint(dir, this.xNum, this.yNum);
	if(toPoint == null){ return; }

	//スワップ先のピースを取得
	var to = this.__pieces[this.__linearPointToID[toPoint.y * this.xNum + toPoint.x]];

	//fromのいる位置にtoのIDを、toのいる位置にfromのIDをセット
	this.__linearPointToID[from.point.y * this.xNum + from.point.x] = to.id;
	this.__linearPointToID[to.point.y * this.xNum + to.point.x] = from.id;

	//スライド
	from.slide(dir);
	to.slide(opposite(dir));
}

//盤面を指定回数シャッフルするメソッド
Board.prototype.shuffle = function(num){
	var blank = this.__pieces[this.blankID];
	var movable = new Array(4);

	//右下にあることを前提に初期化
	var dir = POINT_UP;
	for(var i = 0; i < num; i++){
		var count = 0;
		
		//上
		if((blank.point.y != 0) && (opposite(dir) != POINT_UP)){
			movable[count] = POINT_UP;
			count++;
		}
		//右に曲ガール
		if((blank.point.x != this.xNum-1) && (opposite(dir) != POINT_RIGHT)){
			movable[count] = POINT_RIGHT;
			count++;
		}
		//下
		if((blank.point.y != this.yNum-1) && (opposite(dir) != POINT_DOWN)){
			movable[count] = POINT_DOWN;
			count++;
		}
		//左
		if((blank.point.x != 0) && (opposite(dir) != POINT_LEFT)){
			movable[count] = POINT_LEFT;
			count++;
		}

		//進める方向からランダムに決定
		dir = movable[parseInt(Math.random()*count)];

		//スワップ
		this.swap(blank, dir);
	}
}

//ブランクを右下へ移動させるメソッド
Board.prototype.setBlankLowerRight = function(){
	var blank = this.__pieces[this.blankID];

	//一番下に行くまで
	while(blank.point.y != this.yNum-1){
		this.swap(this.__pieces[this.blankID], POINT_DOWN);
	}
	//一番右に行くまで
	while(blank.point.x != this.xNum-1){
		this.swap(this.__pieces[this.blankID], POINT_RIGHT);
	}
}