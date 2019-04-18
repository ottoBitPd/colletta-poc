import {HunposManager} from "../../../src/ts/model/POSManager/HunposManager";
//import * as fileSystem from 'fs';
import {expect} from 'chai';
import 'mocha';

describe('HunposManager', function () {

    let hunposManager : HunposManager;
    beforeEach(function () {
        hunposManager = new HunposManager();
    });

    describe('HunposManager.setModel()', function () {
        it('should set the model', function () {
            hunposManager.setModel("src/ts/presenter/hunpos/other_model");
            expect(hunposManager).have.property("modelFilePath","src/ts/presenter/hunpos/other_model");
        });
    });
    /* Da usare solo in locale (sulla repo mancano i file di hunpos)
    describe('HunposManager.getSolution()', function () {
        it('should set the model', function () {
            let solution = hunposManager.getSolution("ciao a tutti");
            console.log(solution);
            expect(solution.sentence[0].word).to.be.equals("ciao") &&
            expect(solution.sentence[1].word).to.be.equals("a") &&
            expect(solution.sentence[2].word).to.be.equals("tutti");
        });
    });


    // Integrazione?
    describe('HunposManager.train()', function () {
        it('should train the ML software', function () {
            let file = fileSystem.readFileSync("src/ts/presenter/hunpos/italian_model");
            hunposManager.train();
            expect(file).to.be.eql(fileSystem.readFileSync("src/ts/presenter/hunpos/italian_model"));
        });
    });

    describe('HunposManager.train()', function () {
        it('should train the ML software', function () {
            let file = fileSystem.readFileSync("src/ts/presenter/hunpos/output.txt");
            hunposManager.tag();
            expect(file).not.to.be.eql(fileSystem.readFileSync("src/ts/presenter/hunpos/output.txt"));
        });
    });*/
});
