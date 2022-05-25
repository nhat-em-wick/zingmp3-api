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
      const response = await ZingMp3.getDetailPlaylist(id)
      // res.send(response)
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  },
  getInfoSong: async (req, res) => {
    try {
      const id = req.query.id
      const response = await ZingMp3.getInfoSong(id)
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
  getSearchAll: async (req, res) => {
    try {
      const q = req.query.q
      const response = await ZingMp3.searchAll(q)
      // res.send(response)
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  },
  getSearchComponent: async (req, res) => {
    try {
      const q = req.query.q
      const type = req.query.type
      const page = req.query.page || 1
      const count = req.query.count || 18
      const response = await ZingMp3.searchComponent(q, type, page, count)
      // res.send(response)
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  },
  getChart: async (req, res) => {
    try {
      const response = await ZingMp3.getChartHome()
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  },
  getNewRelease : async (req, res) => {
    try {
      const response = await ZingMp3.getNewReleaseChart()
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  },
  getSectionBottom : async (req, res) => {
    try {
      const {id} = req.query
      const response = await ZingMp3.getSectionBottom(id)
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = zingController