import { Game } from "../../App";
import PlatformBadge from "./PlatformBadge";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const { background_image, name, rating, released, platforms } = game;
  return (
    <div className="card bg-base-200 w-96 shadow-lg h-full mx-auto">
      <figure>
        <img src={background_image} alt={`${name}_image`} />
      </figure>
      <div className="card-body space-y-2">
        <h2 className="card-title">{name}</h2>
        <div className="flex space-x-2 items-center">
          <div className="badge badge-outline badge-primary">{rating}</div>
          <div className="badge badge-outline badge-accent">{released}</div>
        </div>
        <PlatformBadge platforms={platforms} />
        <div className="card-actions justify-end">
          {/* Implement future functionality to see more details about the game */}
          {/* <button className="btn btn-primary">Read More</button> */}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
