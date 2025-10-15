import { inject, Injectable, signal } from '@angular/core';
import { DynamicFilters, SlotCreateDTO, SlotResponseDTO, SlotsService, SlotUpdateDTO, TypeSlotResponseDTO, TypeSlotService } from '../../../api';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SlotMainService {
    slotsService = inject(SlotsService);
    typeSlotService = inject(TypeSlotService);

    slots = signal<SlotResponseDTO[]>([]);
    TypeSlot = signal<TypeSlotResponseDTO[]>([]);
    totalRecords = signal(0);

    // Get slots by user
    async getAllSlotsByUser(userId: string) {
        const slots = await firstValueFrom(this.slotsService.slotsTeacherTeacherIdGet(userId));
        this.slots.set(slots.data || []);
        return slots.data || [];
    }

    async getAllSlotsByUserPaginated(userId: string, filters: DynamicFilters) {
        const slots = await firstValueFrom(this.slotsService.slotsTeacherTeacherIdPost(userId, filters));
        this.slots.set(slots.data || []);
        this.totalRecords.set(slots.count || 0);
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

    async getAllTypeSlot() {
        const typeSlot = await firstValueFrom(this.typeSlotService.typeslotAllGet());
        this.TypeSlot.set(typeSlot.data || []);
        return typeSlot.data || [];
    }
}
