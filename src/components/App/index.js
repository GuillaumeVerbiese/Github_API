// on importe axios
import axios from 'axios';

import { Routes, Route } from 'react-router-dom';

// == Import
import './style.scss';

import Logo from 'src/components/Logo';
import SearchBar from 'src/components/SearchBar';
import Message from 'src/components/Message';
import ReposResults from 'src/components/ReposResults';
import FAQ from 'src/components/FAQ';
import Nav from 'src/components/Nav';
import NotFound from 'src/components/NotFound';
import LoadMore from 'src/components/LoadMore';

// import reposData from 'src/data/repos';
import { useState } from 'react';

// console.log(reposData.items[0]);

// == Composant
function App() {
  // on prévoit une fonction permettant de simplifier la structure de nos données
  const simplyRepo = (repos) => repos.map(
    (repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      login: repo.owner.login,
      image: repo.owner.avatar_url,
    }),
  );

  // valeur du champ de recherche
  const [search, setSearch] = useState('');

  // repos à afficher
  const [repos, setRepos] = useState([]);

  // texte du message
  const [message, setMessage] = useState('Recherchez des dépôts GitHub grâce à notre App');

  // le message est-il un message d'erreur
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  // le message doit-il être affiché
  const [isMessageDisplayed, setIsMessageDisplayed] = useState(true);

  // la page courante
  const [page, setPage] = useState(0);

  // le nombre total de resultats
  const [totalResults, setTotalResults] = useState(0);

  // la recherche courante
  const [currentSearch, setCurrentSearch] = useState('');

  // on prépare une fonction permettant de cacher le message
  const hideMessage = () => {
    setIsMessageDisplayed(false);
  };

  //  fonction permettant de mettre à jour
  // les 2 variables d'état qui concernent le message
  const displayMessage = (content, isError = false) => {
    setMessage(content);
    setIsErrorMessage(isError);
    setIsMessageDisplayed(true);
  };

  const resetSearch = () => {
    setPage(1);
    setTotalResults(0);
    setCurrentSearch(search);
  };

  // Mise en place d'un champ controlé :
  // - forcer la valeur du champ avec la valeur d'une variable d'état (value)
  // - réagir au changement du champ en modifiant la variable d'état (onChange)

  const getReposFromApi = () => {
    console.log(`je contacte l'api avec comme recherche ${search}`);

    // réinitialiser les infos concernant la recherche
    resetSearch();

    axios
      .get('https://api.github.com/search/repositories', {
        params: {
          q: search,
          sort: 'stars',
          order: 'desc',
          page: 1,
          per_page: 9,
        },
      })
      .then(
        (response) => {
          console.log(response.data);
          // on extrait la liste des repos de la réponse
          const { items, total_count: totalCount } = response.data;
          // on demande le stockage de cette liste dans le state
          setRepos(simplyRepo(items));

          setTotalResults(totalCount);

          // et on met à jour le message
          displayMessage(`Votre recherche a donné ${new Intl.NumberFormat().format(totalCount)} résultat${totalCount >= 2 ? 's' : ''}`);
        },
      ).catch(
        () => {
          displayMessage('Une erreur est survenue', true);
        },
      );
  };

  // fonction qui permet de récupérer des résultats supplémentaires
  const getMoreReposFromApi = () => {
    console.log('get more');

    // on incrémente la page courante (accessible au prochain rendu)
    setPage(page + 1);

    // on demande à l'api les résultats suivants
    axios
      .get('https://api.github.com/search/repositories', {
        params: {
          q: currentSearch,
          sort: 'stars',
          order: 'desc',
          page: page + 1,
          per_page: 9,
        },
      })
      .then(
        (response) => {
          console.log(response.data);

          // quand on obtient les nouveaux résultats
          const { items: newItems } = response.data;

          // on demande le stockage de ces nouveaux résultats à la suite des anciens

          setRepos([...repos, ...simplyRepo(newItems)]);
        },
      ).catch(
        () => {
          displayMessage('Une erreur est survenue', true);
        },
      );
  };

  return (
    <div className="app">
      <Logo />
      <Nav />

      <Routes>
        <Route path="/faq" element={<FAQ />} />
        <Route
          path="/"
          element={(
            <>
              <SearchBar
                search={search}
                setSearch={setSearch}
                getReposFromApi={getReposFromApi}
              />
              { isMessageDisplayed && (
                <Message
                  content={message}
                  isError={isErrorMessage}
                  hideMessage={hideMessage}
                />
              )}
              <ReposResults repos={repos} />
              {
                (repos.length < totalResults) && (
                  <LoadMore getMoreReposFromApi={getMoreReposFromApi} />
                )
              }
            </>
        )}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

// == Export
export default App;
