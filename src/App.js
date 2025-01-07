import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Container, CssBaseline, ThemeProvider, createTheme, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import SearchBar from './components/SearchBar';
import WineList from './components/WineList';
import Statistics from './components/Statistics';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#722F37',
    },
  },
});

function App() {
  const [wines, setWines] = useState([]);
  const [filteredWines, setFilteredWines] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openStats, setOpenStats] = useState(false);

  useEffect(() => {
    Papa.parse('/public/barnivore_new.csv', {
      download: true,
      header: true,
      complete: (results) => {
        const validData = results.data.filter(wine => 
          wine.name && wine.producer && wine.origin && wine.label
        );
        setWines(validData);
        setFilteredWines(validData);
      }
    });
  }, []);

  const getGlobalStats = () => {
    const countryStats = wines.reduce((acc, wine) => {
      const isVegan = !wine.label.toLowerCase().includes('not vegan') && 
                     wine.label.toLowerCase().includes('vegan friendly');
      
      if (!acc[wine.origin]) {
        acc[wine.origin] = { total: 0, vegan: 0 };
      }
      
      acc[wine.origin].total += 1;
      if (isVegan) acc[wine.origin].vegan += 1;
      
      return acc;
    }, {});

    return Object.entries(countryStats)
      .sort((a, b) => b[1].total - a[1].total)
      .map(([country, stats]) => ({
        country,
        total: stats.total,
        vegan: stats.vegan,
        percentage: ((stats.vegan / stats.total) * 100).toFixed(1)
      }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <SearchBar 
          wines={wines} 
          setFilteredWines={setFilteredWines}
          setPage={setPage}
        />
        <Statistics 
          wines={filteredWines}
          onShowGlobalStats={() => setOpenStats(true)}
        />
        <WineList 
          wines={filteredWines}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
        <Dialog 
          open={openStats} 
          onClose={() => setOpenStats(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Statistiche globali vini vegani</DialogTitle>
          <DialogContent>
            {getGlobalStats().map(stat => (
              <Typography key={stat.country} sx={{ mb: 1 }}>
                {stat.country}: {stat.vegan} vini vegani su {stat.total} ({stat.percentage}%)
              </Typography>
            ))}
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}

export default App;
