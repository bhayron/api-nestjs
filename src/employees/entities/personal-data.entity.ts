import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm';

@Entity('personal_data')
export class PersonalData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cpf: string;

    @Column()
    dataNascimento: Date;

    @Column()
    endereco: string;
}