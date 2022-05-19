require('dotenv').config()
const axios = require("axios");
const crypto = require("crypto-browserify");

const VERSION = "1.5.4";
const URL = "https://zingmp3.vn";
const SECRET_KEY = process.env.SECRET_KEY;
const API_KEY = process.env.API_KEY;
const CTIME = String(Math.floor(Date.now() / 1000));

const getHash256 = (a) => {
  return crypto.createHash("sha256").update(a).digest("hex");
};

const getHmac512 = (str, key) => {
  let hmac = crypto.createHmac("sha512", key);
  return hmac.update(Buffer.from(str, "utf8")).digest("hex");
};

const hashParam = (path, id) => {
  if (id === undefined) {
    return getHmac512(
      path + getHash256(`ctime=${CTIME}version=${VERSION}`),
      SECRET_KEY
    );
  } else {
    return getHmac512(
      path + getHash256(`ctime=${CTIME}id=${id}version=${VERSION}`),
      SECRET_KEY
    );
  }
};

const hashParamHome = (path, page) => {
  return getHmac512(
    path + getHash256(`ctime=${CTIME}page=${page}version=${VERSION}`),
    SECRET_KEY
  );
};

const hashParamMV = (
  path,
  id,
  type,
  page,
  count
) => {
  if (count === undefined && page === undefined) {
    return getHmac512(
      path + getHash256(`ctime=${CTIME}id=${id}type=${type}version=${VERSION}`),
      SECRET_KEY
    );
  } else {
    return getHmac512(
      path +
        getHash256(
          `count=${count}ctime=${CTIME}id=${id}page=${page}type=${type}version=${VERSION}`
        ),
      SECRET_KEY
    );
  }
};

const getCookie = async () => {
  try {
    let res = await axios.get(`${URL}`);
    return res.headers["set-cookie"][1];
  } catch (err) {
    console.error(err);
  }
};

const client = axios.create({
  baseURL: `${URL}`,
});

client.interceptors.response.use((res) => res.data); // setting axios response data

const requestZingMp3 = async (path, qs) => {
  let cookie = await getCookie();

  try {
    let res = await client.get(path, {
      headers: {
        Cookie: `${cookie}`,
      },
      params: {
        ...qs,
        ctime: CTIME,
        version: VERSION,
        apiKey: API_KEY,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};

const ZingMp3 = {
  getSong : async (songId) => {
    return await requestZingMp3("/api/v2/song/get/streaming", {
      id: songId,
      sig: hashParam("/api/v2/song/get/streaming", songId),
    });
  },
  
  getDetailPlaylist : async (playlistId) => {
    return await requestZingMp3("/api/v2/page/get/playlist", {
      id: playlistId,
      sig: hashParam("/api/v2/page/get/playlist", playlistId),
    });
  },
  
  getHome : async (page = 1) => {
    return await requestZingMp3("/api/v2/page/get/home", {
      page: page,
      segmentId: "-1",
      sig: hashParamHome("/api/v2/page/get/home", page),
    });
  },
  
  getTop100 : async () => {
    return await requestZingMp3("/api/v2/page/get/top-100", {
      sig: hashParam("/api/v2/page/get/top-100"),
    });
  },
  
  getChartHome : async () => {
    return await requestZingMp3("/api/v2/page/get/chart-home", {
      sig: hashParam("/api/v2/page/get/chart-home"),
    });
  },
  
  getNewReleaseChart : async () => {
    return await requestZingMp3("/api/v2/page/get/newrelease-chart", {
      sig: hashParam("/api/v2/page/get/newrelease-chart"),
    });
  },
  
  getInfoSong : async (songId) => {
    return await requestZingMp3("/api/v2/song/get/info", {
      id: songId,
      sig: hashParam("/api/v2/song/get/info", songId),
    });
  },
  
  getArtist : async (name) => {
    return await requestZingMp3("/api/v2/page/get/artist", {
      alias: name,
      sig: hashParam("/api/v2/page/get/artist"),
    });
  },
  
  getLyric : async (songId) => {
    return await requestZingMp3("/api/v2/lyric/get/lyric", {
      id: songId,
      sig: hashParam("/api/v2/lyric/get/lyric", songId),
    });
  },
  
  search : async (name) => {
    return await requestZingMp3("/api/v2/search/multi", {
      q: name,
      sig: hashParam("/api/v2/search/multi"),
    });
  },
  
  getListMV : async (id, page, count) => {
    return await requestZingMp3("/api/v2/video/get/list", {
      id: id,
      type: "genre",
      page: page,
      count: count,
      sort: "listen",
      sig: hashParamMV("/api/v2/video/get/list", id, "genre", page, count),
    });
  },
  
  getCategoryMV : async (id) => {
    return await requestZingMp3("/api/v2/genre/get/info", {
      id: id,
      type: "video",
      sig: hashParamMV("/api/v2/genre/get/info", id, "video"),
    });
  },
  
  getVideo : async (videoId) => {
    return await requestZingMp3("/api/v2/page/get/video", {
      id: videoId,
      sig: hashParam("/api/v2/page/get/video", videoId),
    });
  },
  downloadSong: async (songId) => {
    return await requestZingMp3("/api/v2/download/post/song", {
      id: videoId,
      sig: hashParam("/api/v2/page/get/video", videoId),
    });
  },
}

module.exports = ZingMp3



