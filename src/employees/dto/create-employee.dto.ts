export class CreateEmployeeDto {
    nome: string;
    personalData: {
        cpf: string;
        dataNascimento: Date;
        endereco: string;
    };
    declaration: {
        possuiAcumuloCargo: boolean;
        descricaoCargo?: string;
    };
}