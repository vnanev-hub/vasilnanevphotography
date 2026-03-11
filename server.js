const express = require('express');
const path = require('path');
const app = express();

// Тук казваме на сървъра да търси файлове в папка 'public'
app.use(express.static('public'));

// ТОВА Е КЛЮЧОВИЯТ РЕД: Той казва на сървъра да сервира index.html при отваряне
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Слушане на порт (Render сам си задава порта чрез process.env.PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

