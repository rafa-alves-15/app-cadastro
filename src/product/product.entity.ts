import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
  status: ProductStatus;

  @ManyToOne((_type) => User, (user) => user.products, {eager: false})
  @Exclude({ toPlainOnly: true })
  user: User;
}