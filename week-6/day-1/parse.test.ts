import { helpFunction, retriveResult } from "./parse"

 
jest.mock("./parse",()=>{
    const originalModule =jest.requireActual("./parse");
    return{
       ...originalModule,
       helpFunction: jest.fn(originalModule.helpFunction)
    }
})
describe("helper funciton",()=>{

    test("should return a help command when it is called",()=>{
        expect(helpFunction()).toMatch(/help/i)
    })
})

describe("retriveResult",()=>{
    test("should return a string value when it is called",()=>{
        expect(retriveResult("--env")).toEqual(expect.any(String))
    })

    test("should call help function when retrive is called with --help agrument",()=>{
        retriveResult("--env")
        expect(helpFunction).toHaveBeenCalled()
    })
})