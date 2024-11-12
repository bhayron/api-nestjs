import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { PaginationDto } from './dto/pagination-filter.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) { }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeesRepository.create(createEmployeeDto);
    return await this.employeesRepository.save(employee);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: Employee[], total: number }> {
    const { page, limit, nome, orderBy, orderDirection } = paginationDto;

    const where: FindOptionsWhere<Employee> = {};
    if (nome) {
      where.nome = Like(`%${nome}%`);
    }

    const order = {};
    if (orderBy) {
      order[orderBy] = orderDirection || 'ASC';
    }

    const [data, total] = await this.employeesRepository.findAndCount({
      where,
      relations: ['personalData', 'declaration'],
      take: limit,
      skip: (page - 1) * limit,
      order,
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Employee> {
    return await this.employeesRepository.findOne({
      where: { id },
      relations: ['personalData', 'declaration']
    });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    await this.employeesRepository.update(id, updateEmployeeDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.employeesRepository.delete(id);
  }
}