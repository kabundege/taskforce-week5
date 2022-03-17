// import {
//     Entity,
//     Column,
//     PrimaryGeneratedColumn,
//     OneToMany,
//   } from 'typeorm/browser';

// import { Todo } from '../../../types';
  
//   @Entity('todo')
//   export class Author {
//     @PrimaryGeneratedColumn()
//     id: number;
  
//     @Column()
//     name: string;
  
//     @Column({nullable: true})
//     birthdate: string;
  
//     @OneToMany((type: any) => Todo, (todo) => todo.id)
//     posts: Todo[];
//   }