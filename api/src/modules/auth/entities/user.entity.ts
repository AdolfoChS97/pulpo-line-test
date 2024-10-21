import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    type: String,
    example: 'a9b5b8b0-0b9b-4b9b-8b0b-0b9b4b8b0b9b',
    description: 'User ID',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    example: 'john@doe.com',
    description: 'User Email',
    required: true,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @ApiProperty({
    type: String,
    example: 'string',
    description: 'User Password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Transform(({ value }) => value.trim())
  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @ApiProperty({
    type: Date,
    example: '2022-01-01T00:00:00.000Z',
    description: 'User Created At',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    type: Date,
    example: '2022-01-01T00:00:00.000Z',
    description: 'User Updated At',
  })
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({
    type: Date,
    example: '2022-01-01T00:00:00.000Z',
    description: 'User Deleted At',
  })
  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date;
}
