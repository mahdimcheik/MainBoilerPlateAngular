import { inject, Injectable, signal } from '@angular/core';
import { LanguageResponseDTO, LanguagesService } from '../../../api';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LanguagesStoreService {
    languagesService = inject(LanguagesService);

    languagesOptions = signal<LanguageResponseDTO[]>([]);
    languages = signal<LanguageResponseDTO[]>([]);

    constructor() {
        this.loadLanguages();
    }

    async loadLanguages() {
        if (this.languagesOptions().length === 0) {
            const langs = await firstValueFrom(this.languagesService.languagesAllGet());
            this.languagesOptions.set(langs.data || []);
        }
    }

    async getLanguageByUserId(userId: string) {
        const langs = await firstValueFrom(this.languagesService.languagesUserUserIdGet(userId));
        return langs.data || [];
    }

    async updateLanguagesByUserId(languages: string[]) {
        const newLanguages = await firstValueFrom(this.languagesService.languagesUserUpdateLanguagesPost(languages));
        this.languages.set(newLanguages.data || []);
    }
}
