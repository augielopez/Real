import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PropertyCard } from "./property-card";
import type { Property } from "../services/properties.service";

@Component({
  selector: "properties-list",
  standalone: true,
  imports: [CommonModule, PropertyCard],
  template: `
    <div>
      <div class="max-w-[64rem] mx-auto px-4 text-center mb-8">
        <h2 class="text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0">
          Team Listings
        </h2>
        <p class="text-lg text-surface-500 dark:text-white/64 mt-4">
          Browse our team’s active listings to see what’s available now. Your next great property could be just a click away.
        </p>
      </div>

      <div *ngIf="!properties.length" class="text-center text-white/64 py-12">
        No properties found.
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ng-container *ngFor="let p of visibleProperties">
          <property-card [property]="p"></property-card>
        </ng-container>
      </div>

      <div *ngIf="properties && properties.length > pageSize" class="flex justify-center mt-8">
        <button *ngIf="visibleCount < (properties.length || 0)" (click)="loadMore()" class="button-outlined">
          Load more
        </button>
      </div>
    </div>
  `,
})
export class PropertiesList {
  @Input() properties: Property[] = [];

  pageSize = 12;
  visibleCount = this.pageSize;

  get visibleProperties() {
    return (this.properties || []).slice(0, this.visibleCount);
  }

  loadMore() {
    this.visibleCount = Math.min((this.properties.length || 0), this.visibleCount + this.pageSize);
  }
}

