import { PrismaClient, Service } from "@prisma/client";
import _ from "lodash";
import { UuidGenerator } from "../model/UuidGenerator";

interface FindParams {
  page?: number;
  filterByName?: string;
}

export class ServiceService {
  constructor(
    private prismaClient: PrismaClient,
    private uuidGen: UuidGenerator,
  ) {
  }

  async persist(data: Omit<Service, 'id'>): Promise<Service['id']> {
    const id = this.uuidGen();

    await this.prismaClient.service.create({
      data: {
        ...data,
        id,
      }
    });

    return id;
  }

  async getList(params: FindParams): Promise<{
    data: Service[],
    next?: number,
  }> {
    const page = params.page || 1;
    const take = 10;
    const skip = (page - 1) * take;

    const data = await this.prismaClient.service.findMany({
      orderBy: {
        name: 'asc'
      },
      skip,
      take,
      where: {
        name: params.filterByName && {
          startsWith: params.filterByName
        }
      }
    });

    return {
      data,
      next: data.length === take ? page + 1 : 0
    }
  }

  async activateForUser(serviceId: string, userId: string): Promise<void> {
    await this.prismaClient.activatedService.create({
      data: {
        serviceId,
        userId
      }
    })
  }
}
