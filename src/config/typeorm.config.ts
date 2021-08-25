import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions ={
    // type:'mysql',
    // host: 'localhost',
    // port: 3306,
    // username: 'root',
    // password: '',
    // database: 'crash-course',
    // autoLoadEntities: true,
    // entities: [
    //     __dirname + '/../**/*.entity{.ts,.js}',
    // ],
    // synchronize: true

    type:'mssql',
    host: 'localhost',
    port: 1433,
    username: 'DESKTOP-QLDHIHT\Gautam Ajani',
    password: '',
    database: 'crash-course',
    autoLoadEntities: true,
    synchronize: true
}