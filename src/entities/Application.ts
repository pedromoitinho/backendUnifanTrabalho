import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Opportunity } from "./Opportunity";

export enum ApplicationStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  WITHDRAWN = "withdrawn",
}

@Entity("applications")
export class Application {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.applications, { eager: true })
  volunteer: User;

  @ManyToOne(() => Opportunity, (opportunity) => opportunity.applications, {
    eager: true,
  })
  opportunity: Opportunity;

  @Column({
    type: "enum",
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  status: ApplicationStatus;

  @Column({ type: "text", nullable: true })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
