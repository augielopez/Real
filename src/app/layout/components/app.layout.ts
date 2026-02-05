import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AppConfigurator } from "./app.configurator";
import { ChatSidebar } from "@/layout/components/chat-sidebar";
import { ChatPanelService } from "@/layout/service/chat-panel.service";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [CommonModule, RouterModule, AppConfigurator, ChatSidebar],
  template: `<div class="min-h-screen flex flex-col">
    <app-configurator />

    <div class="flex-1 relative">
      <!-- Main site content; on large screens the main area will be pushed when chat opens -->
      <main
        class="transition-all duration-300"
        [ngClass]="{ 'lg:mr-[500px]': chatPanel.isOpen && !chatPanel.isExpanded, 'lg:mr-[750px]': chatPanel.isOpen && chatPanel.isExpanded }"
      >
        <router-outlet></router-outlet>
      </main>

      <!-- Chat panel: on small screens it slides in as overlay; on lg+ screens it appears as a right column that visually pushes content -->
      <aside
        class="fixed right-0 top-0 h-full z-[100000] bg-surface-950 shadow-2xl transition-transform duration-300 w-full"
        [ngClass]="{ 'translate-x-0': chatPanel.isOpen, 'translate-x-full': !chatPanel.isOpen, 'lg:w-[500px]': !chatPanel.isExpanded, 'lg:w-[750px]': chatPanel.isExpanded }"
        (click)="$event.stopPropagation()"
        [attr.aria-hidden]="!chatPanel.isOpen"
      >
        <div class="h-full">
          <chat-sidebar />
        </div>
      </aside>
    </div>
  </div> `,
})
export class AppLayout {
  constructor(public chatPanel: ChatPanelService) {}
}
