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
            // console.log("transaction logs\n", transactionReceipt.logs[0].fragment.name);

        });

        it("Emits a add record event", async () => {
            // const event=await transactionReceipt.events[0];
            // const event = transactionReceipt.logs.find(log => log.event === "Medical_Record_Add");
            // expect(event.event).to.equal("Medical_Record_Add")
            // const args=event.args;
            const eventLog = transactionReceipt.logs
                .map(log => {
                    try {
                        return { args: log.args, name: log.fragment.name };
                    } catch {
                        return null;
                    }
                })

            expect(eventLog).to.not.be.null;
            console.log("eventLog\n",eventLog);
            expect(eventLog[0].name).to.equal("MedicalRecords__AddRecord");

            const args = eventLog[0].args;
            // console.log("args", args);
            expect(args.timestamp).to.not.equal(0);
            expect(args.name).to.equal("sakshi");
            expect(args.age).to.equal(20);
            expect(args.bloodType).to.equal("A positive");
            expect(args.allergies).to.equal("fever");
            expect(args.diagnosis).to.equal("fever");
            expect(args.treatment).to.equal("fever");
        });
    })
})