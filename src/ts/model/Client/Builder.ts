
/*import {Client} from "./Client"
import {ClassClient} from "./ClassClient";
import {UserClient} from "./UserClient";
import {ExerciseClient} from "./ExerciseClient";

class ClientBuilder {
    private dbClassManager : ClassClient | undefined;
    private dbExerciseManager : ExerciseClient | undefined;
    private dbUserManager : UserClient | undefined;

    buildClassClient() : ClientBuilder {
        this.dbClassManager = new ClassClient();
        return this;
    }
    buildExerciseClient() : ClientBuilder{
        this.dbExerciseManager = new ExerciseClient();
        return this;

    }
    buildUserClient() : ClientBuilder{
        this.dbUserManager = new UserClient();
        return this;
    }
    build(){

        return new Client(this.dbClassManager, this.dbExerciseManager, this.dbUserManager);
    }

}
export {ClientBuilder}*/