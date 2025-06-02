const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("MedicalRecord", () => {
    let medical, user0, transactionResponse, transactionReceipt;
    beforeEach(async () => {
        const accounts = await ethers.getSigners();
        user0 = accounts[1];
        const Medical = await ethers.getContractFactory("MedicalRecord");
        medical = await Medical.connect(user0).deploy();
    })
    describe("Deployed", () => {
        it("the contract is deployed successfully", async () => {
            expect(await medical.address).to.not.equal(0);
        })
    });
    describe("Add record", () => {
        beforeEach(async () => {
            transactionResponse = await medical
                .connect(user0)
                .addRecord(
                    "sakshi",
                    20,
                    "Female",
                    "A positive",
                    "fever",
                    "fever",
                    "fever"
                )
            transactionReceipt = await transactionResponse.wait();

        });

        it("Emits a add record event", async () => {
            const eventLog = transactionReceipt.logs.map(log => {
                try {
                    return { args: log.args, name: log.fragment.name };
                } catch {
                    return null;
                }
            })

            expect(eventLog).to.not.be.null;
            console.log("eventLog\n", eventLog);
            expect(eventLog[0].name).to.equal("MedicalRecords__AddRecord");

            const args = eventLog[0].args;
            expect(args.timestamp).to.not.equal(0);
            expect(args.name).to.equal("sakshi");
            expect(args.age).to.equal(20);
            expect(args.bloodType).to.equal("A positive");
            expect(args.allergies).to.equal("fever");
            expect(args.diagnosis).to.equal("fever");
            expect(args.treatment).to.equal("fever");
        });

        it("Getrecords function is working properly or not", async () => {
            const [timestamp, name, age, gender, bloodType, allergies, diagnosis, treatment] = await medical.getRecord(1);
            expect(await medical.getRecordId()).to.equal(1);
            expect(timestamp).to.not.equal(0);
            expect(name).to.equal("sakshi");
            expect(age).to.equal(20);
            expect(bloodType).to.equal("A positive");
            expect(allergies).to.equal("fever");
            expect(diagnosis).to.equal("fever");
            expect(treatment).to.equal("fever");
        })
    })
    describe("Delete", () => {
        beforeEach(async () => {
            transactionResponse = await medical
                .connect(user0)
                .addRecord(
                    "sakshi",
                    20,
                    "Female",
                    "A positive",
                    "fever",
                    "fever",
                    "fever"
                )
            transactionReceipt = await transactionResponse.wait();
            transactionResponse = await medical.connect(user0).deleteRecord(1);
            transactionReceipt = await transactionResponse.wait();
        })

        it("Record is present in the is deleted mappings", async () => {
            expect(await medical.getDeleted(1)).to.equal(true);
        })
        it("It emits a delete event or not", async () => {
            const eventLog = transactionReceipt.logs.map(log => {
                try {
                    return { args: log.args, name: log.fragment.name };
                } catch {
                    return null;
                }
            })
            expect(eventLog).to.not.be.null;
            console.log("eventLog\n", eventLog);
            expect(eventLog[0].name).to.equal("MedicalRecords__DeleteRecord");

            const args = eventLog[0].args;
            expect(args.timestamp).to.not.equal(0);
            expect(args.name).to.equal("sakshi");
            expect(args.age).to.equal(20);
            expect(args.bloodType).to.equal("A positive");
            expect(args.allergies).to.equal("fever");
            expect(args.diagnosis).to.equal("fever");
            expect(args.treatment).to.equal("fever");
        })
    })
})