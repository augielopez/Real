# Supabase Integration

This directory contains the Supabase client configuration and API methods for database operations.

## Structure

```
supabase/
├── client.ts           # Supabase client initialization
└── api/                # Database API methods
    └── client-data.api.ts  # Client data CRUD operations
```

## Usage

### In UI Components/Services

Use the `SupabaseService` (located in `src/app/layout/service/supabase.service.ts`) to interact with the database:

```typescript
import { SupabaseService } from '@/layout/service/supabase.service';

export class MyComponent {
  supabaseService = inject(SupabaseService);

  async loadData() {
    const data = await this.supabaseService.getClientData('client-id');
  }
}
```

### Adding New API Methods

1. Create a new file in `supabase/api/` (e.g., `properties.api.ts`)
2. Import the supabase client: `import { supabase } from '../client';`
3. Define your interface and CRUD functions
4. Add methods to `SupabaseService` to expose them to the UI

## Environment Configuration

Supabase credentials are stored in:
- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

## Available API Methods

### Client Data API (`client-data.api.ts`)

- `getClientData(clientId: string)` - Fetch single client from `vw_client_data`
- `getAllClientData()` - Fetch all clients from `vw_client_data`
- `createClientData(data)` - Insert new client record
- `updateClientData(clientId, updates)` - Update existing client
- `deleteClientData(clientId)` - Delete client record

## Database Views

- `vw_client_data` - View for reading client data (used in GET operations)
- `client_data` - Table for write operations (INSERT, UPDATE, DELETE)
