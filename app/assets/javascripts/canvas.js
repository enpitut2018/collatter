var canvas = document.getElementById('canvas');
var canvasWidth = 400;
var canvasHeight = 300;

// Canvasの準備
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var ctx = canvas.getContext('2d');

// Canvas上に画像を表示
var img = new Image();
img.src = '/Users/nishikawakouhei/Desktop/collatter/public/uploads/template/image/1/bj01_ja-91.png';
img.onload = function() {
    ctx.drawImage(img, 0, 0, canvasWidth, this.height * (canvasWidth / this.width));
}