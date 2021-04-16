const ValidationContract = require('../validators/FluentValidator');

function Validation(data){
    const { name, email, password } = data;
    const contract = new ValidationContract();

    contract.isRequired(name, 'Campo nome obrigatório');
    contract.isRequired(email, 'Campo e-mail obrigatório');
    contract.isEmail(email, 'E-mail inválido');
    contract.isRequired(password, 'Campo senha obrigatório');
    contract.hasMinLen(password, 6, 'A senha deve possuir no mínimo 6 caracteres');
    contract.hasMaxLen(password, 12, 'A senha deve possuir no máximo 12 caracteres');

    return contract;
}

module.exports = Validation;