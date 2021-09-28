const axios = require('axios') // 发送 REST 请求

module.exports = (req, res) => {
    let result = {}
    try {
        console.time("QQ-Avatar")
        console.log("开始获取头像")
        axios.get("https://ssl.ptlogin2.qq.com/getface?imgtype=4&uin=302834972", { timeout: 10000 }).then(resp => {
            result = resp
            console.log("头像获取成功")
            console.timeEnd("QQ-Avatar")
        }).catch(e => {
            console.error('获取 QQ 头像失败：', e)
        })     
    } catch(e) {
        console.error('获取 QQ 头像失败：', e)
    }
    res.status(200).json(result)
}
