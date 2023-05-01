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
    // Replace mockData with the data fetched from the database
    const matches = await getMatches();
  
    const fixturesByMonth = matches.reduce((acc, fixture) => {
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
