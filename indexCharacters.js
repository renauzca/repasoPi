const axios = require("axios");
const e = require("express");
const { Character, Episode } = require("../../db");
const linkApi = "https://rickandmortyapi.com/api/character";
const linkEpisode = "https://rickandmortyapi.com/api/episode?page="


const getAllCharacters = async (req, res) => {

  const api = await axios.get(linkApi);

//aux = [...aux, data.results]
    // a = await axios.get(linkEpisode+i)
    // aux.push(a.data.results)
 
//  aux.push(a)
//  aux = [[...],[...],[....]]
 //console.log(aux[2].data.results.length)
// aux.flat()

const extraerDb = await Episode.findAll({
   attributes:["id", "name"]})

const result = JSON.stringify(extraerDb)

const a = JSON.parse(result)


  const filtrado = api.data.results.map((element) => {
    return {
      id: element.id,
      name: element.name,
      species: element.species,
      image: element.image,
      episode: element.episode.map((url, i)=>{
        let b = url.split("/")
        b=b[b.length-1]
      
        console.log(b.sort());
        // if(a.includes(b[b.length-1])){
        //     return result[i].name
        // }
      })



      // episode: element.episode.map(e=> {
      //   if(e.characters.includes(element.url)){
      //              return e.name
      //           }
      // })

    

      
    //   episode: ep.data.results.map((e)=>{
    //     if(e.characters.includes(element.url)){
    //        return e.name
    //     }
    //   })
    //   episode: ep.data.results.map((e, index) => {
    //     if(e.id === element.id){
    //         console.log(ep.data.results.name);
    //         return ep.data.results[index].name
    //     }
    //   }),
    };
  });
  //console.log(aux.characters);
//  console.log(ep.data.results.characters + " toni")
  const allDb = await Character.findAll({
    include: {
        model: Episode,
        attributes: ["name"]
    }
  })


    const mejunje = [...filtrado, ...allDb]

  try {
    return res.send(result[2].name);
  } catch (error) {
    return res.send(error + " " + "el error esta en el pedido a la api de personajes");
  }



};

const createCharacter = async (req, res) => {};

module.exports = { getAllCharacters, createCharacter };
