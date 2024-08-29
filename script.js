document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    console.log('File selected:', file);

    const img = new Image();
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const colorBox = document.getElementById('colorBox');

    img.onload = function () {
        console.log('Image loaded');

        canvas.width = img.width;
        canvas.height = img.height;
        console.log('Canvas size set to:', canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0);
        console.log('Image drawn on canvas');

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        console.log('Image data obtained:', imageData);

        const colorCounts = {};
        let maxCount = 0;
        let dominantColor = '';

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const rgb = `${r},${g},${b}`;
            // console.log(`Pixel color at index ${i / 4}: rgb(${rgb})`);

            if (colorCounts[rgb]) {
                colorCounts[rgb]++;
            } else {
                colorCounts[rgb] = 1;
            }

            if (colorCounts[rgb] > maxCount) {
                maxCount = colorCounts[rgb];
                dominantColor = rgb;
               // console.log('New dominant color found:', dominantColor, 'with count:', maxCount);
            }
        }

        console.log(`Final dominant color: rgb(${dominantColor})`);

        // Apply the dominant color to the div
        colorBox.style.backgroundColor = `rgb(${dominantColor})`;
        console.log('Applied dominant color to the div:', `rgb(${dominantColor})`);
    };

    if (file) {
        img.src = URL.createObjectURL(file);
        console.log('Image source set:', img.src);
    }
});
