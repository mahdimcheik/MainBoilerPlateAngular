import { inject, Injectable, signal } from '@angular/core';
import { SlotCreateDTO, SlotResponseDTO, SlotsService, SlotUpdateDTO } from '../../../api';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SlotMainService {
    slotsService = inject(SlotsService);

    slots = signal<SlotResponseDTO[]>([]);

    // Get slots by user
    async getAllSlotsByUser(userId: string) {
        const slots = await firstValueFrom(this.slotsService.slotsTeacherTeacherIdGet(userId));
        this.slots.set(slots.data || []);
        return slots.data || [];
    }

    async createSlot(slot: SlotCreateDTO) {
        const newSlot = await firstValueFrom(this.slotsService.slotsCreatePost(slot));
        this.slots.update((current) => [...current, newSlot.data!]);
        return newSlot.data;
    }

    async updateSlot(slotId: string, slot: SlotUpdateDTO) {
        const updatedSlot = await firstValueFrom(this.slotsService.slotsUpdateIdPut(slotId, slot));
        this.slots.update((current) => current.map((s) => (s.id === slotId ? updatedSlot.data! : s)));
        return updatedSlot.data;
    }

    async deleteSlot(slotId: string) {
        await firstValueFrom(this.slotsService.slotsDeleteIdDelete(slotId));
        this.slots.update((current) => current.filter((s) => s.id !== slotId));
    }
}
