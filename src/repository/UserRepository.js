const User = require('../models/User');

module.exports = {

    async findAll(){
        return await User.findAll();
    },

    async findById(id){
        return await User.findByPk(id);
    },

    async findByEmailAndPassword(email, password){
        return await User.findOne({ attributes:['name', 'email'] ,where: {email, password}})
    },

    async create(data){
        return await User.create(data);
    },

    async update(data, id){
        await User.update(data, {where: {id}});
        return await User.findByPk(id);
    },

    async delete(id){
        await User.destroy({where: {id}});
    }
}