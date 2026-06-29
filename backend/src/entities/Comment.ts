import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  post_id: number;

  @Column({ type: "int" })
  user_id: number;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "int", nullable: true, default: null })
  parent_id: number | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}