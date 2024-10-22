import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sessions')
export class Session {
  @ApiProperty({
    type: String,
    example: 'a9b5b8b0-0b9b-4b9b-8b0b-0b9b4b8b0b9b',
    description: 'Session ID',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    example: 'a9b5b8b0-0b9b-4b9b-8b0b-0b9b4b8b0b9b',
    description: 'User ID',
    required: true,
  })
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'CASCADE' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  userId: User | string;

  @ApiProperty({
    type: String,
    example: 'a9b5b8b0-0b9b-4b9b-8b0b-0b9b4b8b0b9b',
    description: 'Session Token',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 255, nullable: false })
  token: string;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'Session Expiration Date',
    required: true,
  })
  @IsNotEmpty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  expiresAt: Date;

  @ApiProperty({
    type: String,
    example: 'Mozilla/5.0',
    description: 'User Browser',
    required: false,
  })
  @IsOptional()
  @Column({ type: 'varchar', length: 255, nullable: true })
  browser: string;
}
