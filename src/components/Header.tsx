import "../index.css";
import SocialLinks from "./SocialLinks";

const Header = () => {
  return (
    <header className="flex flex-col gap-8 mt-32">
      <div className="min-w-sm lg:w-full">
        <h1 className="text-5xl font-bold flex flex-col gap-2 mx-auto text-left lg:flex-row lg:flex-wrap lg:justify-between lg:w-full">
          <span className="px-4 py-2">Learning</span>{" "}
          <span className="text-zinc-950 bg-js-yellow px-4 py-2 lg:bg-linear-to-r">JavaScript</span>
          <span className="bg-ts-blue px-4 py-2">TypeScript</span>{" "}
          <span className="text-zinc-950 bg-react-blue px-4 py-2">React</span>
        </h1>
      </div>
      <div className="flex justify-end">
        <SocialLinks />
      </div>
    </header>
  );
};

export default Header;
