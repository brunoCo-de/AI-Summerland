import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="suml_logo" className=" h-24 w-8 object-contain" />

        <button
          type="button"
          onClick={() => window.open("https://github.com/brunoCo-de/")}
          className="black_btn"
        >
          GitHub
        </button>
      </nav>

      <h1 className="head_text">
        Résumez vos articles <br className="max-md:hidden" />
        avec <br className="max-md:hidden" />
        <span className="green_gradient"> OpenAI GPT-4 </span>
      </h1>

      <h2 className="desc">
        Gagnez en temps avec Summerizeland, une application open-source
        transformant de longs articles en un résumé clair et concis
      </h2>
    </header>
  );
};

export default Hero;
