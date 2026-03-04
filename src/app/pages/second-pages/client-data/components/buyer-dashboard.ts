import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientData } from "@/supabase/api/client-data.api";

@Component({
  selector: "buyer-dashboard",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="py-16 lg:py-24">
      <h2 class="text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0 mb-8">
        Buyer Dashboard
      </h2>
      
      <div *ngIf="clientData" class="mb-8 p-6 rounded-2xl bg-surface-0 dark:bg-surface-900 shadow-card">
        <h3 class="text-xl font-semibold mb-4 text-surface-950 dark:text-surface-0">Client Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400">Name</p>
            <p class="text-lg text-surface-950 dark:text-surface-0">{{ clientData.client_name }}</p>
          </div>
          <div *ngIf="clientData.client_email">
            <p class="text-sm text-surface-500 dark:text-surface-400">Email</p>
            <p class="text-lg text-surface-950 dark:text-surface-0">{{ clientData.client_email }}</p>
          </div>
          <div *ngIf="clientData.client_phone">
            <p class="text-sm text-surface-500 dark:text-surface-400">Phone</p>
            <p class="text-lg text-surface-950 dark:text-surface-0">{{ clientData.client_phone }}</p>
          </div>
          <div *ngIf="clientData.client_type">
            <p class="text-sm text-surface-500 dark:text-surface-400">Type</p>
            <p class="text-lg text-surface-950 dark:text-surface-0">{{ clientData.client_type }}</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="p-6 rounded-2xl bg-surface-0 dark:bg-surface-900 shadow-card">
          <h3 class="text-xl font-semibold mb-4 text-surface-950 dark:text-surface-0">Saved Properties</h3>
          <p class="text-surface-600 dark:text-surface-400">Your saved listings will appear here.</p>
        </div>
        <div class="p-6 rounded-2xl bg-surface-0 dark:bg-surface-900 shadow-card">
          <h3 class="text-xl font-semibold mb-4 text-surface-950 dark:text-surface-0">Recent Searches</h3>
          <p class="text-surface-600 dark:text-surface-400">Your search history will appear here.</p>
        </div>
        <div class="p-6 rounded-2xl bg-surface-0 dark:bg-surface-900 shadow-card">
          <h3 class="text-xl font-semibold mb-4 text-surface-950 dark:text-surface-0">Scheduled Showings</h3>
          <p class="text-surface-600 dark:text-surface-400">Your upcoming property tours will appear here.</p>
        </div>
        <div class="p-6 rounded-2xl bg-surface-0 dark:bg-surface-900 shadow-card">
          <h3 class="text-xl font-semibold mb-4 text-surface-950 dark:text-surface-0">Pre-Approval Status</h3>
          <p class="text-surface-600 dark:text-surface-400">Your financing information will appear here.</p>
        </div>
      </div>
    </div>
  `,
})
export class BuyerDashboard {
  @Input() clientData: ClientData | null = null;
}
