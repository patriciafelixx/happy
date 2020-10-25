import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

const OrphanagesController = {
    create: async (req:Request, res:Response) => {
        const { name, latitude, longitude, about, instructions, opening_hours, open_on_weekends } = req.body;
    
        const orphanagesRepository = getRepository(Orphanage);
        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        })
    
        await orphanagesRepository.save(orphanage);    
        res.status(201).json(orphanage);
    }
}

export default OrphanagesController;