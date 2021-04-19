const repository = require('../repository/UserRepository');

const md5 = require('md5');
const Auth = require('./Auth');

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

    async login(data){
        const {email, password} = data;
        const user = await repository.findByEmailAndPassword(email, md5(password));

        if(!user){
            return false;
        }

        const token = await Auth.generateToken({
            id: user.id,
            email: user.email,
            name: user.name
        })

        return {
            token: token,
            user: user
        };
    },

    async delete(id){
        await repository.delete(id);
    }
}