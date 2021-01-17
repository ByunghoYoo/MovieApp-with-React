// node 환경변수. local환경에선 development, Deploy(배포) 후에는 production으로 바뀜.
if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod')
} else {
    module.exports = require('./dev')
}