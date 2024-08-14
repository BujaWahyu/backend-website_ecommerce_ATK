import { Exclude } from 'class-transformer';
import { Item } from 'src/items/item.entity';
import { Entity, 
         Column, 
         PrimaryGeneratedColumn, 
         AfterInsert, AfterRemove, 
         AfterUpdate, 
         OneToMany } from 'typeorm'

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    @Exclude()
    password:string;

    @Column()
    fotoProfil: string;

    @Column()
    alamat: string;

    @Column({default:false})
    admin:boolean;

    @OneToMany(()=> Item, (item)=> item.user)
    Items: Item[];

    @AfterInsert()
    loginsert(){
        console.log('Inserted user success with id: '+this.id);
    }

    @AfterUpdate()
    logupdate(){
        console.log('update user success with id: '+this.id);
    }

    @AfterRemove()
        logremove(){
            console.log('remove user success with id: '+this.id);
    }
} 