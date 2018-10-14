const express =  require('express');
const app = express();
const PORT = 9001;

app.get('/', (req, res) => res.send('Hello This is working'));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
