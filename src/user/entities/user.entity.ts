import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;
  @Column({ name: 'username', type: 'varchar', length: 50 })
  username: string;
  @Column({ name: 'first_name', type: 'varchar', length: 50 })
  firstName: string;
  @Column({ name: 'last_name', type: 'varchar', length: 50 })
  lastName: string;
  @Column({ name: 'email', type: 'varchar', length: 50 })
  email: string;
  @Column({ name: 'phone_number', type: 'varchar', length: 50 })
  phoneNumber: string;
  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;
  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  deletedAt: Date;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;
  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;
  @Column({ name: 'description', type: 'text' })
  description: string;
  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  deletedAt: Date;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
