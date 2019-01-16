// turbolinks:load でロード時に読み込む．
// https://qiita.com/hiroyayamamo/items/b258acbaa089d9482c8a
$(document).on('turbolinks:load', function() {
  if ($('#template_image').length > 0) {
    console.log('template_image exists');
    var image = $('#template_image')[0];
    DrawImgOnCanvas(image);
  } else {
    console.log('template_image not found');
  }
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
    // ファイル読み込み読み込み完了後に実行 [非同期処理]
    fr.onload = function(evt) {
      // 読み込んだ画像をimageのソースに設定
      image.src = evt.target.result;
    }
    // fileを読み込む データはBase64エンコードされる
    fr.readAsDataURL(file);
  })

  //canvas内での座標をクリックで取得して、テキストの表示位置に代入したい
  $('#cnvs').on('click', function(event) {
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
    //var canvas = $("#cnvs");
    //var ctx = canvas[0].getContext('2d');
    //ctx.fillStyle = '#000000';
    //ctx.clearRect(colla_x, colla_y, 30, 30);
  });

  $('#colla_new').submit(function(){
    var canvas = $("#cnvs");
    // hiddenフィールドにバイナリの中身をかく．
    var dataurl = canvas[0].toDataURL();
    $('#image_data_url').val(dataurl);
    $('#colla_image').val('');

    return true;
  });

});

function DrawImgOnCanvas(image){
  var canvas = $('#cnvs');
  var cnvsH = 300;
  var cnvsW = image.naturalWidth*cnvsH/image.naturalHeight;
  canvas.attr('width', cnvsW);
  canvas.attr('height', cnvsH);
  var ctx = canvas[0].getContext('2d');
  ctx.drawImage(image, 0, 0, cnvsW, cnvsH);
}

function OnButtonClick(){
  // (1) HTMLのCanvas要素の取得
  var canvas = $("#cnvs");
  // テキストボックスの文字を取得する
  var colla_text = $('#colla-text').val();
  //縦書きか横書きかラヂオボタンのvalueを取得
  let str = "";

  const write_direction = document.getElementsByName("write_direction");

  for (let i = 0; i < write_direction.length; i++){
    if(write_direction[i].checked){
      str = write_direction[i].value;
      break;
    }
  }
  var direction = str;
  //フォントカラーを取得
  var color = document.getElementById("font-color").value;
  var fontsize = document.getElementById("font-size").value;
  //var colla_x = colla_x.value;
  //var colla_y = colla_y.value;
  // (2) getContext()メソッドで描画機能を有効にする
  var ctx = canvas[0].getContext('2d');
  var font_style = "bold " + fontsize + "px 'MS Pゴシック'";
  ctx.fillStyle = '#00000000';
  ctx.fillRect(100, 100, 140, 30);
  ctx.font = font_style;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  if (direction == "horizonal"){
    ctx.fillText(colla_text, this.colla_x, this.colla_y);
  }else if (direction == "vertical"){
    var tategaki = function(ctx, colla_text, x, y) {
      var textList = colla_text.split('\n');
      var lineHeight = ctx.measureText("あ").width;
      textList.forEach(function(elm, i) {
        Array.prototype.forEach.call(elm, function(ch, j) {
          ctx.fillText(ch, x-lineHeight*i, y+lineHeight*j);
        });
      });
    };
    tategaki(ctx, colla_text, this.colla_x, this.colla_y);
  }
}
