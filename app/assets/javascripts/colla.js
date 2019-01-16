var mytap = window.ontouchstart===null?"touchstart":"click";
document.write(mytap);

$(function(){
  // turbolinks:load でロード時に読み込む．
// https://qiita.com/hiroyayamamo/items/b258acbaa089d9482c8a
$(document).on('turbolinks:load', function() {
  // id="colla_image"の変化でコールバック
  $("#colla_image").change(function(){
    // 選択ファイルの有無をチェック
    if (!this.files.length) {
      alert('ファイルが選択されていません');
      return;
    }
    // Formからファイルを取得
    var file = this.files[0];
    // (1) HTMLのCanvas要素の取得
    var canvas = $("#cnvs");
    // (2) getContext()メソッドで描画機能を有効にする
    var ctx = canvas[0].getContext('2d');
    // 描画イメージインスタンス化
    var image = new Image();
    // File API FileReader Objectでローカルファイルにアクセス
    var fr = new FileReader();
    // ファイル読み込み読み込み完了後に実行 [非同期処理]
    fr.onload = function(evt) {
      // 画像がロードされた後にcanvasに描画を行う [非同期処理]
      image.onload = function() {
        // (3) プレビュー(Cnavas)のサイズを指定
        var cnvsH = 300;
        var cnvsW = image.naturalWidth*cnvsH/image.naturalHeight;
        // (4) Cnavasにサイズアトリビュートを設定する
        canvas.attr('width', cnvsW);
        canvas.attr('height', cnvsH);
        // (5) 描画
        ctx.drawImage(image, 0, 0, cnvsW, cnvsH);
      }
      // 読み込んだ画像をimageのソースに設定
      image.src = evt.target.result;
    }
    // fileを読み込む データはBase64エンコードされる
    fr.readAsDataURL(file);
  })
})
}

if(mytap == "click"){
//canvas内での座標をクリックで取得して、テキストの表示位置に代入したい
$(document).on('click', '#cnvs', function(event) {
  console.log('clicked canvas');
  var clickX = event.pageX;
  var clickY = event.pageY;

  // 要素の位置を取得
  var clientRect = this.getBoundingClientRect() ;
  var positionX = clientRect.left + window.pageXOffset ;
  var positionY = clientRect.top + window.pageYOffset ;
  // 要素内におけるクリック位置を計算
  colla_x = clickX - positionX ;
  colla_y = clickY - positionY ;
  document.getElementById("address").innerText = "x = " + colla_x + ", y = " + colla_y;
  //var canvas = $("#cnvs");
  //var ctx = canvas[0].getContext('2d');
  //ctx.fillStyle = '#000000';
  //ctx.clearRect(colla_x, colla_y, 30, 30);
});
} else {
  // <div id="target">...</div>などの要素にタッチイベントを設定
$(document).on('touchstart', '#cnvs', function( event ) {
	var touchObject = event.originalEvent.changedTouches[0] ;
	var touchX = touchObject.pageX ;
	var touchY = touchObject.pageY ;

	// 要素の位置を取得
	var clientRect = this.getBoundingClientRect() ;
	var positionX = clientRect.left + window.pageXOffset ;
	var positionY = clientRect.top + window.pageYOffset ;

	// 要素内におけるタッチ位置を計算
	colla_x = touchX - positionX ;
  colla_y = touchY - positionY ;
  document.getElementById("address").innerText = "x = " + colla_x + ", y = " + colla_y;
} ) ;
  
}
function OnButtonClick(){
  // (1) HTMLのCanvas要素の取得
  var canvas = $("#cnvs");
  // テキストボックスの文字を取得する
  var colla_text = $('#colla-text').val();
  //var colla_x = colla_x.value;
  //var colla_y = colla_y.value;
  // (2) getContext()メソッドで描画機能を有効にする
  var ctx = canvas[0].getContext('2d');

  ctx.fillStyle = '#00000000';
  ctx.fillRect(100, 100, 140, 30);
  ctx.font = "bold 20px 'MS Pゴシック'";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#002B69';
  ctx.fillText(colla_text, this.colla_x, this.colla_y);
}

