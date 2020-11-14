import Image from '../models/Image';

const ImagesView = {
    render(image: Image) {
        return {
            id: image.id,
            // url: `http://localhost:3333/uploads/${image.path}`   // web
            url: `http://192.168.0.32:3333/uploads/${image.path}`   // mobile
        }
    },
    renderMany(images: Image[]) {
        return images.map(image => this.render(image));
    }
}

export default ImagesView;