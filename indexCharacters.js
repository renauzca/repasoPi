const axios = require("axios");
const e = require("express");
const { Character, Episode } = require("../../db");
const linkApi = "https://rickandmortyapi.com/api/character";
const linkEpisode = "https://rickandmortyapi.com/api/episode?page=";

const getAllCharacters = async (req, res) => {
  const api = await axios.get(linkApi);

  const extraerDb = await Episode.findAll({
    attributes: ["id", "name"],
  });

  const result = JSON.stringify(extraerDb);

  const a = JSON.parse(result);
  // console.log(a)

  const filtrado = api.data.results.map((element) => {
    return {
      id: element.id,
      name: element.name,
      species: element.species,
      image: element.image,
      episode: element.episode.map((url) => {
        let b = url.split("/");
        b = b[b.length - 1];
        for (let i = 0; i <= a.length; i++) {
          if (a[i].id == b) {
            return a[i].name;
          }
        }
      }),
    };
  });
  const allDb = await Character.findAll({
    include: {
      model: Episode,
      attributes: ["name"],
    },
  });

  const mejunje = [...filtrado, ...allDb];


  try {
    return res.send(mejunje);
  } catch (error) {
    return res.send(
      error + " " + "el error esta en el pedido a la api de personajes"
    );
  }
};

const createCharacter = async (req, res) => {
  const {name, origin, especie, image, episode} = req.body
  
  try {
    const [instance, created] = await Character.findOrCreate({
      where:{name:name},
      defaults:{
        name, origin, especie, image, episode
      },
    });
    res.json({msg:"Creado con exito", character: instance, status:created})
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllCharacters, createCharacter };
