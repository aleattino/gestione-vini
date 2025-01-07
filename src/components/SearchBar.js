import React, { useState } from 'react';
import { Paper, TextField, Checkbox, FormControlLabel, Grid, MenuItem, Select, FormControl, InputLabel, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function SearchBar({ wines, setFilteredWines, setPage }) {
 const [search, setSearch] = useState('');
 const [onlyVegan, setOnlyVegan] = useState(false);
 const [searchType, setSearchType] = useState('all');
 const [selectedCountry, setSelectedCountry] = useState('');
 const [openAdvanced, setOpenAdvanced] = useState(false);
 const [advancedFilters, setAdvancedFilters] = useState({
   name: '',
   producer: '',
   country: '',
   vegan: false
 });

 const countries = [...new Set(wines.map(wine => wine.origin))].sort();

 const isVegan = (label) => {
   const labelLower = label.toLowerCase();
   return !labelLower.includes('not vegan') && labelLower.includes('vegan friendly');
 };

 const handleFilter = (searchStr = search, vegan = onlyVegan, type = searchType, country = selectedCountry) => {
   let filtered = wines;

   if (searchStr) {
     switch(type) {
       case 'name':
         filtered = filtered.filter(wine => wine.name.toLowerCase().includes(searchStr.toLowerCase()));
         break;
       case 'producer':
         filtered = filtered.filter(wine => wine.producer.toLowerCase().includes(searchStr.toLowerCase()));
         break;
       case 'all':
         filtered = filtered.filter(wine => 
           wine.name.toLowerCase().includes(searchStr.toLowerCase()) ||
           wine.producer.toLowerCase().includes(searchStr.toLowerCase())
         );
         break;
       default:
         // Se il tipo di ricerca non corrisponde a nessun caso, mantieni tutti i vini
         filtered = wines;
         break;
     }
   }

   if (country) {
     filtered = filtered.filter(wine => wine.origin === country);
   }

   if (vegan) {
     filtered = filtered.filter(wine => isVegan(wine.label));
   }

   setFilteredWines(filtered);
   setPage(0);
 };

 const handleAdvancedSearch = () => {
   let filtered = wines;
   
   if (advancedFilters.name) {
     filtered = filtered.filter(wine => 
       wine.name.toLowerCase().includes(advancedFilters.name.toLowerCase())
     );
   }
   
   if (advancedFilters.producer) {
     filtered = filtered.filter(wine => 
       wine.producer.toLowerCase().includes(advancedFilters.producer.toLowerCase())
     );
   }
   
   if (advancedFilters.country) {
     filtered = filtered.filter(wine => wine.origin === advancedFilters.country);
   }
   
   if (advancedFilters.vegan) {
     filtered = filtered.filter(wine => isVegan(wine.label));
   }
   
   setFilteredWines(filtered);
   setPage(0);
   setOpenAdvanced(false);
 };

 return (
   <>
     <Paper sx={{ p: 2, mb: 2 }}>
       <Grid container spacing={2} alignItems="center">
         <Grid item xs={12} md={3}>
           <TextField
             fullWidth
             label="Cerca"
             value={search}
             onChange={(e) => {
               setSearch(e.target.value);
               handleFilter(e.target.value);
             }}
           />
         </Grid>
         <Grid item xs={12} md={2}>
           <FormControl fullWidth>
             <InputLabel>Cerca per</InputLabel>
             <Select
               value={searchType}
               label="Cerca per"
               onChange={(e) => {
                 setSearchType(e.target.value);
                 handleFilter(search, onlyVegan, e.target.value);
               }}
             >
               <MenuItem value="all">Tutti i campi</MenuItem>
               <MenuItem value="name">Nome</MenuItem>
               <MenuItem value="producer">Produttore</MenuItem>
             </Select>
           </FormControl>
         </Grid>
         <Grid item xs={12} md={3}>
           <FormControl fullWidth>
             <InputLabel>Nazione</InputLabel>
             <Select
               value={selectedCountry}
               label="Nazione"
               onChange={(e) => {
                 setSelectedCountry(e.target.value);
                 handleFilter(search, onlyVegan, searchType, e.target.value);
               }}
             >
               <MenuItem value="">Tutte</MenuItem>
               {countries.map(country => (
                 <MenuItem key={country} value={country}>{country}</MenuItem>
               ))}
             </Select>
           </FormControl>
         </Grid>
         <Grid item xs={12} md={2}>
           <FormControlLabel
             control={
               <Checkbox
                 checked={onlyVegan}
                 onChange={(e) => {
                   setOnlyVegan(e.target.checked);
                   handleFilter(search, e.target.checked);
                 }}
               />
             }
             label="Solo vegani"
           />
         </Grid>
         <Grid item xs={12} md={2}>
           <Button 
             variant="contained" 
             fullWidth
             onClick={() => setOpenAdvanced(true)}
           >
             Ricerca avanzata
           </Button>
         </Grid>
       </Grid>
     </Paper>

     <Dialog open={openAdvanced} onClose={() => setOpenAdvanced(false)}>
       <DialogTitle>Ricerca avanzata</DialogTitle>
       <DialogContent>
         <Grid container spacing={2} sx={{ pt: 1 }}>
           <Grid item xs={12}>
             <TextField
               fullWidth
               label="Nome vino"
               value={advancedFilters.name}
               onChange={(e) => setAdvancedFilters({...advancedFilters, name: e.target.value})}
             />
           </Grid>
           <Grid item xs={12}>
             <TextField
               fullWidth
               label="Produttore"
               value={advancedFilters.producer}
               onChange={(e) => setAdvancedFilters({...advancedFilters, producer: e.target.value})}
             />
           </Grid>
           <Grid item xs={12}>
             <FormControl fullWidth>
               <InputLabel>Nazione</InputLabel>
               <Select
                 value={advancedFilters.country}
                 label="Nazione"
                 onChange={(e) => setAdvancedFilters({...advancedFilters, country: e.target.value})}
               >
                 <MenuItem value="">Tutte</MenuItem>
                 {countries.map(country => (
                   <MenuItem key={country} value={country}>{country}</MenuItem>
                 ))}
               </Select>
             </FormControl>
           </Grid>
           <Grid item xs={12}>
             <FormControlLabel
               control={
                 <Checkbox
                   checked={advancedFilters.vegan}
                   onChange={(e) => setAdvancedFilters({...advancedFilters, vegan: e.target.checked})}
                 />
               }
               label="Solo vegani"
             />
           </Grid>
         </Grid>
       </DialogContent>
       <DialogActions>
         <Button onClick={() => setOpenAdvanced(false)}>Annulla</Button>
         <Button onClick={handleAdvancedSearch} variant="contained">Cerca</Button>
       </DialogActions>
     </Dialog>
   </>
 );
}

export default SearchBar;
