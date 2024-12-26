const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());

app.post('/items', (req, res, next) => {
  try {
    const { name, password } = req.body;

    if (name.length < 2) {
      throw new Error( "Length of name is too short" );
    }

    if (password.length < 5) {
        
      throw new Error( "Enter strong password" );
      
    }

    res.status(200).json({ name, password });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: err.message, myError: err.stack });
});

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`App is running on port ${port}`);
});