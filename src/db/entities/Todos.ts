import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
  } from 'typeorm/browser';
import { Task } from './Tasks';

// import { Task, Todo } from '../../../types';
  
  @Entity('Todo')
  export class Todo {
    @PrimaryGeneratedColumn()
    id: string;
  
    @Column()
    title: string;

    @Column()
    color: string;

    @Column()
    remaining: number;


    @Column()
    completed: number;
  
    @OneToMany((type: any) => Task, (tasks) => tasks.todo)
    tasks: Task[];
  }