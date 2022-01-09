import { Product } from "src/product/product.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  username: string;
  
  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({unique: true})
  cpf: string;

  @Column({unique: true})
  email: string;

  @OneToOne((_type) => Product, (product) => product.user, {eager: true})
  products: Product[];
}