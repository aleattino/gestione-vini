import React from 'react';
import { Paper, Typography, Grid, Box, Button } from '@mui/material';

function Statistics({ wines, onShowGlobalStats }) {
  const totalWines = wines.length;
  const veganWines = wines.filter(wine => {
    const label = wine.label.toLowerCase();
    return !label.includes('not vegan') && label.includes('vegan friendly');
  }).length;
  
  const uniqueCountries = [...new Set(wines.map(wine => wine.origin))];
  const currentCountry = uniqueCountries.length === 1 ? uniqueCountries[0] : '';

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <Box>
            <Typography variant="h6">Totale vini</Typography>
            <Typography variant="h4">{totalWines}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box>
            <Typography variant="h6">Vini vegani</Typography>
            <Typography variant="h4">
              {veganWines} ({((veganWines/totalWines)*100).toFixed(1)}%)
            </Typography>
          </Box>
        </Grid>
        {currentCountry && (
          <Grid item xs={12} md={3}>
            <Box>
              <Typography variant="h6">Nazione</Typography>
              <Typography variant="h4">{currentCountry}</Typography>
            </Box>
          </Grid>
        )}
        <Grid item xs={12} md={3}>
          <Button 
            variant="outlined" 
            onClick={onShowGlobalStats}
            fullWidth
          >
            Statistiche globali
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Statistics;
