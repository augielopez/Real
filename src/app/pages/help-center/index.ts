import { Component, computed, inject, ViewChild, ElementRef, Input } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { AppNavbar } from "@/layout/components/app.navbar";
import { CirclePattern } from "@/layout/components/circlepattern";
import { ChatPanelService } from "@/layout/service/chat-panel.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { HttpClientModule } from "@angular/common/http";
import { ChatService } from "@/services/chat.service";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  structured?: any[] | null;
  html?: SafeHtml | null;
};

@Component({
  selector: "help-center",
  standalone: true,
  imports: [
    CommonModule,
    AnimatedContainer,
    CirclePattern,
    AppNavbar,
    FormsModule,
    InputTextModule,
    ButtonModule,
    HttpClientModule,
  ],
  template: ` <animated-container [className]="compact ? 'bg-transparent min-h-screen p-0' : (isWide() ? 'bg-main-gradient min-h-screen' : 'pt-6 bg-main-gradient min-h-screen')">
    <div class="container">
      <div
        [ngClass]="{
          'relative overflow-hidden': true,
          'bg-main-gradient rounded-3xl lg:rounded-4xl shadow-black-card': !isWide()
        }"
      >
        <circle-pattern *ngIf="!compact" className="w-[82rem] absolute -bottom-1/2 translate-y-24 left-1/2 -translate-x-1/2 lg:block hidden" />
        <div class="relative z-20 px-0">
          <app-navbar *ngIf="!compact" />
          <div class="py-0 max-w-[72rem] mx-auto">
            <div>
              <!-- Chat card -->
              <div>
                <div [class]=\"compact ? 'relative flex flex-col h-full' : 'bg-white/4 px-6 py-8 border border-white/8 backdrop-blur-[48px] rounded-2.5xl shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)] flex flex-col h-[40rem]'\">
                  <!-- Compact header (shown when docked in sidebar) -->
                  <div *ngIf=\"compact\" class=\"flex items-center justify-between gap-3 py-3 px-3 border-b border-white/6\">
                    <div class=\"flex items-center gap-3\">
                      <div class=\"w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-md\">
                        <i class=\"pi pi-sparkles text-white !text-lg\"></i>
                      </div>
                      <div class=\"text-white/90 font-semibold\">Miles</div>
                    </div>
                    <button (click)=\"chatPanel.close()\" aria-label=\"Close chat\" class=\"w-9 h-9 rounded-full bg-white/6 flex items-center justify-center text-surface-0 hover:bg-white/10\">
                      <i class=\"pi pi-times\"></i>
                    </button>
                  </div>

                  <!-- Warning box + date -->
                  <div *ngIf=\"compact\" class=\"px-4 pt-3\">
                    <div class=\"rounded-lg border border-white/10 p-3 text-sm text-white/80 mb-3\">
                      Miles may produce inaccurate information about people, places, or facts. We do not assume responsibility for the use of this content.
                    </div>
                    <div class=\"text-center text-xs text-white/50 mb-3\">{{ now | date:'MMMM d, yyyy' }}</div>
                  </div>

                  <div [class]=\"compact ? 'flex-1 overflow-auto mb-4 px-3 pb-24' : 'flex-1 overflow-auto mb-4 px-3'\" #scrollContainer data-scroll=\"help-chat\">
                    <div class=\"flex flex-col gap-4\">
                      <div *ngFor=\"let m of messages\" class=\"max-w-[80%]\" [ngClass]=\"{ 'self-end text-right': m.role === 'user' }\">
                        <ng-container *ngIf=\"m.role === 'assistant'; else userBubble\">
                          <!-- 1) Render assistant text/html first -->
                          <ng-container *ngIf=\"m.html; else plainOrText\">
                            <div [innerHTML]=\"m.html\" class=\"inline-block px-4 py-2 rounded-xl bg-white/6 text-surface-0\"></div>
                          </ng-container>
                          <ng-template #plainOrText>
                            <div class=\"inline-block px-4 py-2 rounded-xl bg-white/6 text-surface-0\" *ngIf=\"m.content\">
                              {{ m.content }}
                            </div>
                          </ng-template>

                          <!-- 2) Then render structured blocks if any -->
                          <div *ngIf=\"m.structured?.length\" class=\"flex flex-col gap-4 mt-4\">
                            <div *ngFor=\"let block of m.structured\">
                              <!-- Properties/cards block -->
                              <div *ngIf=\"block.type === 'properties'\">
                                <div *ngFor=\"let p of block.items\" class=\"bg-white/6 p-4 rounded-xl mb-3\">
                                  <div class=\"flex items-center justify-between mb-2\">
                                    <div class=\"font-semibold text-surface-0\">{{ p.title || p.address }}</div>
                                    <div class=\"text-surface-0 font-semibold\">{{ p.price }}</div>
                                  </div>
                                  <div class=\"text-white/64 text-sm mb-2\">{{ p.address }}</div>
                                  <div class=\"flex gap-4 text-white/64 text-sm mb-2\">
                                    <div *ngIf=\"p.beds\">{{ p.beds }} bd</div>
                                    <div *ngIf=\"p.baths\">{{ p.baths }} ba</div>
                                    <div *ngIf=\"p.sqFt\">{{ p.sqFt }} sqft</div>
                                  </div>
                                  <div class=\"flex flex-wrap gap-2\">
                                    <span *ngFor=\"let f of p.features\" class=\"px-2 py-1 bg-white/8 rounded-full text-xs text-surface-0\">{{ f }}</span>
                                  </div>
                                  <div *ngIf=\"p.marketingHighlights\" class=\"mt-3 text-white/64\">{{ p.marketingHighlights }}</div>
                                </div>
                              </div>

                              <!-- List block -->
                              <div *ngIf=\"block.type === 'list'\">
                                <div *ngIf=\"block.title\" class=\"font-semibold text-surface-0 mb-2\">{{ block.title }}</div>
                                <ul class=\"list-disc pl-4 text-white/64\">
                                  <li *ngFor=\"let it of block.items\">{{ it }}</li>
                                </ul>
                              </div>

                              <!-- Table block -->
                              <div *ngIf=\"block.type === 'table'\">
                                <table class=\"w-full text-white/90 text-sm\">
                                  <thead>
                                    <tr><th *ngFor=\"let h of block.headers\" class=\"text-left\">{{ h }}</th></tr>
                                  </thead>
                                  <tbody>
                                    <tr *ngFor=\"let row of block.rows\">
                                      <td *ngFor=\"let cell of row\" class=\"py-2\">{{ cell }}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>

                          <!-- timestamp -->
                          <div class=\"text-white/50 text-xs mt-1\">{{ m.createdAt | date:'short' }}</div>
                        </ng-container>

                        <ng-template #userBubble>
                          <div class=\"inline-block px-4 py-2 rounded-xl bg-white/8 text-surface-0\">
                            {{ m.content }}
                          </div>
                          <div class=\"text-white/50 text-xs mt-1\">{{ m.createdAt | date:'short' }}</div>
                        </ng-template>
                      </div>
                    </div>
                  </div>
                  <div *ngIf=\"isSending\" class=\"relative z-50 text-white/60 text-sm mb-3 px-3\">Assistant is typing...</div>

                  <!-- Docked input removed from here; moved into AppLayout to remain fixed in the drawer -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </animated-container>`,
})
export class HelpCenter {
  @Input() compact: boolean = false;
  isWide = computed(() => {
    try {
      const layout = (inject as any)(null);
      return false;
    } catch {
      return true;
    }
  });

  chatService = inject(ChatService);
  sanitizer = inject(DomSanitizer);
  chatPanel = inject(ChatPanelService);
  @ViewChild("scrollContainer", { static: false }) scrollContainer?: ElementRef<HTMLDivElement>;

  messages: ChatMessage[] = [
    {
      id: "1",
      role: "assistant",
      content: "Hi — how can I help you today?",
      createdAt: new Date().toISOString(),
    },
  ];

  inputText = "";
  isSending = false;
  sessionId: string | null = null;
  now = new Date();
 
  onMicClick() {
    // placeholder for mic interaction
  }

  onSparklesClick() {
    // placeholder for sparkles action
  }

  async send() {
    if (!this.inputText.trim()) return;
    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: "user",
      content: this.inputText.trim(),
      createdAt: new Date().toISOString(),
    };
    this.messages = [...this.messages, userMsg];
    const text = this.inputText.trim();
    this.inputText = "";
    this.isSending = true;

    // ensure sessionId
    try {
      const stored = localStorage.getItem("help_session");
      if (stored) this.sessionId = stored;
      else {
        this.sessionId = String(Date.now()) + "-" + Math.random().toString(36).slice(2, 8);
        localStorage.setItem("help_session", this.sessionId);
      }
    } catch {}

    // prepare history
    const history = this.messages.map((m) => ({ role: m.role, content: m.content }));

    try {
      const replyRaw = await this.chatService.sendMessage({
        message: text,
        sessionId: this.sessionId ?? undefined,
        history,
      });

      // Defensive parsing of replyRaw
      let replyText = "I’m having trouble right now—please call (559) 555-1212.";
      let structured: any[] | null = null;
      let html: SafeHtml | null = null;

      if (replyRaw != null) {
        let obj: any = replyRaw;
        if (Array.isArray(replyRaw) && replyRaw.length) {
          obj = replyRaw[0]?.json ?? replyRaw[0];
        }
        if (typeof obj === "string") {
          replyText = obj;
        } else if (typeof obj === "object") {
          replyText = obj?.response ?? obj?.reply ?? obj?.output ?? obj?.message ?? "";
          structured = obj?.structured ?? obj?.properties ?? null;
        }
      }

      // Try to parse properties from reply text first
      // if (!structured) {
      //   const parsed = this.parsePropertiesResponse(replyText || "");
      //   if (parsed && parsed.length) {
      //     structured = [{ type: "properties", items: parsed }];
      //     // Extract intro text (everything before first property block)
      //     const introMatch = (replyText || "").match(/^([\s\S]*?)(?=Property\s+(Overview|1|2|3|4|5|6|7|8|9))/i);
      //     if (introMatch && introMatch[1].trim()) {
      //       replyText = introMatch[1].trim();
      //     } else {
      //       // no intro found; clear content to avoid showing full raw text
      //       replyText = "";
      //     }
      //   }
      // }

      // Convert replyText to HTML (handles \n and basic markdown)
      if (replyText && replyText.trim()) {
        const rendered = this.formatMarkdownToHtml(replyText);
        html = this.sanitizer.bypassSecurityTrustHtml(rendered);
      }

      const assistantMsg: ChatMessage = {
        id: String(Date.now() + 1),
        role: "assistant",
        content: replyText || "I’m having trouble right now—please call (559) 555-1212.",
        createdAt: new Date().toISOString(),
        structured,
        html,
      };
      this.messages = [...this.messages, assistantMsg];
      // scroll to bottom using ViewChild
      setTimeout(() => {
        try {
          if (this.scrollContainer?.nativeElement) {
            const el = this.scrollContainer.nativeElement;
            el.scrollTop = el.scrollHeight;
          } else {
            const c = document.querySelector('[data-scroll="help-chat"]') as HTMLElement | null;
            if (c) c.scrollTop = c.scrollHeight;
          }
        } catch {}
      }, 50);
    } catch (err) {
      this.messages = [
        ...this.messages,
        {
          id: String(Date.now() + 2),
          role: "assistant",
          content: "I’m having trouble right now—please call (559) 555-1212.",
          createdAt: new Date().toISOString(),
        },
      ];
    } finally {
      this.isSending = false;
    }
  }

  // Called from parent (AppLayout) when input is submitted outside this component
  async handleExternalSend(text: string) {
    if (!text || !text.trim()) return;
    this.inputText = text;
    await this.send();
  }

  // Very small, safe markdown -> HTML converter for common patterns used by responses.
  formatMarkdownToHtml(md: string) {
    if (!md) return "";
    let out = md;
    // convert escaped newline sequences to real newlines
    out = out.replace(/\\n/g, "\n");
    // ensure headers and rules start on their own line
    out = out.replace(/ ?### ?/g, "\n### ");
    out = out.replace(/ ?--- ?/g, "\n---\n");
    // if many inline bullets exist like " - item - item", turn them into lines
    const inlineBulletCount = (out.match(/ - [A-Za-z0-9]/g) || []).length;
    if (inlineBulletCount > 1) {
      out = out.replace(/ - /g, "\n- ");
    }
    // escape HTML entities
    out = out.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // horizontal rules
    out = out.replace(/(^|\n)---(\n|$)/g, "<hr/>");
    // headings ### -> h3
    out = out.replace(/(^|\n)###\s*(.+)/g, "$1<h3 class=\"text-lg font-semibold text-surface-0\">$2</h3>");
    // bold **text**
    out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    // bullets - item
    // collect consecutive lines starting with - into a list
    out = out.replace(/(^|\n)(- .+(?:\n- .+)*)/g, (m: string, p1: string, p2: string) => {
      const items = p2
        .trim()
        .split(/\n/)
        .map((l: string) => l.replace(/^- /, ""));
      return p1 + "<ul class=\"list-disc pl-5 text-white/64\">" + items.map((it: string) => `<li>${it}</li>`).join("") + "</ul>";
    });
    // convert remaining newlines to <br/>
    out = out.replace(/\n/g, "<br/>");
    return out;
  }

  // Parse property-list style responses into structured property objects.
  parsePropertiesResponse(raw: string) {
    if (!raw) return [];
    // unescape literal \n sequences and normalize newlines
    let text = raw.replace(/\\n/g, "\n").replace(/\r\n/g, "\n");

    // Split blocks where "Property <n>:" appears or by two+ newlines
    const blocks = text
      .split(/\n{2,}(?=\s*Property\s*\d+:)/)
      .map((b: string) => b.trim())
      .filter(Boolean);

    const props = blocks.map((block: string) => {
      const titleMatch = block.match(/Property\s*\d+\s*:\s*(.+)/i);
      const title = titleMatch ? titleMatch[1].trim() : null;

      const extract = (label: string) => {
        const re = new RegExp(label + "\\s*:\\s*(.+)", "i");
        const m = block.match(re);
        return m ? m[1].trim() : null;
      };

      const address = extract("Address");
      const price = extract("Price");
      const bedsBaths = extract("Beds / Baths") || extract("Beds/Baths") || extract("Beds");
      let beds: string | null = null,
        baths: string | null = null;
      if (bedsBaths) {
        const bb = bedsBaths.split("/").map((s: string) => s.trim());
        beds = bb[0] ?? null;
        baths = bb[1] ?? null;
      }
      const sqFt = extract("Sq Ft") || extract("SqFt") || extract("Sq Ft");
      const lotSize = extract("Lot Size");
      const yearBuilt = extract("Year Built") || extract("YearBuilt");
      const status = extract("Status");

      // Key Features section: everything after "Key Features:"
      const features: string[] = [];
      const featMatch = block.match(/Key Features:\s*([\s\S]*)$/i);
      if (featMatch) {
        const lines = featMatch[1]
          .split(/\n/)
          .map((l: string) => l.replace(/^[\-\*\s\u2022]+/, "").trim())
          .filter(Boolean);
        lines.forEach((l: string) => {
          if (l) features.push(l);
        });
      }

      return {
        title,
        address,
        price,
        beds,
        baths,
        sqFt,
        lotSize,
        yearBuilt,
        status,
        features,
      };
    });

    return props;
  }
}

