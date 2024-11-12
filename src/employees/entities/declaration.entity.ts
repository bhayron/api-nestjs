import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm';

@Entity('declaration')
export class Declaration {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    possuiAcumuloCargo: boolean;

    @Column({ nullable: true })
    descricaoCargo?: string;
}