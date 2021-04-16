const service = require('../services/UserService');
const UserValidator = require('../validators/UserValidator');

module.exports = {
    async index(req, res){
        try{
            const { id } = req.params;
            let user;
            if(!id)
                user = await service.getAll();
            else
                user = await service.getById(id);

            res.status(200).send(user);
        }catch (e){
            console.error(e);
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async store(req, res){
        try{
            const userValidator = new UserValidator(req.body);

            if(!userValidator.isValid()){
                res.status(400).send(userValidator.errors()).end();
                return;
            }

            const user = await service.save(req.body);
            res.status(200).send(user);
        }catch (e){
            console.error(e);
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async update(req, res){
        try{
            const { id } = req.params;
            const userValidator = new UserValidator(req.body);

            if(!userValidator.isValid()){
                res.status(400).send(userValidator.errors()).end();
                return;
            }

            const user = await service.save(req.body, id);
            res.status(200).send(user);
        }catch (e){
            console.error(e);
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async delete(req, res){
        try{
            const { id } = req.params;

            await service.delete(id);
            res.status(200).send({
                message: 'Usuário deletado com sucesso'
            });
        }catch (e){
            console.error(e);
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    }

}