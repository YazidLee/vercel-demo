const axios = require('axios') // 发送 REST 请求

module.exports = (req, res) => {
    try {
        console.time("QQ-Avatar")
        console.log("开始获取头像")
        const result = axios.get(`https://ssl.ptlogin2.qq.com/getface?imgtype=4&uin=302834972`, { timeout: 10000 })
        console.log("头像获取结束")
        console.timeEnd("QQ-Avatar")
    } cache(e) {
        console.error('获取 QQ 头像失败：', e)
    }
    return res.json({
        status: "success",
        result: "0",
    })
}
