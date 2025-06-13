import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('simple-json')
    items: Array<{
        productId: string;
        quantity: number;
        price: number;
        name: string;
    }>;

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ nullable: true })
    customerEmail?: string;

    @Column({ default: 'pending' })
    status: 'pending' | 'completed' | 'cancelled';
}