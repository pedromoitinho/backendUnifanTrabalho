import { AppDataSource } from "../config/database";
import { Organization } from "../entities/Organization";

export interface CreateOrganizationDTO {
  name: string;
  description: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  causes?: string[];
  logoUrl?: string;
}

export interface UpdateOrganizationDTO extends Partial<CreateOrganizationDTO> {}

export class OrganizationService {
  private organizationRepository = AppDataSource.getRepository(Organization);

  async create(data: CreateOrganizationDTO): Promise<Organization> {
    const existingOrg = await this.organizationRepository.findOne({
      where: { name: data.name },
    });

    if (existingOrg) {
      throw new Error("Organização com este nome já existe");
    }

    const organization = this.organizationRepository.create(data);
    return await this.organizationRepository.save(organization);
  }

  async findAll(): Promise<Organization[]> {
    return await this.organizationRepository.find({
      relations: ["opportunities"],
    });
  }

  async findById(id: string): Promise<Organization> {
    const organization = await this.organizationRepository.findOne({
      where: { id },
      relations: ["opportunities", "members"],
    });

    if (!organization) {
      throw new Error("Organização não encontrada");
    }

    return organization;
  }

  async update(
    id: string,
    data: UpdateOrganizationDTO
  ): Promise<Organization> {
    const organization = await this.findById(id);
    Object.assign(organization, data);
    return await this.organizationRepository.save(organization);
  }

  async delete(id: string): Promise<void> {
    const organization = await this.findById(id);
    await this.organizationRepository.remove(organization);
  }
}
