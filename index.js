const express = require('express');
const ejs = require('ejs');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const path = require('path');

// change from import
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://cdduewtpfvhhhogaybjk.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));


//setup public folder
app.use(express.static(path.join(__dirname, 'public')));

//select all data from matches table
async function getMatches() {
    let { data: matches, error } = await supabase
        .from('matches')
        .select('*');
    
    if (error) {
        console.error('Error fetching matches:', error);
    }
    return matches;
}
  

app.get('/', async (req, res) => {
    const matches = await getMatches();

   // Group matches by month using reduce to group them in the template
    const fixturesByMonth = matches.reduce((acc, fixture) => {
      if (!acc[fixture.month]) {
        acc[fixture.month] = { month: fixture.month, fixtures: [] };
      }
      acc[fixture.month].fixtures.push(fixture);
      return acc;
    }, []);
  
    res.render('index', { fixturesByMonth: Object.values(fixturesByMonth) });
  });

  //new route
  app.get('/new', (req, res) => {
    res.render('new');
  });
  
  async function addFixture(fixture) {
    const { data, error } = await supabase
      .from('matches')
      .insert([
        fixture
      ]);
  
    if (error) {
      console.error('Error adding fixture:', error);
      return null;
    }
    // If data is null or empty, return the input fixture instead of data[0]
    return data && data.length > 0 ? data[0] : fixture;
  }

  app.post('/fixtures/new', async (req, res) => {
    const newFixture = req.body;
    const addedFixture = await addFixture(newFixture);
  
    if (addedFixture) {
      res.redirect('/');
    } else {
      res.status(500).send('Error adding fixture');
    }
  });
  
  

//edit route
app.get('/edit', async (req, res) => {
        const matches = await getMatches();
        res.render('edit', { matches });
});
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
