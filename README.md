# 🎨 Color Picker Online

**Color Picker Online** is a simple web application that allows users to upload an image and extract multiple colors from the image. It displays these colors as hex values and shows a visual preview for each color.

## Features

- Upload an image to analyze the colors.
- Displays a small preview of the uploaded image.
- Extracts the most frequent colors from the image and shows them in a grid.
- Shows hex codes for each color.
- Responsive layout using Bootstrap.

## Technologies Used

- **HTML5**: Structure of the application.
- **CSS (Bootstrap)**: For styling and responsive design.
- **JavaScript (Vanilla)**: For handling image uploading, processing the image data, and rendering the color grid.
- **Canvas API**: Used to process the image and extract pixel data.

## Demo

🔗 https://themiu.github.io/color-detect-from-image/

## How It Works

1. The user uploads an image file using the file input.
2. The image is displayed in a small preview.
3. Using the `Canvas API`, the script extracts pixel data from the image.
4. The most frequent colors are calculated and displayed as color blocks with hex values.
