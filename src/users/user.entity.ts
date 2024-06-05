import {
    Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn
} from 'typeorm';

@Entity({ name: 'users' })
export class Users{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', nullable: false})
    name: string;

    @Column({ name: 'email', nullable: false, unique: true})
    email: string;

    @Column({ name: 'password', nullable: false})
    password: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
}