import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PaginationUserDto } from './dto/pagination-user.dto';
import { HashingService } from 'src/iam/hashing/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = this.usersRepository.create(createUserDto);
    user.password = await this.hashingService.hash(user.password);
    return await this.usersRepository.save(user);
  }

  async findAll(paginationDto: PaginationUserDto): Promise<{ data: User[], total: number }> {
    const { page, limit, nome, orderBy, orderDirection } = paginationDto;

    const where: FindOptionsWhere<User> = {};
    if (nome) {
      where.nome = Like(`%${nome}%`);
    }

    const order: Record<string, 'ASC' | 'DESC'> = {};
    if (orderBy) {
      order[orderBy] = orderDirection || 'ASC';
    }

    const [data, total] = await this.usersRepository.findAndCount({
      where,
      take: limit,
      skip: (page - 1) * limit,
      order,
    });

    return { data, total };
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashingService.hash(updateUserDto.password);
    }
    await this.usersRepository.update(id, updateUserDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}