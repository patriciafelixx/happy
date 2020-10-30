import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import OrphanageView from '../views/orphanages_view';

const OrphanagesController = {
    index: async (req:Request, res:Response) => {
        const orphanagesRepository = getRepository(Orphanage);
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        })

        return res.json(OrphanageView.renderMany(orphanages));
    },
    show: async (req:Request, res:Response) => {
        const { id } = req.params;
        const orphanagesRepository = getRepository(Orphanage);
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });
        
        return res.json(OrphanageView.render(orphanage));
    },
    create: async (req:Request, res:Response) => {
        const { name, latitude, longitude, about, instructions, opening_hours, open_on_weekends } = req.body;
        const imagesArr = req.files as Express.Multer.File[];

        const images = imagesArr.map(image => {
            return { path: image.filename };
        })
        
        const orphanagesRepository = getRepository(Orphanage);
        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        })
    
        await orphanagesRepository.save(orphanage);    
        res.status(201).json(orphanage);
    }
}

export default OrphanagesController;