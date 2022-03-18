import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne
  } from 'typeorm/browser';
import { Todo } from './Todos';

// import { Task, Todo } from '../../../types';
  
  @Entity('Task')
  export class Task {
    @PrimaryGeneratedColumn()
    id: string;
  
    @Column()
    description: string;

    @Column()
    iscompleted: boolean;


    @ManyToOne((type: any) => Todo, (todo) => todo.tasks)
    todo: Todo;
  }// dfsfe