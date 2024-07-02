import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileuploadRepositoy: FileUploadRepository,
    @InjectRepository(Products)
    private readonly productRepositoy: Repository<Products>,
  ) {}
  async uploadImage(file: Express.Multer.File, productId: string) {
    //verificar que exista el producto:
    const product = await this.productRepositoy.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException('producto no encontrado');
    }
    // si el producto existe voy a cargar la iamgen en cloudinary
    const response = await this.fileuploadRepositoy.uploadImage(file);
    if (!response.secure_url) {
      throw new NotFoundException('Error al subir imagen en Cloudinary');
    }
    //actualizar la imagen
    // falta manejar el error aca
    await this.productRepositoy.update(productId, {
      imgUrl: response.secure_url,
    });
    const updateProduct = await this.productRepositoy.findOneBy({
      id: productId,
    });
    return updateProduct;
  }
}
