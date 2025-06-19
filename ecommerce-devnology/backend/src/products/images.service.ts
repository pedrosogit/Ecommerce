import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ImagesService {
    private readonly brazilianProviderUrl = 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider';
    private readonly europeanProviderUrl = 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider';

    async getImageFromProvider(productId: string, provider: 'brazilian' | 'european') {
        const url = provider === 'brazilian'
            ? `${this.brazilianProviderUrl}/${productId}`
            : `${this.europeanProviderUrl}/${productId}`;

        const response = await axios.get(url);
        return response.data.image; // Supondo que a API retorne { image: 'http://...' }
    }
}