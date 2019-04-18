
import * as Admin from "firebase-admin";
import {Data} from "../Data/Data";

abstract class FirebaseManager {
    private static registry: Map<string, FirebaseManager> = new Map<string, FirebaseManager>();
    protected static database: Admin.database.Database = FirebaseManager.initDB();

    protected constructor() {

    }
    /**
     * This method executes the connection with firebase database.
     * @returns {admin.database.Database} reference to the database service.
     */
    private static initDB() {
        const admin = require("firebase-admin");

        //altro metodo
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: 'colletta-3e789',
                clientEmail: 'firebase-adminsdk-e5uh6@colletta-3e789.iam.gserviceaccount.com',
                privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDa5DAZ17JNk79q\nWqbpppmOirHAzj3Z7udelxcNjtSamglic/hYlOkcLGx70fS8TQY1WwwUZSc4vTwN\nlXZMkyZ9ZM66dUzZM7e52NLlPi2OERZAOw27Kk3hMKtQf/qgdDPma6XtC3ST6Xe0\njlq3E7t1d0F/4XR7RklkC48TejNmaXGAJp7XNCBwTrIICSOMSIkGjTqPjcfnxaRw\npAQc+/YIGTBanuJNURX6EwCYpH7Kpmf/zW/HpbqqHHkG0utLvoR97MZHf0G+KrhX\nBR0PBNHlV52wPoWMciPK4Ux0Kq2kjbXQMPpJV4bOOsrdQJwVhJ0uF+SLKpu1cEoB\nf3J5unxJAgMBAAECggEAAmAIvhULNiCI6o9kgYNJZgSvAFW0kdtv5wS6by8aMznB\n6Y+y1Yo7G89HF5JcBpmK3FQaNdPxqKHUB500MQlFOQXZoOgSLwaqwxFdW3ew4Jpi\nnIyPffUL7oo7x6Y12t0b7Y+EN8XgrFSzk/HZ/ePQzEngm/G/NPG6rONbuHVCXsV3\nvMySpDrXfsASQ3M8SUAme8lZ12zDBPvvZKSFYS6xw6cRZTUz976lfSi+JHiS2DTx\nSmJtlYRnx3HlHhH29XknkxI70FDMqpY2vO/N9WaFIHCJz24+q4S8YlbuZEoNKrEc\nuS1TjaEdobx1fsC7KLPuyGkM8c3ODi6oXuRwihDecQKBgQD6K6KSB6U0XzmyZ0cL\nDUDUe4pP6mG5GC27C+wV1qIfM2nN8NdWnRTg55KZBOKsGOBcL2zGZK0CGQ0AR54f\n/MKBqoGqd4QbN/R2isVg59iCanncBvwn+TjxNKwnDBSqvkIMmwI6ioV8ZWoUjIPC\nyhqpV4GQxF1sLTi0/Id+/E2ekQKBgQDf/fX21Q3fqKj+5nZSdch8uMpC+B0A0VHY\n5U/W+2aX15SXulZmUB72un1qg+J4Ap+psCtk32XfRlgfb6nIC8KHrAXycMRknnbw\nVxnWoPLKs7sP7QISD9CcFSBogsp5P+xiI9cNhRIditjRmT1l5Ucg2U1Yjcmubyp3\n4xABWQJOOQKBgDMc4zRO15QhuJoYu80oQgynyRSW4Kx+oilLQEsd9TXGvWFUScrq\ngS+KYMte0ikzU/PBxMmsHCUHlT5vY4FJlTwE6EU58gXVot7tb3JjLDtJIeiwjKhm\nJRozFtFLiJVyFfCZYxUu5CMMXWYhZ3JO9K+Qr2oylJvbiXCA//YT+o/hAoGBAIfJ\nG79rfsKUKwaDTT1F26kIGM0qPeLOAdD7ij/oHVR1QsYMFu5lKbAmc3sLwlFAPewP\nOO8ookgNC8Ta21DDGEVI2j4TcGsSyUV/d9FttmF9PSw1YGj0n2DPSdsxVm7Ueocv\n9OFkRwwTrMa7H8ZSjKD0OngxVA7joxoUUxKOE+C5AoGAY3N0Vc5Oi2t1ejEpFbFG\n+QqqMEPrGF3mRDo8UHliA5cZTltz29XYhlT1kPQ+afP6uOnt6I5q5Andu28eEJHm\n9Kp4ZJt9rGlZJJqfg0uYFPQyXLYz0EKeWxsg1EGxthYR/ZxUXyfC2GRUmlQ+XyDU\npEAmb5aRTVNzshtw7q97udE=\n-----END PRIVATE KEY-----\n",
            }),
            databaseURL: "https://colletta-3e789.firebaseio.com"
        });

        /*
        //altro modo che funziona meno
        var serviceAccount = require('./colletta-3e789-firebase-adminsdk-e5uh6-c5f75d36ee.json');

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://colletta-3e789.firebaseio.com"
        });*/
        return admin.database();
    }

    protected static lookup(istanceName: string): FirebaseManager | null | undefined{
        if (FirebaseManager.registry.has(istanceName))
            return FirebaseManager.registry.get(istanceName);
        return null;
    }


    abstract insert(obj: Data): Promise<boolean>;

    abstract remove(id: string): Promise<boolean>;

    abstract elements(): Promise<Map<string, string>>;

    abstract search(dataName:string) : Promise<string>;

    abstract read(id: string): Promise<Data>;

    abstract update(path:string, value: any): void;

    static registerInstance(instanceName : string, instance : FirebaseManager) : void{
        FirebaseManager.registry.set(instanceName,instance);
    }

    static getInstance(instanceName : string) : FirebaseManager {
        const dbInstance = FirebaseManager.lookup(instanceName);
        if(dbInstance === null || dbInstance === undefined)
            throw new Error('Error: Database non trovato');
        return dbInstance;
    }

}

export {FirebaseManager};