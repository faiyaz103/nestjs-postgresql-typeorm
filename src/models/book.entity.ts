import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'book'})
export class BookEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({type:'varchar', length:300})
    bookName:string;

    @Column({type:'varchar', length:300})
    author:string;

    @CreateDateColumn({type:'timestamptz', default:()=>'CURRENT_TIMESTAMP'})
    releaseDateTime:Date;

    @CreateDateColumn({type:'timestamptz', default:()=>'CURRENT_TIMESTAMP'})
    createDateTime:Date;

    @UpdateDateColumn({type:'timestamptz', default:()=>'CURRENT_TIMESTAMP'})
    updateDateTime:Date;
}