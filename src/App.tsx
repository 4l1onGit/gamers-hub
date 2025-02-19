import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import GameCard from "./components/daisyui/GameCard";

export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  rating_top: number;
  released: string;
  platforms: {
    platform: Platform;
  }[];
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

interface Genre {
  id: number;
  name: string;
}

interface GameQuery {
  genre: string | null;
  platform: string | null;
  page: number;
  search: string | null;
}

function App() {
  const [games, setGames] = useState<Game[]>();
  const [genres, setGenres] = useState<Genre[]>();
  const [platforms, setPlatforms] = useState<Platform[]>();
  const [totalGames, setTotalGames] = useState(1);

  const [gameQuery, setGameQuery] = useState<GameQuery>({
    genre: null,
    platform: null,
    page: 1,
    search: "",
  });

  // Replace with react query for reduce api calls

  useEffect(() => {
    const response = axios.get("https://api.rawg.io/api/games", {
      params: {
        key: import.meta.env.VITE_API_KEY,
        page: gameQuery?.page,
        platforms: gameQuery?.platform,
        genres: gameQuery?.genre,
        search: gameQuery?.search,
      },
    });

    response
      .then((d) => {
        setTotalGames(d.data.count);
        setGames(d.data.results);
      })
      .catch((e) => console.log(e));
  }, [gameQuery]);

  useEffect(() => {
    axios
      .get("https://api.rawg.io/api/genres", {
        params: { key: import.meta.env.VITE_API_KEY },
      })
      .then((d) => setGenres(d.data.results));
  }, []);

  useEffect(() => {
    const response = axios.get("https://api.rawg.io/api/platforms", {
      params: { key: import.meta.env.VITE_API_KEY },
    });

    response.then((res) => setPlatforms(res.data.results));
  }, []);

  const decrementPage = () => {
    if (gameQuery.page > 1)
      setGameQuery({ ...gameQuery, page: gameQuery.page - 1 });
  };

  const incrementPage = () => {
    if (gameQuery.page < Math.ceil(totalGames / 20))
      setGameQuery({ ...gameQuery, page: gameQuery.page + 1 });
  };

  return (
    <>
      <Navbar
        onSearch={(search: string) =>
          setGameQuery({ ...gameQuery, search: search })
        }
      />
      <div className="flex md:px-10 px-6 h-[100vh] py-6">
        <div className="flex flex-col w-full space-y-10">
          <h2 className="text-3xl font-bold">Games</h2>
          <div className="flex space-x-4">
            <div className="join">
              <button className="join-item btn" onClick={decrementPage}>
                «
              </button>
              <button className="join-item btn">Page {gameQuery.page}</button>
              <button className="join-item btn" onClick={incrementPage}>
                »
              </button>
            </div>
            <select
              className="select select-neutral"
              onChange={(e) =>
                setGameQuery({
                  ...gameQuery,
                  platform: e.target.value.toString(),
                })
              }
            >
              <option disabled={true}>Choose platform</option>
              <option value={1}>All</option>
              {platforms?.map((platform) => (
                <option value={platform.id}>{platform.name}</option>
              ))}
            </select>
            <select
              onChange={(e) =>
                setGameQuery({
                  ...gameQuery,
                  genre: e.target.value.toString(),
                })
              }
              className="select select-neutral"
            >
              {genres?.map((genre) => (
                <option value={genre.id}>{genre.name}</option>
              ))}
            </select>
          </div>

          <div className="md:grid lg:grid-cols-4 md:grid-cols-2 md:gap-10 w-full space-y-6 pb-4 flex flex-col">
            {games != undefined && games?.length > 0
              ? games?.map((game) => <GameCard game={game} />)
              : "Loading"}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
