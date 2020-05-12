/* ライフゲーム全体で使用するグローバル変数 */
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var cellSize = 10;
var day = 0;


// マウスの位置情報を記録する変数
var mouseX = 0;
var mouseY = 0;
var cellLeft = 0;
var cellTop = 0;
var mouseout = false;


// 現在選択しているセルのIDを記録する
var select = null;

/* イベントの登録 */
function onDown(e){    
    // クリックした位置のオブジェクトのIDをselectに代入して
    // drawScreen()に処理を任せる
    var mousePoint = new Point(cellLeft,cellTop);
    var objID = null;
    var inObject = function(objects){
        for(obj of objects){
            var objPoint = new Point(obj.x,obj.y);
            if(objPoint.eq(mousePoint)){
                return obj.id;
            }
        }
        return null;
    }
    for(objects of allObjects){
        objID = inObject(objects);
        if(objID != null){
            select = objID;
            break;
        }
    }
    
    
    // shift + click で壁を生成
    if(e.shiftKey){
        var intervalID2 = setInterval(function(){
            
            // カーソルがキャンパス外に出た場合、処理を終了
            if(mouseout){
               clearInterval(intervalID2);
            }
            
            mousePoint = new Point(cellLeft,cellTop);
            
            // オブジェクトがあった場合、それを削除する
            for(objects of allObjects){
                for(var i=0;i<objects.length;i++){
                    if(mousePoint.eq(objects[i])){
                        objects.splice(i,1);
                        break;
                    }
                }
            }
            createWall(cellLeft,cellTop);
            //console.log(walls);
            
            // クリックを終えたとき、処理を終了
            canvas.onmouseup = function(e){
                if(e.button == 0){
                    clearInterval(intervalID2);
                }
            }
        },20);
    }

    
    // alt + click で壁を削除
    if(e.altKey){
        var intervalID2 = setInterval(function(){
            
            // カーソルがキャンパス外に出た場合、処理を終了
            if(mouseout){
               clearInterval(intervalID2);
            }
            
            mousePoint = new Point(cellLeft,cellTop);
            
            // 壁オブジェクトがあった場合、それを削除する
            for(var i=0;i<walls.length;i++){
                if(mousePoint.eq(walls[i])){
                    walls.splice(i,1);
                    
                    // gameRoutineに依存せず即座に描画
                    context.fillStyle ="rgb(100,100,100)";
                    context.fillRect(cellLeft,cellTop,cellSize,cellSize);
                    break;
                }
            }

            // クリックを終えたとき、処理を終了
            canvas.onmouseup = function(e){
                if(e.button == 0){
                    clearInterval(intervalID2);
                }
            }
        },20);
    }
}


function onUp(e){
    //console.log("onUp");
}

function onClick(e){
    //console.log("click");
}

function onOver() {
    //console.log("mouseover");
    mouseout = false;
}

function onOut(e){
    //console.log("mouseout");
    mouseout = true;

}

function onMove(e){
    // カーソルが動いた場合、キャンパス内のカーソルの座標を更新
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    cellLeft = (Math.floor(mouseX/10))*10;
    cellTop = (Math.floor(mouseY/10))*10;
  
}


function eventRegister(){
    /* 
        eventRegisterは簡潔さを保つためにイベントを登録するだけの機能にする
        具体的な処理は原則的にすべてeventListenerに登録した関数内に記述する
    */
    canvas.addEventListener('mousedown', onDown, false);
    canvas.addEventListener('mouseup', onUp, false);
    canvas.addEventListener('click', onClick, false);
    canvas.addEventListener('mouseover', onOver, false);
    canvas.addEventListener('mouseout', onOut, false);
    canvas.addEventListener('mousemove',onMove,false);
  
}


// animal,plant共通
class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    eq(point){
        if(this.x == point.x && this.y == point.y){
            return true;
        }
        return false;
    }
    set(x,y){
        this.x = x;
        this.y = y;
    }
}
function sum(arr){
    var s = 0;
    arr.forEach(function(elm){
        s += elm;
    });
    return s;
}
function getRandomInt(min,max){
    var rand = Math.floor(Math.random()*(max+1-min))+min;
    return rand;
}
function deepCopyArray(sourceArray){
    var newArray = [];
    for(s of sourceArray){
        newArray.push(s);
    }
    return newArray;
}