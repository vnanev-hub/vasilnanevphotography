const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// 1. Казваме на сървъра къде са статичните файлове (HTML, CSS, Снимки)
app.use(express.static(path.join(__dirname, 'public')));

// 2. Ендпоинт за вземане на списък с всички албуми (папки в public/images)
app.get('/api/albums', (req, res) => {
    const imagesDir = path.join(__dirname, 'public/images');
    
    try {
        const albums = fs.readdirSync(imagesDir).filter(file => {
            return fs.statSync(path.join(imagesDir, file)).isDirectory();
        });
        res.json(albums);
    } catch (err) {
        console.error("Грешка при четене на директорията с изображения:", err);
        res.json([]);
    }
});

// 3. Ендпоинт за вземане на всички снимки от конкретен албум
app.get('/api/photos/:albumName', (req, res) => {
    const albumName = req.params.albumName;
    const albumDir = path.join(__dirname, 'public/images', albumName);

    try {
        const photos = fs.readdirSync(albumDir).filter(file => {
            // Филтрираме само файлове, които са изображения
            return /\.(jpg|jpeg|png|gif|webp)$/i.test(file);
        });
        res.json(photos);
    } catch (err) {
        console.error(`Грешка при четене на албум ${albumName}:`, err);
        res.status(404).json({ error: "Албумът не е намерен" });
    }
});

// 4. Стартиране на сървъра
app.listen(PORT, () => {
    console.log(`------------------------------------------`);
    console.log(`Сървърът е готов!`);
    console.log(`Отвори сайта тук: http://localhost:${PORT}`);
    console.log(`------------------------------------------`);
});

