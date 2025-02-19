import ToggleTheme from "./daisyui/ToggleTheme";

interface Props {
  onSearch: (searchText: string) => void;
}

const Navbar = ({ onSearch }: Props) => {
  return (
    <nav className="flex md:justify-between items-center text-md font-semibold h-22 md:px-6 justify-between px-4 bg-base-200">
      <div>
        <h2 className="md:text-3xl md:font-extrabold hidden">GamersHub</h2>
        <h2 className="text-3xl font-extrabold">GH</h2>
      </div>
      <label className="input w-[50vw] h-12">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          onChange={(e) => onSearch(e.target.value)}
          className="grow"
          placeholder="Search"
        />
      </label>
      <ToggleTheme />
    </nav>
  );
};

export default Navbar;
