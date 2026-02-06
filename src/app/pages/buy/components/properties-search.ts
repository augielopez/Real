import { Component, EventEmitter, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";

export interface PropertyFilters {
  city?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  propertyType?: string;
}

@Component({
  selector: "properties-search",
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule],
  template: `
    <div class="-mt-12 bg-surface-0 dark:bg-surface-950 max-w-[68rem] w-[92%] lg:w-auto mx-auto shadow-blue-card dark:shadow-none border-0 dark:border border-white/12 rounded-4xl lg:rounded-full p-6 lg:p-10 flex flex-col lg:flex-row gap-4 relative z-50 items-center">

      <div class="lg:flex-1 lg:max-w-48">
        <label class="block text-xs text-surface-500 mb-2">City</label>
        <input pInputText [(ngModel)]="city" name="city" placeholder="City" class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 placeholder:!text-white/60 w-full" />
      </div>

      <div class="lg:max-w-36">
        <label class="block text-xs text-surface-500 mb-2">Min $</label>
        <input pInputText [(ngModel)]="minPrice" name="minPrice" placeholder="Min $" type="number" class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 placeholder:!text-white/60 w-full" />
      </div>

      <div class="lg:max-w-36">
        <label class="block text-xs text-surface-500 mb-2">Max $</label>
        <input pInputText [(ngModel)]="maxPrice" name="maxPrice" placeholder="Max $" type="number" class="!bg-white/16 !rounded-full !py-2 !px-4 outline-none !text-white/90 placeholder:!text-white/60 w-full" />
      </div>

      <div class="lg:max-w-28">
        <label class="block text-xs text-surface-500 mb-2">Beds</label>
        <div class="relative">
          <select [(ngModel)]="bedrooms" name="bedrooms" class="!bg-white/16 !rounded-full !py-2 !px-4 !h-11 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 appearance-none w-full pr-10">
            <option [ngValue]="null">Any</option>
            <option *ngFor="let b of bedOptions" [ngValue]="b.value">{{ b.label }}</option>
          </select>
          <i class="pi pi-angle-down absolute right-4 top-1/2 -translate-y-1/2 text-white/70"></i>
        </div>
      </div>

      <div class="lg:max-w-28">
        <label class="block text-xs text-surface-500 mb-2">Baths</label>
        <div class="relative">
          <select [(ngModel)]="bathrooms" name="bathrooms" class="!bg-white/16 !rounded-full !py-2 !px-4 !h-11 outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 appearance-none w-full pr-10">
            <option [ngValue]="null">Any</option>
            <option *ngFor="let b of bathOptions" [ngValue]="b.value">{{ b.label }}</option>
          </select>
          <i class="pi pi-angle-down absolute right-4 top-1/2 -translate-y-1/2 text-white/70"></i>
        </div>
      </div>

      <div class="flex gap-3 ml-auto items-end">
        <button type="button" class="button-gradient rounded-full px-5 py-3" (click)="apply()">Search</button>
        <button type="button" class="button-outlined rounded-full px-5 py-3" (click)="reset()">Clear</button>
      </div>
    </div>
  `,
})
export class PropertiesSearch {
  @Output() filtersChanged = new EventEmitter<PropertyFilters>();

  city = "";
  minPrice: number | null = null;
  maxPrice: number | null = null;
  bedrooms: number | null = null;
  bathrooms: number | null = null;
  propertyType = "";
  cityOptions = [
    { label: "Austin", value: "Austin" },
    { label: "Denver", value: "Denver" },
    { label: "Bend", value: "Bend" },
  ];
  bedOptions = [
    { label: "Any", value: null },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5+", value: 5 },
  ];
  bathOptions = [
    { label: "Any", value: null },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4+", value: 4 },
  ];
  typeOptions = [
    { label: "Any", value: "" },
    { label: "Single Family", value: "Single Family" },
    { label: "Townhouse", value: "Townhouse" },
    { label: "Condo", value: "Condo" },
    { label: "Land", value: "Land" },
  ];

  apply() {
    this.filtersChanged.emit({
      city: this.city?.trim() || undefined,
      minPrice: this.minPrice ?? undefined,
      maxPrice: this.maxPrice ?? undefined,
      bedrooms: this.bedrooms ?? undefined,
      bathrooms: this.bathrooms ?? undefined,
      propertyType: this.propertyType?.trim() || undefined,
    });
  }

  reset() {
    this.city = "";
    this.minPrice = null;
    this.maxPrice = null;
    this.bedrooms = null;
    this.bathrooms = null;
    this.propertyType = "";
    this.apply();
  }
}

