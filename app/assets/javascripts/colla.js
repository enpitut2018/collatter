// turbolinks:load でロード時に読み込む．
// https://qiita.com/hiroyayamamo/items/b258acbaa089d9482c8a
$(document).on('turbolinks:load', function() {
  if ($('#template_image').length > 0) {
    console.log('template_image exists');
  } else {
    console.log('template_image not found');
  }

  var canvas = document.getElementById('cnvs');
  var ctx = canvas.getContext('2d');

  var objX, objY;
  var objWidth, objHeight;
  var x, y, relX, relY;
  var dragging = false;
  // オブジェクトの大きさを定義
  objWidth = 50;
  objHeight = 50;

  // オブジェクトの座標を定義(キャンバスの中央に表示)
  objX = canvas.width / 2;
  objY = canvas.height / 2;

  DrawTextOnImgCanvas(objX, objY);

  canvas.addEventListener('mousedown', function(e){
    console.log('mousedown');
    // キャンバスの左上端の座標を取得
    var offsetX = canvas.getBoundingClientRect().left;
    var offsetY = canvas.getBoundingClientRect().top;

    // マウスが押された座標を取得
    x = e.clientX - offsetX;
    y = e.clientY - offsetY;

    // オブジェクト上の座標かどうかを判定
    // if (objX < x && (objX + objWidth) > x && objY < y && (objY + objHeight) > y) {
    //   dragging = true; // ドラッグ開始
    //   relX = objX - x;
    //   relY = objY - y;
    // }
    dragging = true; // ドラッグ開始
    relX = objX - x;
    relY = objY - y;
  }, false);
  canvas.addEventListener('mousemove', function(e){
    console.log('mousemove');
    // キャンバスの左上端の座標を取得
    var offsetX = canvas.getBoundingClientRect().left;
    var offsetY = canvas.getBoundingClientRect().top;

    // マウスが移動した先の座標を取得
    x = e.clientX - offsetX;
    y = e.clientY - offsetY;

    // ドラッグが開始されていればオブジェクトの座標を更新して再描画
    if (dragging) {
      objX = x + relX;
      objY = y + relY;
      DrawTextOnImgCanvas(objX, objY);
    }

  }, false);
  canvas.addEventListener('mouseup', function(e){
    console.log('mouseup');
    dragging = false; // ドラッグ終
  }, false);

  function DrawTextOnImgCanvas(x, y){
    console.log('DrawTextOnImgCanvas')
    var image = $('#template_image')[0];
    var canvas = $('#cnvs');
    var cnvsH = 300;
    var cnvsW = image.naturalWidth*cnvsH/image.naturalHeight;
    canvas.attr('width', cnvsW);
    canvas.attr('height', cnvsH);
    var ctx = canvas[0].getContext('2d');
    ctx.clearRect(0, 0, cnvsW, cnvsH); // キャンバスをクリア
    ctx.drawImage(image, 0, 0, cnvsW, cnvsH);
    // (1) HTMLのCanvas要素の取得
    // テキストボックスの文字を取得する
    var colla_text = $('#colla-text').val();
    console.log('colla_text:'+ colla_text);
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
    // (2) getContext()メソッドで描画機能を有効にする
    var font_style = "bold " + fontsize + "px 'MS Pゴシック'";
    ctx.font = font_style;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = "#000000";

    console.log('draw text' + colla_text);
    if (direction == "horizonal"){
      //ctx.fillText(colla_text, this.colla_x, this.colla_y);
      ctx.fillText(colla_text, x, y);
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
      //tategaki(ctx, colla_text, this.colla_x, this.colla_y);
      tategaki(ctx, colla_text, x, y);
    }
  }


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

