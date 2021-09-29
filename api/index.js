const axios = require('axios') // 发送 REST 请求
// Import the dependency.
const clientPromise = require('./mongo');

module.exports = async (req, res) => {
    // let result = {}
    // console.time("QQAvatar")
    // result = await getQQAvatar("302834972@qq.com")
    // console.timeEnd("QQAvatar")
    // res.status(200).json(result)

    // Get the MongoClient by calling await on the promise.
    // Because it is a promise, it will only resolve once.
    console.time("Get MongoDB Connection")
    const client = await clientPromise
    console.timeEnd("Get MongoDB Connection")
    // Use the client to return the name of the connected database.
    res.status(200).json({ dbName: client.db().databaseName });
}

async function getQQAvatar (qq) {
  try {
    const qqNum = qq.replace(/@qq.com/ig, '')
    const result = await axios.get(`https://ssl.ptlogin2.qq.com/getface?imgtype=4&uin=${qqNum}`, { timeout: 5000 })
    if (result && result.data) {
      const start = result.data.indexOf('http')
      const end = result.data.indexOf('"', start)
      if (start === -1 || end === -1) return null
      return result.data.substring(start, end)
    }
  } catch (e) {
    console.error('获取 QQ 头像失败：', e)
  }
}
