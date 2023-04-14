document.getElementById('generate-button').addEventListener('click', () => {
    const urlInput = document.getElementById('url-input');
    const textInput = document.getElementById('text-input'); // 新しい入力ボックスの値を取得
    const qrCodeContainer = document.getElementById('qr-code');
    qrCodeContainer.innerHTML = ''; // QRコード領域をクリア
    const url = urlInput.value;

    if (url === '') {
        alert('URLを入力してください。');
        return;
    }

    const options = {
        text: url,
        width: 256,
        height: 256,
        correctLevel: QRCode.CorrectLevel.H
    };

    const qrCode = new QRCode(qrCodeContainer, options);
    document.getElementById('save-button').disabled = false; // 保存ボタンを有効にする

    const qrCodeText = document.getElementById('qr-code-text');
    qrCodeText.innerHTML = textInput.value; // 入力されたテキストをQRコード上に表示
});

document.getElementById('save-button').addEventListener('click', async () => {
    const qrCodeWrapper = document.getElementById('qr-code-wrapper');
    const textInput = document.getElementById('text-input'); // 追加
    const img = qrCodeWrapper.querySelector('img');
    if (!img) {
        alert('QRコードが生成されていません。');
        return;
    }

    // QRコードとテキストを含むキャンバスを生成
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
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
    ctx.fillRect(canvas.width / 2 - textWidth / 2 - padding, canvas.height / 2 - textHeight / 2 - padding, textWidth + padding * 2, textHeight + padding * 2);

    // テキストをキャンバスに描画
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle'; // 追加
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // キャンバスから画像を生成し、ダウンロード
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'qr-code-with-text.png';
    link.click();
});