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

    // 入力された文字がある場合、QRコードの中央に表示
    if (textInput.value) {
        options.text = url + textInput.value; // URLと入力文字を結合
        options.pdground = '#ffffff'; // QRコード内の背景色を設定
        options.pdcolor = '#000000'; // QRコード内の文字色を設定
        options.pdsize = 4; // QRコード内の文字サイズを設定（パーセンテージ）
    }

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
    
    // テキストをキャンバスに描画
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = 'bold 1.5rem sans-serif';
    ctx.fillText(textInput.value, canvas.width / 2, canvas.height / 2);

    // キャンバスから画像を生成し、ダウンロード
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'qr-code-with-text.png';
    link.click();
});