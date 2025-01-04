var board = new Array();
var hasMerged = new Array();//用来标识数字格是不是合并后的，true标识是合并过的
var score = 0;




$(function () {
	newgame();
});

function newgame() {
    //初始化棋盘格和数字格
	 init();
    //在随机两个格子生成数字
     generateOneNumber();
     generateOneNumber();
}

function restartgame() {
    $("#gameover").remove();
    updateScore(0);
    newgame();
}

/*初始出来一个棋盘，然后在棋盘上初始化出来一个数字格，数字格中的数字都是0*/
function init() {
	for(var i=0;i<4;i++){
		board[i]= new Array();
	    hasMerged[i]=new Array();
	    
		for(var j=0;j<4;j++){
			board[i][j]=0;
			hasMerged[i][j]=false;
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css("top",getPosTop(i,j));
			gridCell.css("left",getPosLeft(i,j));
		}
	}
	
	updateBoardView();
	score =0;
	
}
/*创建数字格，如果是空的，则就是一个点，如果有数字则显示和棋盘一般大的块*/
function updateBoardView() {
    $(".number-cell").remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
			var numberCell = $("#number-cell-"+ i + "-"+ j);
			if(board[i][j] == 0){
				numberCell.css("width","0px");
				numberCell.css("height","0px");
				numberCell.css("top",getPosTop(i, j)+50);
				numberCell.css("left",getPosLeft(i, j)+50);
				
			}
			else{
				
                numberCell.css("width", "100px");
                numberCell.css("height", "100px");
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);

			}
			hasMerged[i][j]=false;
		}
		
	}
	 //设置数字值的字体样式
    $(".number-cell").css("line-height", "100px");
    $(".number-cell").css("font-size", "60px");

	
}

//生成一个随机位置的随机数字
function generateOneNumber() {
	//1,生成一个随机位置
	var randx = parseInt(Math.floor(Math.random()*4));
	var randy = parseInt(Math.floor(Math.random()*4));
	while(true){
		if(board[randx][randy] ==0)
			break;    //如果该位置上没有数可以，否则再生成一个随机位置，直到找到空位置
	    randx = parseInt(Math.floor(Math.random()*4));
	    randy = parseInt(Math.floor(Math.random()*4));	
	}
	
	//2,生成一个随机数,按照游戏规则，只能是2或4
	
	var num = Math.random() < 0.5?2:4;
	
	//3，随机数保存在全局数组中，然后动画方式显示在随机位置上
	board[randx][randy] = num;
	showNumberWithAnimation(randx,randy,num);
	
	
}
