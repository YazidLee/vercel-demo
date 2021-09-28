const axios = require('axios') // 发送 REST 请求

module.exports = (req, res) => {
    let result = {}
    result = await getQQAvatar("302834972@qq.com")
    res.status(200).json(result)
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
