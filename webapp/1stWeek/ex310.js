//アプリケーション中に使う変数を定義
var timer;
var start;
var isStarted = false;
var keika=0;

//DOMで操作する要素を代入
var startButton = document.getElementById('start');
var stopButton  = document.getElementById('stop');
var resetButton = document.getElementById('reset');
var watch       = document.querySelector('.stopwatch p');

//イベント監視
startButton.addEventListener('click', watchStart, false);
stopButton. addEventListener('click', watchStop, false);
resetButton.addEventListener('click', watchReset, false);

//開始ボタンのイベントハンドラー
function watchStart(){
  if (! isStarted) {
    // Date() はミリ秒単位の現在時刻を出力する関数
    start = new Date();
    // setIntervalは第２引数で指定した間隔（ミリ秒単位）ごとに
    // 第１引数で指定した関数を呼び出す関数
    timer = setInterval(updateWatch, 1000/60);
    // ここでは 1/60 秒に１度 updateWatch を呼び出すと指定
    isStarted = true;
  }
}
//停止ボタンのイベントハンドラー（仕様(7)を満たすためには改造が必要）
function watchStop(){
  if ( isStarted ) {
    // clearIntervalはsetIntervalを停止する関数
    clearInterval(timer);
    isStarted = false;
    var w_start =  new Date();
    keika = keika + (w_start -start);
  }
}
//リセットボタンのイベントハンドラー（仕様(6)を満たすためには改造が必要）
function watchReset(){
  //watchStop();
  // DOM の watch ノードのHTML記述を更新することでゼロにリセット
  if(isStarted == false){
	  watch.innerHTML = "00:00:00:0";
	}
}
//計測中の時刻計算用関数
function updateWatch() {
  //現在時間を date に代入
  var date = new Date();
  //ここで diff という変数を定義し、現在時刻とスタートした時刻の差分を代入
  diff = date.getTime()-start.getTime()+keika;
  //するコードを以下に書くこと。具体的には date と start オブジェクトの
  //getTime() メソッドの返り値を用いて計算すること。 getTime() メソッドは、
  //オブジェクト内に格納されているミリ秒単位の時刻を出力する。
  //時、分、秒、デシ秒(1/10秒)をそれぞれ計算するコードを以下に書くこと。
  diff = diff/1000;
  hour = Math.floor(diff/3600);
  diff = diff-hour*3600;
  min = Math.floor(diff/60);
  diff = diff - min*60;
  sec =Math.floor(diff);
  diff = diff -sec;
  deci = Math.floor(diff*10);
  // //表示用に桁数を合わせるコードを以下に書くこと。
  //DOMの watch ノードのHTML記述を書き換えることでスタートかSらの経過時間を
  //表示するコードを以下に書くこと。
  watch.innerHTML=Math.floor(hour)+":"+Math.floor(min)+":"+Math.floor(sec)+":"+deci
}
