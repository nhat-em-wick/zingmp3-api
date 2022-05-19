const ZingMp3 = require('../zing-api')

const zingController = {
  getSong: async (req, res) => {
    try {
      const id = req.query.id
      const response = await ZingMp3.getSong(id)
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  },
  getHome: async (req, res) => {
    try {
      const response = await ZingMp3.getHome()
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  },
  getPlayList: async (req, res) => {
    try {
      const id = req.query.id
      console.log(id)
      const response = await ZingMp3.getDetailPlaylist(id)
      // res.send(response)
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  },
  getTop100: async (req, res) => {
    try {
      const response = await ZingMp3.getTop100()
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  },
  getSearch: async (req, res) => {
    try {
      const q = req.query.q
      const response = await ZingMp3.search(q)
      // res.send(response)
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = zingController