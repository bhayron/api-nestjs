import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { PersonalData } from './entities/personal-data.entity';
import { Declaration } from './entities/declaration.entity';
import { Employee } from './entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, PersonalData, Declaration])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}