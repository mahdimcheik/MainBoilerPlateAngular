/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryDTO } from './CategoryDTO';
import type { LevelDTO } from './LevelDTO';
export type CursusDto = {
    id?: string;
    name?: string | null;
    description?: string | null;
    levelId?: string;
    level?: LevelDTO;
    categoryId?: string;
    category?: CategoryDTO;
    createdAt?: string;
    updatedAt?: string | null;
};

