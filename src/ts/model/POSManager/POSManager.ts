interface POSManager {

    setModel(modelFilePath:string):void;
    train():void;
    tag():void;
    getSolution(sentence: string): any;

}

export {POSManager};