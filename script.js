const qrCode = new QRCode(document.getElementById('qr-code'), {
    width: 256,
    height: 256,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H,
    imgonload : () => {
        const textInput = document.getElementById('text-input');
        const qrCodeCanvas = document.getElementById('qr-code-canvas');
        const ctx = qrCodeCanvas.getContext('2d');

        qrCodeCanvas.width = qrCode._oDrawing._elImage.width;
        qrCodeCanvas.height = qrCode._oDrawing._elImage.height;
        ctx.drawImage(qrCode._oDrawing._elImage, 0, 0);

        // テキストの幅と高さを計算
        const text = textInput.value;
        const fontSize = 24; // フォントサイズを適切に調整してください
        ctx.font = `bold ${fontSize}px sans-serif`;
        const textMetrics = ctx.measureText(text);
        const textWidth = textMetrics.width;
        const textHeight = fontSize;

        // 背景の四角形を描画
        const padding = 5; // 余白を調整してください
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // 背景色を適切に設定してください
        ctx.fillRect(qrCodeCanvas.width / 2 - textWidth / 2 - padding, qrCodeCanvas.height / 2 - textHeight / 2 - padding, textWidth + padding * 2, textHeight + padding * 2);
    
        // テキストを描画
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, qrCodeCanvas.width / 2, qrCodeCanvas.height / 2);
      },
  });
  
  document.getElementById('generate-button').addEventListener('click', () => {
    const url = document.getElementById('url-input').value;
    qrCode.makeCode(url);
    drawQRCodeOnCanvas();
  
    // ボタンを有効化
    document.getElementById('save-button').disabled = false;
  });
  
  function drawQRCodeOnCanvas() {
    const img = new Image();
    img.src = qrCode._oDrawing._elImage.src;
}
  
  document.getElementById('save-button').addEventListener('click', async () => {
    const a = document.createElement('a');
    a.href = document.getElementById('qr-code-canvas').toDataURL('image/png');
    a.download = 'qr-code.png';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
  