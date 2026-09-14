const app = require('./src/app');

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`VELOEXPRESS funcionando en http://localhost:${PORT}`);
});