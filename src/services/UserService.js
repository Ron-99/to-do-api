const repository = require('../repository/UserRepository');

const md5 = require('md5');

module.exports = {
    async getAll(){
        return await repository.findAll();
    },

    async getById(id){
        return await repository.findById(id);
    },

    async save(data, id){
        const { name, email, password } = data;

        if(!id)
            return await repository.create({name, email, password: md5(password)});
        else
            return await repository.update({name, email, password: md5(password)}, id);
    },

    async delete(id){
        await repository.delete(id);
    }
}