import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import OrphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

const OrphanagesController = {
    index: async (req: Request, res: Response) => {
        const orphanagesRepository = getRepository(Orphanage);
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        })

        return res.json(OrphanageView.renderMany(orphanages));
    },
    show: async (req: Request, res: Response) => {
        const { id } = req.params;
        const orphanagesRepository = getRepository(Orphanage);
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return res.json(OrphanageView.render(orphanage));
    },
    create: async (req: Request, res: Response) => {
        const { name, latitude, longitude, about, instructions, opening_hours, open_on_weekends } = req.body;
        const orphanagesRepository = getRepository(Orphanage);
        const imagesArr = req.files as Express.Multer.File[];

        const images = imagesArr.map(image => {
            return { path: image.filename };
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends == 'true',
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });

        await schema.validate(data, {
            abortEarly: false
        })

        const orphanage = orphanagesRepository.create(data);

        await orphanagesRepository.save(orphanage);
        res.status(201).json(orphanage);
    }
}

export default OrphanagesController;