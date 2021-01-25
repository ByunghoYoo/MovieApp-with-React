const mongoose = require('mongoose');
const Schema = mongoose.Schema


const favoriteSchema = mongoose.Schema({
    userFrom: {
        // ref를 설정하면 User의 정보를 다 가지고 올 수 있음
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime: {
        type: String
    }
}, { timestamps: true })


const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }