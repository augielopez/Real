import { Component } from "@angular/core";
import { ContactHero } from "./components/hero";
import { ContactAddress } from "./components/address";
import { AppFAQ } from "@/layout/components/app.faq";
import { AppFooter } from "@/layout/components/app.footer";

@Component({
  selector: "contact",
  standalone: true,
  imports: [ContactHero, ContactAddress, AppFAQ, AppFooter],
  template: ` <contact-hero />
    <contact-address />
    <app-faq className="mt-64" />
    <app-footer className="mt-64" />`,
})
export class Contact {}
