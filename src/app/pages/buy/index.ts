import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BuyHero } from "./components/hero";
import type { PropertyFilters } from "./components/properties-search";
import { BuyingProcess } from "./components/buying-process";
import { PropertiesList } from "./components/properties-list";
import { fetchProperties, Property } from "./services/properties.service";
import { AppFooterWithCTA } from "@/layout/components/app.footerwithcta";
import { AppFooter } from "@/layout/components/app.footer";

@Component({
  selector: "buy-page",
  standalone: true,
  imports: [CommonModule, BuyHero, PropertiesList, AppFooter, BuyingProcess],
  template: `
    <buy-hero (heroFilters)="onFilters($event)"></buy-hero>
    <div class="container flex flex-col gap-24 lg:gap-40">
      <buying-process></buying-process>
      <properties-list [properties]="filteredProperties"></properties-list>
    </div>
    <app-footer className="mt-24" />
  `,
})
export class BuyPage implements OnInit {
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  loading = false;
  error: string | null = null;

  async ngOnInit() {
    await this.load();
  }

  async load() {
    this.loading = true;
    this.error = null;
    try {
      this.properties = await fetchProperties();
      this.filteredProperties = [...this.properties];
    } catch (err: any) {
      this.error = err?.message ?? "Failed to load properties";
    } finally {
      this.loading = false;
    }
  }

  onFilters(filters: PropertyFilters) {
    this.applyFilters(filters);
  }

  applyFilters(filters: PropertyFilters) {
    const f = filters || {};
    this.filteredProperties = (this.properties || []).filter((p) => {
      if (f.city && p.City && p.City.toLowerCase().indexOf(f.city.toLowerCase()) === -1) return false;
      const price = p["Most Recent List Price"] ?? 0;
      if (f.minPrice != null && price < (f.minPrice || 0)) return false;
      if (f.maxPrice != null && price > (f.maxPrice || 0)) return false;
      if (f.bedrooms != null && (p.Bedrooms ?? 0) < f.bedrooms) return false;
      if (f.bathrooms != null && (p.Bathrooms ?? 0) < f.bathrooms) return false;
      if (f.propertyType && p["Property Type"] && p["Property Type"].toLowerCase().indexOf(f.propertyType.toLowerCase()) === -1) return false;
      return true;
    });
  }
}

