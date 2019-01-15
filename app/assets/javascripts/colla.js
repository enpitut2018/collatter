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
    document.getElementById("colla-text").innerText = "x = " + colla_x + ", y = " + colla_y;
    //var canvas = $("#cnvs");
    //var ctx = canvas[0].getContext('2d');
    //ctx.fillStyle = '#000000';
    //ctx.clearRect(colla_x, colla_y, 30, 30);
  });
});

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

function Upload(){
  console.log('convert to file');
  var canvas = $("#cnvs");
  var dataURL=canvas[0].toDataURL('image/png');
  var blobBin = atob(dataURL.split(',')[1]);
  var array = [];
  for(var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
  }
  var fileBlob=new Blob([new Uint8Array(array)], {type: 'image/png'});
  var file = new File([fileBlob], "name.png");

  //var form = $('form#colla_new');
  var formdata = new FormData();
  //formdata.append("image", fileBlob);
  //formdata.append("colla[tag_txt]", $('#colla_tag_txt').val());
  //formdata.append("tag_txt", 'dummy text');
  var tag_txt = $('#colla_tag_txt').val();
  var data = JSON.stringify({
    'colla': {
      'image': fileBlob,
      'tag_txt': tag_txt
    }
  });

  $.ajax({
      url: '/collas',
      type: 'POST',
      //data: formdata,
      data: data,
      // data: {
      //   colla: {
      //     image: file,
      //     tag_txt: 'dummy'
      //   }
      // },
      processData: false,
      // contentType: false,
      contentType: 'application/json',
      dataType: 'json'
    })
      .done(function(data){
        console.log(data);
      });
}
