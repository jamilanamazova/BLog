import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("user_reads")
export class UserRead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  user_id: number;

  @Column({ type: "int" })
  post_id: number;

  @CreateDateColumn()
  created_at: Date;
}