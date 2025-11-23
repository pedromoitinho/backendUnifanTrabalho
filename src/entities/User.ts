import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Application } from "./Application";
import { Organization } from "./Organization";

export enum UserRole {
  VOLUNTEER = "volunteer",
  ORGANIZATION = "organization",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.VOLUNTEER,
  })
  role: UserRole;

  @Column({ type: "simple-array", nullable: true })
  skills: string[];

  @Column({ type: "varchar", nullable: true })
  location: string;

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  longitude: number;

  @Column({ type: "simple-array", nullable: true })
  availability: string[];

  @Column({ type: "text", nullable: true })
  bio: string;

  @Column({ type: "varchar", nullable: true })
  phone: string;

  @ManyToOne(() => Organization, (org) => org.members, { nullable: true })
  organization: Organization;

  @OneToMany(() => Application, (application) => application.volunteer)
  applications: Application[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
