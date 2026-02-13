import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { Injectable } from "@nestjs/common";
import { createUserDto } from "./dto/create.dto";
import * as bcrypt  from "bcryptjs";


@Injectable()
export default class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) { }

    async reateUser(userData: createUserDto) {
        const isEmailExisting = await this.userRepo.findOne({ where: { email: userData.email } })
        if (isEmailExisting) return "email existe";

        const hashedPwd = await bcrypt.hash(userData.password, 10);
        const user = this.userRepo.create({
            ...userData,
            password: hashedPwd
        });

        return user;

    }
}