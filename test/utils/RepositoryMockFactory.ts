import { MockType } from "./MockType";
import {  Repository } from "typeorm";

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    find: jest.fn(),
    save: jest.fn()
}))