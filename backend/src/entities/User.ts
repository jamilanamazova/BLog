import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"users"})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true,type:"text" })
  email: string;

  @Column({ unique: true,type:"text" })
  username: string;

  @Column({type:"text"})
  password_hash: string;

  @Column({ default: "USER",type:"text" })
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: "text", nullable: true })
  bio: string;

  @Column({ type: "text", nullable: true })
  avatar_url: string;
}