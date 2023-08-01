import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { CreateStudentInput } from './create-strudent.input';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query((returns) => [StudentType])
  getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Query((returns) => StudentType)
  getStudentByIdRsl(@Args('id') id: string) {
    return this.studentService.getStudentByIdSrv(id);
  }

  @Mutation((returns) => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }
}
