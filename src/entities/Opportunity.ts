import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Organization } from "./Organization";
import { Application } from "./Application";

export enum OpportunityStatus {
  ACTIVE = "active",
  CLOSED = "closed",
  COMPLETED = "completed",
}

@Entity("opportunities")
export class Opportunity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "simple-array" })
  requiredSkills: string[];

  @Column({ type: "varchar" })
  location: string;

  @Column({ type: "decimal", precision: 10, scale: 7 })
  latitude: number;

  @Column({ type: "decimal", precision: 10, scale: 7 })
  longitude: number;

  @Column({ type: "simple-array" })
  schedule: string[];

  @Column({ type: "date", nullable: true })
  startDate: Date;

  @Column({ type: "date", nullable: true })
  endDate: Date;

  @Column({ type: "int", default: 1 })
  vacancies: number;

  @Column({
    type: "enum",
    enum: OpportunityStatus,
    default: OpportunityStatus.ACTIVE,
  })
  status: OpportunityStatus;

  @Column({ type: "simple-array", nullable: true })
  causes: string[];

  @ManyToOne(() => Organization, (org) => org.opportunities, { eager: true })
  organization: Organization;

  @OneToMany(() => Application, (application) => application.opportunity)
  applications: Application[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
