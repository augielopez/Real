import { Component } from "@angular/core";
import { TravelHero } from "./components/hero";
import { TravelDestinationGallery } from "./components/destination/gallery";
import { TravelEscapeGallery } from "./components/escapegallery";
import { TravelDestinationGrid } from "./components/destination/grid";
import { TravelDestinationPlan } from "./components/destination/plan";
import { TravelGuides } from "./components/guides";
import { TravelCTA } from "./components/cta";
import { TravelFooter } from "./components/footer";

@Component({
  selector: "travel",
  standalone: true,
  imports: [
    TravelHero,
    TravelDestinationGallery,
    TravelEscapeGallery,
    TravelDestinationGrid,
    TravelDestinationPlan,
    TravelGuides,
    TravelCTA,
    TravelFooter,
  ],
  template: `
    <travel-hero />
    <travel-destination-gallery />
    <travel-escape-gallery />
    <travel-destination-grid />
    <travel-destination-plan />
    <travel-guides />
    <travel-cta />
    <travel-footer />
  `,
})
export class Travel {}
