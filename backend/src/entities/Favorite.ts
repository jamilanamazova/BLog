import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique } from "typeorm";

@Entity("favorites")
@Unique(["user_id", "post_id"])
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  user_id: number;

  @Column({ type: "int" })
  post_id: number;

  @CreateDateColumn()
  created_at: Date;
}