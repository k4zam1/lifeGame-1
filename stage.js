// ステージの追加
map.stageFile.addEventListener("change", function(e) {

    var result = e.target.files[0];

    //FileReaderのインスタンスを作成する
    var reader = new FileReader();

    //読み込んだファイルの中身を取得する
    reader.readAsText(result);

    //ファイルの中身を取得後、二次元配列でstageLayoutに代入
    reader.addEventListener("load", function() {

        // 改行を区切りとして行を要素とした配列を生成
        var tmp = reader.result.split("\n");

        // 各行ごとカンマで区切った文字列を要素とした二次元配列を生成
        for(var i=0;i<tmp.length;++i){
            stageLayout[i] = tmp[i].split(",");
        }
    })
})


function createStage(){
    var allObjects = [Plant.list,Resource.list,Animal.list,Predator.list,Wall.list];
    for(var i=0; i<stageLayout.length; i++){
        for(var j=0; j<stageLayout[i].length; j++){
            if(stageLayout[i][j] == 1){
                wall_count += 1;
                var p = new Point(cellSize*j,cellSize*i);
                Wall.create(p,allObjects);
            }      
        }
    }
}