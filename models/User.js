const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
// salt를 이용해서 비밀번호를 암호화 해야하기 때문에 salt를 생성하기 위해 필요한 saltRounds 변수 선언
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,     // bh yoo@naver.com(빈칸이 존재 히는 것을 trim이 없애줌) => bhyoo@naver.com
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// pre: 현재 user정보를 저장하기 전에 실행됨
userSchema.pre('save', function( next ){
    let user = this;

    // 비밀번호 암호화
    // password가 변환될 때에만 실행되는 로직
    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)

            // 첫번째 인자: 원본 비밀번호, 두번째 인자: salt, 세번째 인자: 콜백 함수
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, callback) {
    // plainPassword(암호화 전)
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return callback(err)
        callback(null, isMatch)
    })
}

userSchema.methods.generateToken = function(callback) {
    var user = this

    // jsonwebtoken을 이용해서 토큰 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token
    // -> 'secretToken' -> user._id
    user.token = token
    user.save(function(err, user) {
        if(err) return callback(err)
        callback(null, user)
    })
}

userSchema.statics.findByToken = function(token, callback) {
    var user = this

    // 토큰 decode
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음 
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({ "_id": decoded, "token": token }, function(err, user) {
            if(err) return callback(err);
            callback(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }