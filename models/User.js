const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
// salt를 이용해서 비밀번호를 암호화 해야하기 때문에 salt를 생성하기 위해 필요한 saltRounds 변수 선언
const saltRounds = 10

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
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }