import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lend } from '../../book_service/entities/lend.dto';

@Entity({ name: 'user', schema: 'public' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  @Column('varchar', {
    name: 'username',
    length: 50,
    nullable: false,
    onUpdate: 'CASCADE',
    default: () => "CONCAT(first_name,' ',last_name)",
  })
  username: string;
  @Column({ type: 'varchar', name: 'first_name', length: 50, nullable: false })
  firstName: string;
  @Column({ type: 'varchar', name: 'last_name', length: 50, nullable: false })
  lastName: string;
  @Column({
    type: 'varchar',
    name: 'email',
    length: 80,
    nullable: false,
    unique: true,
  })
  email: string;
  @Column({
    type: 'varchar',
    name: 'phone_number',
    length: 15,
    nullable: false,
  })
  phoneNumber: string;
  @Column({ type: 'varchar', name: 'password', length: 255, nullable: false })
  password: string;
  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;
  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @Column({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date;
  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];
  @OneToMany(() => Lend, (lend) => lend.user)
  lends: Lend[];
}

@Entity({ name: 'role', schema: 'public' })
export class Role {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  @Column({ type: 'varchar', name: 'name', length: 50, nullable: false })
  name: string;
  @Column({ type: 'varchar', name: 'description', length: 255, nullable: true })
  description: string;
  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @Column({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date;
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
