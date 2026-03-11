const express = require('express');
const path = require('path');
const app = express();

// Уверяваме се, че всички файлове са достъпни
app.use(express.static(path.join(__dirname)));

// Това казва: когато някой отвори началната страница, му покажи index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});