import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Opportunity } from "./Opportunity";
import { User } from "./User";

@Entity("organizations")
export class Organization {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", unique: true })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "varchar", nullable: true })
  website: string;

  @Column({ type: "varchar", nullable: true })
  email: string;

  @Column({ type: "varchar", nullable: true })
  phone: string;

  @Column({ type: "varchar", nullable: true })
  address: string;

  @Column({ type: "varchar", nullable: true })
  location: string;

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  longitude: number;

  @Column({ type: "simple-array", nullable: true })
  causes: string[];

  @Column({ type: "varchar", nullable: true })
  logoUrl: string;

  @OneToMany(() => Opportunity, (opportunity) => opportunity.organization)
  opportunities: Opportunity[];

  @OneToMany(() => User, (user) => user.organization)
  members: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
