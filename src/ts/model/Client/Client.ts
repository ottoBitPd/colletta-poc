import {UserClient} from "./UserClient";
import {ExerciseClient} from "./ExerciseClient";
import {ClassClient} from "./ClassClient";


class Client {
    private userClient: UserClient | undefined;
    private exerciseClient: ExerciseClient | undefined;
    private classClient: ClassClient | undefined;


    private constructor(userClient: UserClient | undefined, exerciseClient: ExerciseClient | undefined, classClient: ClassClient | undefined) {
        this.userClient = userClient;
        this.exerciseClient = exerciseClient;
        this.classClient = classClient;
    }


    getUserClient(): UserClient | undefined {
        return this.userClient;
    }

    getExerciseClient(): ExerciseClient | undefined {
        return this.exerciseClient;
    }

    getClassClient(): ClassClient | undefined {
        return this.classClient;
    }

    public static builder = class ClientBuilder{
        private dbClassManager: ClassClient | undefined;
        private dbExerciseManager: ExerciseClient | undefined;
        private dbUserManager: UserClient | undefined;

        buildClassClient(): ClientBuilder {
            this.dbClassManager = new ClassClient();
            return this;
        }

        buildExerciseClient(): ClientBuilder {
            this.dbExerciseManager = new ExerciseClient();
            return this;

        }

        buildUserClient(): ClientBuilder {
            this.dbUserManager = new UserClient();
            return this;
        }

        build() : Client {
            return new Client(this.dbUserManager, this.dbExerciseManager, this.dbClassManager);
        }
    }
}
/*
    export class ClientBuilder {
        private dbClassManager: ClassClient | undefined;
        private dbExerciseManager: ExerciseClient | undefined;
        private dbUserManager: UserClient | undefined;

        buildClassClient(): ClientBuilder {
            this.dbClassManager = new ClassClient();
            return this;
        }

        buildExerciseClient(): ClientBuilder {
            this.dbExerciseManager = new ExerciseClient();
            return this;

        }

        buildUserClient(): ClientBuilder {
            this.dbUserManager = new UserClient();
            return this;
        }

        build() {
            return new Client(this.dbClassManager, this.dbExerciseManager, this.dbUserManager);
        }

    }
}*/

export {Client}