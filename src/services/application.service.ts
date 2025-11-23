import { AppDataSource } from "../config/database";
import { Application, ApplicationStatus } from "../entities/Application";
import { User } from "../entities/User";

export interface CreateApplicationDTO {
  opportunityId: string;
  message?: string;
}

export interface UpdateApplicationDTO {
  status: ApplicationStatus;
}

export class ApplicationService {
  private applicationRepository = AppDataSource.getRepository(Application);

  async create(
    userId: string,
    data: CreateApplicationDTO
  ): Promise<Application> {
    const existingApplication = await this.applicationRepository.findOne({
      where: {
        volunteer: { id: userId },
        opportunity: { id: data.opportunityId },
      },
    });

    if (existingApplication) {
      throw new Error("Você já se candidatou a esta oportunidade");
    }

    const application = this.applicationRepository.create({
      volunteer: { id: userId } as User,
      opportunity: { id: data.opportunityId } as any,
      message: data.message,
      status: ApplicationStatus.PENDING,
    });

    return await this.applicationRepository.save(application);
  }

  async findByUser(userId: string): Promise<Application[]> {
    return await this.applicationRepository.find({
      where: { volunteer: { id: userId } },
      relations: ["opportunity", "opportunity.organization"],
      order: { createdAt: "DESC" },
    });
  }

  async findByOpportunity(opportunityId: string): Promise<Application[]> {
    return await this.applicationRepository.find({
      where: { opportunity: { id: opportunityId } },
      relations: ["volunteer"],
      order: { createdAt: "DESC" },
    });
  }

  async updateStatus(
    id: string,
    data: UpdateApplicationDTO
  ): Promise<Application> {
    const application = await this.applicationRepository.findOne({
      where: { id },
      relations: ["volunteer", "opportunity"],
    });

    if (!application) {
      throw new Error("Candidatura não encontrada");
    }

    application.status = data.status;
    return await this.applicationRepository.save(application);
  }

  async delete(id: string, userId: string): Promise<void> {
    const application = await this.applicationRepository.findOne({
      where: { id, volunteer: { id: userId } },
    });

    if (!application) {
      throw new Error("Candidatura não encontrada");
    }

    await this.applicationRepository.remove(application);
  }
}
