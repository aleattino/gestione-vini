# SGE - Sistema di analisi di vini vegan friendly
Questo progetto consiste nella creazione di un sistema di gestione elementi (SGE) applicato al settore vinicolo, sviluppato utilizzando il linguaggio di programmazione Python.

Ho sviluppato un programma che consente di esplorare e analizzare un database di vini attraverso diverse funzionalità di ricerca e visualizzazione. Nel database, ogni vino è caratterizzato da attributi specifici: nome, produttore, paese di origine ed etichetta, con particolare enfasi sulle etichette vegan friendly/not vegan friendly.

Ho utilizzato un database disponibie su Kaggle (https://www.kaggle.com/datasets/maximvlah/barnivore-list-of-vegannonvegan-wines) ottenuto dallo scraping del sito del progetto Barnivore, considerando esclusivamente i dati relativi ai vini. 
L'ultimo aggiornamento risale al 2020, ma mi è sembrato ottimo per lo scopo che mi ero prefissato.


**Funzionalità principali**

* ricerca per nome, produttore e stato;
* filtraggio dei vini vegan friendly;
* analisi statistica dei vini per paese;
* identificazione di produttori che si dedicano esclusivamente alla produzione di vini vegan friendly;
* ricerca incrociata avanzata.

**Python**

* librerie standard di Python;
* gestione file e interfaccia utente con Tkinter.


**Versione Web React**

* React 18
* Material-UI
* Papaparse per elaborazione CSV
* GitHub Pages per hosting


**Versione Web**

https://aleattino.github.io/gestione-vini/

**Perchè vegan friendly/not vegan friendly?**

I vini vengono classificati come vegan friendly considerando i processi di chiarificazione e stabilizzazione.

*Not vegan friendly* - utilizzano agenti di origine animale come:

* albumina (uova);
* caseina (latte);
* colla di pesce;
* gelatina animale.


*Vegan friendly* - utilizzano alternative vegetali come:

* bentonite;
* proteine vegetali;
* gel di silice;
* caolino.
