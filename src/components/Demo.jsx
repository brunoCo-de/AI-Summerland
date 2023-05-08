import { useState, useEffect } from "react";

import { github, linkedin, copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="mt-16 w-full max-w-xl mb">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Entrez le lien de votre article (URL) "
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />

          <button
            type="submit"
            className="submit_btn
             peer-focus:border-gray-700
             peer-focus:text-gray-700"
          >
            🏹
          </button>
        </form>

        {/* Historique des URL visités */}
        <div className="flex flex-col gap-1 max-h-60 overflow-w-auto">
          {allArticles.slice(0, 4).map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>

              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Affichons les résultats */}

      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Eh bien, ceci n&apos;est pas supposé arriver ...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl ">
                Article <span className="blue_gradient"> Résumé </span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-xm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>

      <div className="flex w-full justify-center flex-row items-center">
        <img
          src={github}
          alt="github-icon"
          onClick={() =>
            window.open("https://www.linkedin.com/in/brunohappi17/")
          }
          className="cursor-pointer relative  my-2 mr-3 w-5 gap-3 "
        />
        <p className="p-3 items-center bg-white border border-gray-200 rounded-lg">
          &#x1F300; 2023 Creatives Commons 4.0
        </p>

        <img
          src={linkedin}
          alt="linkedInIcon"
          onClick={() =>
            window.open("https://www.linkedin.com/in/brunohappi17/")
          }
          className="cursor-pointer relative right-0 my-2 ml-3 w-5"
        />
      </div>
    </section>
  );
};

export default Demo;
