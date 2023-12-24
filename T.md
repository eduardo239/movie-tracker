## Tracker

### Doc # tracker

      {
        listType: "see" | "saw" | "block";
        mediaType: "movie" | "tv";
        movieId: number;
        poster: string;
        seasons: [number];
        title: string;
        userId: string;
      }

## List

### Doc # list

      {
        description: string;
        isPublic: boolean;
        list: [
          {
            id: number;
            media_type: "movie" | "tv";
            name: string;
            poster_path: string;
          }
        ]
      }

## Firebase

### Collection # tracker

- handleSaveToWatchList
  > Salva um item na lista
- handleAddSeasonToTvList
  > Adiciona uma temporada no tracker
- handleGetUserWatchList
  > Busca o tracker e retorna um item
- handleGetUserWatchListAndReturn
  > Busca o tracker e atualiza o setUserTrackerList
- handleDeleteTrackerList
  > Remove vários itens de uma vez, do tracker
- handleDeleteTracker
  > Remove um item do tracker pelo id

### Collection # list

- handleCreateNewList
  > Cria uma nova lista
- handleGetUserLists
  > Busca as listas do usuário
- handleDeleteList
  > Remove uma lista pelo id

////
load user tracker list when app is on
update user tracker list when user add or remove item from tracker list
