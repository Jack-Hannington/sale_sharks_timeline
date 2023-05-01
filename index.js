const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 3000;
const path = require('path');

app.set('view engine', 'ejs');

//setup public folder
app.use(express.static(path.join(__dirname, 'public')));


const mockData = [{
    "month": "August 2022",
    "opponent": "Bath",
    "result": "Win"
  },
  {
    "month": "August 2022",
    "opponent": "Saracens",
    "result": "Win",
    "report": "A victory"
  },
  {
    "month": "September 2022",
    "opponent": "Northampton",
    "result": "Win"
  },
  {
    "month": "September 2022",
    "opponent": "Exeter",
    "result": "Loss",
    "report": "A victory"
  },
  {
    "month": "October 2022",
    "opponent": "Harlequins",
    "result": "Win"
  },
  {
    "month": "October 2022",
    "opponent": "Bristol",
    "result": "Draw",
    "report": "A draw"
  }
];

app.get('/', (req, res) => {
  const fixturesByMonth = mockData.reduce((acc, fixture) => {
    if (!acc[fixture.month]) {
      acc[fixture.month] = { month: fixture.month, fixtures: [] };
    }
    acc[fixture.month].fixtures.push(fixture);
    return acc;
  }, []);

  res.render('index', { fixturesByMonth: Object.values(fixturesByMonth) });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
