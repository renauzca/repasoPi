const axios = require("axios");
const { Character, Episode } = require("../../db");
const linkApi = "https://rickandmortyapi.com/api/episode";

const getAllEpisodes = async (req, res) => {


  try {
      if (!(await Episode.findAll()).length) {
        const nPages = await (
          await axios.get("https://rickandmortyapi.com/api/episode")
        ).data.info.pages;
        const links = [];
        //console.log(nPages);
        for (let i = 1; i <= nPages; i++) {
          links.push(`https://rickandmortyapi.com/api/episode?page=${i}`);
        }
        const data = await Promise.all(links.map((link) => axios.get(link)));
        const episodes = data.map((el) => el.data.results).flat();
        await Episode.bulkCreate(episodes);
 
      }

  } catch (error) {
    return error + " " + "error al traer la info de la api de episodios";
  }
};

module.exports = { getAllEpisodes };
