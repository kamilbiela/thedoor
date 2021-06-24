import * as express from 'express';
import * as yup from 'yup';
import { ServiceService } from '../service/ServiceService';
import { GetServiceListQueryParams, ServiceListResponse } from 'thedoor-common';
import { JwtTokenData } from '../model/JwtTokenData';
import { Prisma } from '@prisma/client';

export function activateService(
  serviceService: ServiceService
): express.RequestHandler {
  const validateBodySchema = yup.object().shape({
    serviceId: yup.string().required(),
  });

  return (req, res, next) => (async (): Promise<any> => {
    const token: JwtTokenData = res.locals.token;

    const incomingData = {serviceId: req.params.serviceId};
    try {
      await validateBodySchema.validate(incomingData);
    } catch (e) {
      return res
        .status(400)
        .json({ error: e.message });
    }

    const data = validateBodySchema.cast(incomingData);

    try {
      await serviceService.activateForUser(data.serviceId, token.id);
    } catch (e) {
      const isUniqueError = e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002';
      if (!isUniqueError) {
        console.error(e);
        return res
          .status(500)
          .json({ error: 'server error' });
      }
    }

    res.status(204).send();

  })().catch(next);
}

export function getServiceList(
  serviceService: ServiceService,
): express.RequestHandler {
  const validateQuerySchema = yup.object().shape({
    page: yup.number().positive().optional().default(1),
    filterByName: yup.string().optional(),
  });

  return (req, res, next) => {
    (async (): Promise<any> => {
      const queryParams: GetServiceListQueryParams = validateQuerySchema.cast(req.query);
      const response: ServiceListResponse = await serviceService.getList({...queryParams});

      // @todo interface
      return res.json(response);
    })().catch(next);
  }
}
