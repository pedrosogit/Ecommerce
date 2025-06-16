import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('json')
    items: { productId: string; quantity: number; price: number }[];

    @Column()
    userId: number;

    @Column('decimal')
    total: number;

    @Column({nullable: true})
    customerEmail: string;

    @Column({
        type: 'text',
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending',
    })
    status: 'pending' | 'completed' | 'cancelled';

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}