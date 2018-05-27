//keydown事件表示键盘被按下
$(document).keydown(function(event) {
	switch (event.keyCode){
	   case 37://left
		   if(moveLeft()){
               setTimeout("generateOneNumber()", 210);
               setTimeout("isgameover()", 300);
		   }
		   break;
	   case 38://up
		   if(moveUp()){
               setTimeout("generateOneNumber()", 210);
               setTimeout("isgameover()", 300);
		   }
		   break;
	   case 39://right
		   if(moveRight()){
               setTimeout("generateOneNumber()", 210);
               setTimeout("isgameover()", 300);
		   }
		   break;
	   case 40://down
		   if(moveDown()){
               setTimeout("generateOneNumber()", 210);
               setTimeout("isgameover()", 300);
		   }
		   break;
	}
	
});


function moveLeft() {
	var flag = false;
	for(var i=0;i<4;i++){
		var cursor = -1;
		var wall= 0;
		if(board[i][0] != 0){
			++cursor;
			wall = board[i][0];
		}

		for(var j=1;j<4;j++){
			
		   if(board[i][j] == 0	)
				continue;

		   if(board[i][j] != wall || hasMerged[i][cursor]){
			   
			   if(j == cursor+1){
				   ++cursor;
				   wall = board[i][j];
				   continue;
			   }
			   
				board[i][++cursor] = board[i][j];
				wall = board[i][cursor];
				board[i][j]=0;
				flag = true;
				showMoveAnimation(i, j, i, cursor);
			}
		   else /*if(board[i][j] == wall )*/{
			   board[i][cursor] += board[i][j];
			   wall = board[i][cursor];
			   board[i][j]=0;
			   flag = true;
			   showMoveAnimation(i, j, i, cursor);
			   hasMerged[i][cursor]=true;
               score += board[i][cursor];
               updateScore(score);
		   }
		}
		
	}
    setTimeout("updateBoardView();",200);
	return flag;
	
}

function moveRight() {

	var flag = false;
	for(var i=0;i<4;i++){
		var cursor = 4;
		var wall= 0;
		if(board[i][3] != 0){
			--cursor;
			wall = board[i][3];
		}

		for(var j=2;j>=0;j--){
			
		   if(board[i][j] == 0)
				continue;

		   if(board[i][j] != wall || hasMerged[i][cursor]){
			   
			   if(j == cursor-1){
				   --cursor;
				   wall = board[i][j];
				   continue;
			   }
			   
				board[i][--cursor] = board[i][j];
				wall = board[i][cursor];
				board[i][j]=0;
				flag = true;
				showMoveAnimation(i, j, i, cursor);
			}
		   else /*if(board[i][j] == wall )*/{
			   board[i][cursor] += board[i][j];
			   wall = board[i][cursor];
			   board[i][j]=0;
			   flag = true;
			   showMoveAnimation(i, j, i, cursor);
			   hasMerged[i][cursor] = true;
			   score += board[i][cursor];
			   updateScore(score);
			   
		   }
		}
		
	}
    setTimeout("updateBoardView();",200);
	return flag;
	
}

function moveUp(){

	var flag = false;
	for(var j=0;j<4;j++){
		var cursor = -1;
		var wall= 0;
		if(board[0][j] != 0){
			++cursor;
			wall = board[0][j];
		}

		for(var i=1;i<4;i++){
			
		   if(board[i][j] == 0	)
				continue;

		   if(board[i][j] != wall || hasMerged[cursor][j]){
			   
			   if(i == cursor+1){
				   ++cursor;
				   wall = board[i][j];
				   continue;
			   }
			   
				board[++cursor][j] = board[i][j];
				wall = board[cursor][j];
				board[i][j]=0;
				flag = true;
				showMoveAnimation(i, j, cursor, j);
			}
		   else /*if(board[i][j] == wall )*/{
			   board[cursor][j] += board[i][j];
			   wall = board[cursor][j];
			   board[i][j]=0;
			   flag = true;
			   showMoveAnimation(i, j, cursor, j);
			   hasMerged[cursor][j] = true;
			   score += board[cursor][j];
			   updateScore(score);
		   }
		}
		
	}
    setTimeout("updateBoardView();",200);
	return flag;
	

}


function moveDown() {

	var flag = false;
	for(var j=0;j<4;j++){
		var cursor = 4;
		var wall= 0;
		if(board[3][j] != 0){
			--cursor;
			wall = board[3][j];
		}

		for(var i=2;i>=0;i--){
			
		   if(board[i][j] == 0	)
				continue;

		   if(board[i][j] != wall ||  hasMerged[cursor][j]){
			   
			   if(i == cursor-1){
				   --cursor;
				   wall = board[i][j];
				   continue;
			   }
			   
				board[--cursor][j] = board[i][j];
				wall = board[cursor][j];
				board[i][j]=0;
				flag = true;
				showMoveAnimation(i, j, cursor, j);
			}
		   else /*if(board[i][j] == wall )*/{
			   board[cursor][j] += board[i][j];
			   wall = board[cursor][j];
			   board[i][j]=0;
			   flag = true;
			   showMoveAnimation(i, j, cursor, j);
			   hasMerged[cursor][j] = true;
			   score += board[cursor][j];
			   updateScore(score);
		   }
		}
		
	}
    setTimeout("updateBoardView();",200);
	return flag;
		
}


function isgameover() {
	for(var i=0;i<4;i++){
		var interation =0;
		for(var j=0;j<4;j++){
			if(board[i][j] ==0 ){
				return;
			}
			else if(interation == board[i][j]){
				return;
			}
			else{
				interation = board[i][j];
			}

		}
	}
		
		for(var j=0;j<4;j++){
			var interation =0;
			for(var i=0;i<4;i++){
                if(interation == board[i][j]){
					return;
				}
				else{
					interation = board[i][j];
				}
			}		
	     }
	
	     gameover(); 
}

function gameover() {
    alert("gameover!");
    $("#grid-container").append("<div id='gameover' class='gameover'><p>恭喜丑丑，你终于得了一万零一分！！！<a href='javascript:restartgame();' id='restartgamebutton'>Restart</a></div>");
    var gameover = $("#gameover");
    gameover.css("width", "500px");
    gameover.css("height", "500px");
    gameover.css("background-color", "rgba(0, 0, 0, 0.5)");
}




