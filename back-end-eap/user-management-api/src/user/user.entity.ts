import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'John Doe',
  })
  @Column()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'johndoe@hotmail.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Masculino',
  })
  @Column()
  gender: string;

  @ApiProperty({
    type: Date,
    required: true,
    example: '1990-01-01',
  })
  @Column({ type: 'date' })
  birthdate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  registerDate: Date;
}
