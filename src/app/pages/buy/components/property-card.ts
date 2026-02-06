import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import type { Property } from "../services/properties.service";

@Component({
  selector: "property-card",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="rounded-2xl overflow-hidden border border-white/8 bg-white/4 shadow-[0px_6px_18px_rgba(2,6,23,0.25)]">
      <div class="w-full h-44 bg-gray-200 relative">
        <img
          *ngIf="photoUrl; else placeholder"
          [src]="photoUrl"
          [alt]="'Photo of ' + (property?.['Property Name'] || 'property')"
          class="object-cover w-full h-full"
        />
        <ng-template #placeholder>
          <div class="w-full h-full flex items-center justify-center text-surface-500 bg-white/6">
            No image
          </div>
        </ng-template>
      </div>
      <div class="p-4">
        <h3 class="text-lg font-semibold text-surface-950">
          {{ property?.['Property Name'] }}
        </h3>
        <p class="text-sm text-surface-700 mt-1">
          {{ property?.City }}, {{ property?.State }}
        </p>
        <div class="mt-3 flex items-center justify-between">
          <div class="text-surface-950 font-medium">
            {{ formattedPrice }}
          </div>
          <a [routerLink]="['/second-pages/contact']" class="button-regular px-3 py-1 text-sm">View</a>
        </div>
        <div class="mt-2 text-sm text-surface-700 flex gap-4">
          <div>{{ property?.Bedrooms ?? "-" }} bd</div>
          <div>{{ property?.Bathrooms ?? "-" }} ba</div>
          <div *ngIf="squareFootage">{{ squareFootage }} sqft</div>
        </div>
      </div>
    </div>
  `,
})
export class PropertyCard {
  @Input() property?: Property;

  get photoUrl() {
    const p = this.property;
    if (!p || !p.Photos || !p.Photos.length) return null;
    return p.Photos[0]?.thumbnails?.large?.url ?? p.Photos[0]?.url ?? null;
  }

  get formattedPrice() {
    const price = Number(this.property?.["Most Recent List Price"] ?? 0);
    if (!price || price === 0) return "Contact for price";
    return price.toLocaleString("en-US", { style: "currency", currency: "USD" });
  }

  get squareFootage() {
    return this.property?.["Square Footage"] ?? null;
  }
}

