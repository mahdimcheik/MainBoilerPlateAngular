import { inject, Injectable, signal } from '@angular/core';
import { Cursus, CursusCreateDTO, CursusResponseDTO, CursusService, CursusUpdateDTO } from '../../../api';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CursusesMainServiceService {
    cursusService = inject(CursusService);

    cursuses = signal<CursusResponseDTO[]>([]);

    async getAllCursusesByUser(teacherId: string) {
        const cursuses = await firstValueFrom(this.cursusService.cursusTeacherTeacherIdGet(teacherId));
        this.cursuses.set(cursuses.data || []);
        return cursuses.data || [];
    }

    async createCursus(cursus: CursusCreateDTO) {
        const newCursus = await firstValueFrom(this.cursusService.cursusCreatePost(cursus));
        this.cursuses.update((current) => [...current, newCursus.data!]);
        return newCursus.data;
    }

    async updateCursus(cursusId: string, cursus: CursusUpdateDTO) {
        const updatedCursus = await firstValueFrom(this.cursusService.cursusUpdateIdPut(cursusId, cursus));
        this.cursuses.update((current) => current.map((c) => (c.id === cursusId ? updatedCursus.data! : c)));
        return updatedCursus.data;
    }

    async deleteCursus(cursusId: string) {
        await firstValueFrom(this.cursusService.cursusDeleteIdDelete(cursusId));
        this.cursuses.update((current) => current.filter((c) => c.id !== cursusId));
    }
}
