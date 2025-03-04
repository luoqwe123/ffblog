import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { query } from 'express';

@Injectable()
export class PrismaService extends PrismaClient {
   
    constructor() {
        super({
            log: ['query']

        })

    }

}
