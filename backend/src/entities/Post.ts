import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  author_id: number;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "varchar", unique: true, nullable: true })
  slug: string;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "varchar", nullable: true })
  image_url: string;

  @Column({ type: "varchar", nullable: true })
  category: string;

  @Column({ type: "int", default: 0 })
  view_count: number;

  @Column({ type: "int", default: 0 })
  like_count: number;

  @Column({ type: "int", default: 0 })
  comment_count: number;

  @Column({ type: "int", default: 0 })
  favorite_count: number;

  @Column({ type: "boolean", default: false })
  is_published: boolean;

  @Column({ type: "timestamp", nullable: true })
  published_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}