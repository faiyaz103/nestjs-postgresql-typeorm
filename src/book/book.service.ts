import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './../models/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {

    constructor(@InjectRepository(BookEntity) private bookRepository: Repository<BookEntity>){}

    create(createBookDto: CreateBookDto): Promise<BookEntity>{
        const book=this.bookRepository.create(createBookDto);
        return this.bookRepository.save(book);
    }

    findAll(): Promise<BookEntity[]>{
        return this.bookRepository.find();
    }

    async findOne(id: string): Promise<BookEntity>{
        const book=await this.bookRepository.findOne({
            where:{id}
        });

        if(!book) throw new NotFoundException('Book not found')

        return book;
    }

    async update(id: string, updateBookDto: UpdateBookDto): Promise<BookEntity>{
        const book=await this.findOne(id);

        const updated=Object.assign(book,updateBookDto);

        return this.bookRepository.save(updated);
    }

    async remove(id: string): Promise<BookEntity>{
        
        const book = await this.bookRepository.findOne({
             where: { id } 
        });
        if (!book) throw new NotFoundException('Book not found');

        await this.bookRepository.delete(id);

        return book; 
    }
}
