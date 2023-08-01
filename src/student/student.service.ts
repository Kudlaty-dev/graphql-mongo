import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { CreateStudentInput } from './create-strudent.input';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}
  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });
    return await this.studentRepository.save(student);
  }

  async getAllStudents(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async getStudentByIdSrv(id): Promise<Student> {
    return await this.studentRepository.findOne({ where: { id: id } });
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: { id: { $in: studentIds } as any },
    });
  }
}
