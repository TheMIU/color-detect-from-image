document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    console.log('File selected:', file);

    const img = new Image();
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const colorBox1 = document.getElementById('colorBox1');
    const colorBox2 = document.getElementById('colorBox2');
    const colorBox3 = document.getElementById('colorBox3');
    const additionalColorsContainer = document.getElementById('additionalColors');
    const chosenImage = document.getElementById('chosenImage');

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
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const rgb = `${r},${g},${b}`;
            if (colorCounts[rgb]) {
                colorCounts[rgb]++;
            } else {
                colorCounts[rgb] = 1;
            }
        }

        // Sort colors by frequency
        const sortedColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);

        // Extract unique colors (ignore duplicates)
        const uniqueColors = [];
        for (let i = 0; i < sortedColors.length; i++) {
            if (!uniqueColors.includes(sortedColors[i][0])) {
                uniqueColors.push(sortedColors[i][0]);
            }
            if (uniqueColors.length >= 13) break; // Get only top 13 unique colors (3 for main + 10 additional)
        }

        // Convert RGB to Hex
        function rgbToHex(rgb) {
            const [r, g, b] = rgb.split(',').map(Number);
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
        }

        // Assign the first three colors
        const dominantColor = uniqueColors[0] || '0,0,0';
        const secondaryColor = uniqueColors[1] || '0,0,0';
        const tertiaryColor = uniqueColors[2] || '0,0,0';

        const dominantHex = rgbToHex(dominantColor);
        const secondaryHex = rgbToHex(secondaryColor);
        const tertiaryHex = rgbToHex(tertiaryColor);

        console.log(`Dominant Color: rgb(${dominantColor})`);
        console.log(`Secondary Color: rgb(${secondaryColor})`);
        console.log(`Tertiary Color: rgb(${tertiaryColor})`);

        // Apply the colors and hex codes to the divs
        colorBox1.style.backgroundColor = `rgb(${dominantColor})`;
        colorBox1.innerHTML = dominantHex;

        colorBox2.style.backgroundColor = `rgb(${secondaryColor})`;
        colorBox2.innerHTML = secondaryHex;

        colorBox3.style.backgroundColor = `rgb(${tertiaryColor})`;
        colorBox3.innerHTML = tertiaryHex;

        // Display the next 10 colors with their hex codes
        additionalColorsContainer.innerHTML = ''; // Clear any previous colors
        for (let i = 3; i < uniqueColors.length; i++) {
            const colorDiv = document.createElement('div');
            const colorHex = rgbToHex(uniqueColors[i]);

            colorDiv.style.width = '100px';
            colorDiv.style.height = '100px';
            colorDiv.style.border = '1px solid #000';
            colorDiv.style.scale = '0.8';
            colorDiv.style.borderRadius = '10px';
            colorDiv.style.backgroundColor = `rgb(${uniqueColors[i]})`;
            colorDiv.style.display = 'inline-block';
            colorDiv.style.margin = '1px';
            colorDiv.style.color = '#fff';
            colorDiv.style.textAlign = 'center';
            colorDiv.style.lineHeight = '100px';
            colorDiv.innerHTML = colorHex;

            additionalColorsContainer.appendChild(colorDiv);
        }
    };

    if (file) {
        // Display the chosen image in a smaller preview
        chosenImage.src = URL.createObjectURL(file);
        chosenImage.style.display = 'block'; // Show the image preview
        img.src = URL.createObjectURL(file);
        console.log('Image source set:', img.src);
    }
});
