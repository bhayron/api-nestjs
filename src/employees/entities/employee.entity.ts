import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { PersonalData } from './personal-data.entity';
import { Declaration } from './declaration.entity';

@Entity('employes')
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @OneToOne(() => PersonalData, { cascade: true })
    @JoinColumn()
    personalData: PersonalData;

    @OneToOne(() => Declaration, { cascade: true })
    @JoinColumn()
    declaration: Declaration;
}