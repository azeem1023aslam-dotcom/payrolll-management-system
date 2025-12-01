import { Department, departmentSchema } from './../schema/department.schema';
import { Leave, leavesSchema } from './../schema/leaves.schema';
import { Employee, employeeSchema } from './../schema/employee.schema';
import { signup, signupSchema } from './../schema/auth.schema';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityLog, activityLogsSchema, Payroll, payrollSchema } from '../schema';
@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
        dbName: configService.get('MONGO_DATABASE'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {name:signup.name, schema:signupSchema},
      {name:Employee.name, schema:employeeSchema},
      {name:Leave.name, schema:leavesSchema},
      {name:Department.name, schema:departmentSchema},
      {name:ActivityLog.name, schema:activityLogsSchema},
      {name:Payroll.name, schema:payrollSchema}
    ])
  ],
  exports: [MongooseModule],
})
export class SharedModule {}