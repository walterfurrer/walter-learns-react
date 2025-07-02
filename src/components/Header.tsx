import "../index.css";
import SocialLinks from "./SocialLinks";

const Header = () => {
  return (
    <header className="flex flex-col gap-8 mt-12">
      <div className="min-w-sm lg:w-full">
        <h1 className="text-5xl font-bold flex flex-col mx-auto gap-4 text-left max-w-md xl:max-w-full xl:flex-row xl:flex-wrap lg:w-full">
          <span className="p-2 flex w-fit">Walter Learns:</span>{" "}
          <span className="text-zinc-950 bg-js-yellow p-2 lg:bg-linear-to-r">JavaScript</span>
          <span className="bg-ts-blue p-2">TypeScript</span>{" "}
          <span className="text-zinc-950 bg-react-blue p-2">React</span>
        </h1>
      </div>
      <div className="flex justify-end">
        <SocialLinks />
      </div>
    </header>
  );
};

export default Header;
