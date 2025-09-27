/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookingResponseDTO } from './BookingResponseDTO';
import type { OrderResponseForTeacherDTO } from './OrderResponseForTeacherDTO';
import type { UserResponseDTO } from './UserResponseDTO';
export type ActivitiesTeacher = {
    ordersOfTheWeek?: Array<OrderResponseForTeacherDTO> | null;
    bookingsOftheWeek?: Array<BookingResponseDTO> | null;
    newStudents?: Array<UserResponseDTO> | null;
};

