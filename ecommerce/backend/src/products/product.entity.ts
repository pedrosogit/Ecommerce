import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column({ type: 'datetime' }) // Ou simplesmente @Column() para deixar o TypeORM decidir
    createdAt: Date;
}