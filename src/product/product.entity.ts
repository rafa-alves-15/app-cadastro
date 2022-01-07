import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ProductStatus } from "./products-status-enum";

@Entity()
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  price: string;

  @Column()
  status: ProductStatus
}