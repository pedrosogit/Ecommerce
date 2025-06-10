import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('json')
    items: { productId: string; name: string; price: number; quantity: number }[];

    @Column()
    total: number;

    @Column()
    createdAt: Date = new Date();
}