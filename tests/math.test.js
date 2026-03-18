import { sum } from "../util/math.js";
import { describe, it, expect } from "@jest/globals";

describe ("Basic math opreation ", ()=>{
    it("should add two numbers perfectly", ()=>{
        const firstNumber = 5;
        const secondNumber = 10;
        
        const result = sum(firstNumber, secondNumber);

        expect(result).toBe(15);
    })
})
