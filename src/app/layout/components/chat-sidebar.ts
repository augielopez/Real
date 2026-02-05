import { Component, inject, ViewChild, ElementRef, Output, EventEmitter, Input, AfterViewInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { HttpClientModule } from "@angular/common/http";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ChatService } from "@/services/chat.service";
import { ChatPanelService } from "@/layout/service/chat-panel.service";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  structured?: any[] | null;
  html?: SafeHtml | null;
};

@Component({
  selector: "chat-sidebar",
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, HttpClientModule],
  template: `
    <div class="h-full flex flex-col">
      <!-- removed external SVG tab; toggle moved to the avatar icon -->
      <div class="px-4 py-3 border-b border-white/6 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button (click)="emitExpand()" aria-label="Toggle sidebar width" class="w-9 h-9 rounded-full flex items-center justify-center shadow-md bg-transparent">
            <i class="pi !text-lg text-sky-400" [ngClass]="chatPanel.isExpanded ? 'pi-angle-double-right' : 'pi-angle-double-left'"></i>
          </button>
        </div>
        <button (click)="close()" aria-label="Close chat" class="w-9 h-9 rounded-full bg-white/6 flex items-center justify-center text-surface-0 hover:bg-white/10">
          <i class="pi pi-times"></i>
        </button>
      </div>

      <div class="px-4 pt-3">
        <div class="mb-3">
          <video
            class="w-20 h-20 rounded-md mb-3 object-cover"
            autoplay
            muted
            playsinline
            loop
            src="/video/NeoLeoThinking-CgS-BBDc.mp4"
          ></video>
          <div class="text-lg font-semibold text-surface-0">Hello, I am Miles.</div>
        </div>
        <div class="text-center text-xs text-white/50 mb-3">{{ now | date:'MMMM d, yyyy' }}</div>
      </div>

      <div #scrollContainer class="chat-scroll flex-1 overflow-auto px-4 pb-24 relative z-10">
        <div class="flex flex-col gap-4">
          <div *ngFor="let m of messages" [ngClass]="{ 'self-end text-right': m.role === 'user' }" class="max-w-[80%]">
            <ng-container *ngIf="m.role === 'assistant'; else userBubble">
              <ng-container *ngIf="m.html; else plainText">
                <div [innerHTML]="m.html" class="inline-block px-4 py-2 rounded-xl bg-white/6 text-surface-0"></div>
              </ng-container>
              <ng-template #plainText>
                <div class="inline-block px-4 py-2 rounded-xl bg-white/6 text-surface-0" *ngIf="m.content">
                  {{ m.content }}
                </div>
              </ng-template>
              <div *ngIf="m.structured?.length" class="flex flex-col gap-3 mt-3">
                <div *ngFor="let block of m.structured">
                  <div *ngIf="block.type === 'properties'">
                    <div *ngFor="let p of block.items" class="bg-white/6 p-3 rounded-xl mb-2 text-sm">
                      <div class="font-semibold text-surface-0">{{ p.title || p.address }}</div>
                      <div class="text-white/64">{{ p.address }}</div>
                    </div>
                  </div>
                  <div *ngIf="block.type === 'list'">
                    <ul class="list-disc pl-4 text-white/64">
                      <li *ngFor="let it of block.items">{{ it }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="text-white/50 text-xs mt-1">{{ m.createdAt | date:'short' }}</div>
            </ng-container>
            <ng-template #userBubble>
              <div class="inline-block px-4 py-2 rounded-xl bg-white/8 text-surface-0">
                {{ m.content }}
              </div>
              <div class="text-white/50 text-xs mt-1">{{ m.createdAt | date:'short' }}</div>
            </ng-template>
          </div>
        </div>
      </div>

      <!-- typing indicator (appears above the docked input) -->
      <div *ngIf="isSending" class="absolute bottom-28 left-4 right-4 z-[100003]" role="status" aria-live="polite">
        <div class="mx-auto max-w-[28rem] flex items-center gap-3 text-white/90 text-sm rounded-md px-3 py-2 bg-surface-900 shadow-md">
          <!-- spinner -->
          <!-- <svg class="w-5 h-5 text-white animate-spin" viewBox="0 0 50 50" aria-hidden="true">
            <circle cx="25" cy="25" r="20" stroke="currentColor" stroke-opacity="0.15" stroke-width="5" fill="none"></circle>
            <path d="M45 25a20 20 0 0 1-20 20" stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none"></path>
          </svg> -->

          <div class="flex-1">
            <div class="font-medium">Miles is typing...</div>

            <!-- small progress pulse -->
            <div class="mt-1 w-28 h-1 bg-white/10 rounded overflow-hidden">
              <div class="h-full bg-white/60 animate-typing-progress" style="width:30%"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute left-4 right-4 bottom-4 z-[100001] bg-surface-900 p-3 rounded-xl shadow-md">
        <!-- Quick suggestions popover -->
        <div *ngIf="showSuggestions" class="absolute bottom-full mb-4 left-0 right-0 mx-auto w-full max-w-[28rem] z-[100002]">
          <div class="rounded-2xl bg-surface-900 p-3 border border-white/8 shadow-md">
            <div class="flex items-center justify-center">
              <div class="px-3 py-1 rounded-full bg-surface-900 text-xs text-surface-0 font-semibold">MILES'S SUGGESTIONS</div>
            </div>
            <div class="mt-3 flex flex-col gap-3 text-white">
              <button *ngFor="let s of suggestions" type="button" (click)="applySuggestion(s)" class="text-left w-full px-3 py-2 rounded-lg bg-white/4 hover:bg-white/6 text-white flex items-center">
                <i class="pi pi-sparkles mr-2 text-white"></i>
                <span class="flex-1 text-white">{{ s }}</span>
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3 relative" role="search" aria-label="Chat input">
          <form (ngSubmit)="send()" class="flex items-center gap-3 flex-1" aria-label="Chat input form">
            <div class="relative flex-1">
              <textarea
                #chatInputRef
                rows="1"
                [(ngModel)]="inputText"
                name="inputText"
                placeholder="Ask Miles (Enter to send, Shift+Enter for newline)"
                class="bg-white/6 rounded-xl py-3 pl-4 pr-12 text-white/90 placeholder:text-white/60 w-full border-none resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-sky-400/50"
                aria-label="Chat message"
                autocomplete="off"
                (input)="autoResize($event)"
                (keydown)="handleKeydown($event)"
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-12 h-12 rounded-full bg-white/6 flex items-center justify-center text-surface-0 hover:bg-white/10 transition-colors"
              aria-label="Send message"
            >
              <i class="pi pi-arrow-right"></i>
            </button>
          </form>

          <!-- suggestions button moved outside the form to avoid being part of form controls -->
          <button
            id="suggestions-button"
            type="button"
            (click)="toggleSuggestions()"
            aria-label="Quick suggestions"
            [attr.aria-expanded]="showSuggestions"
            aria-controls="suggestions-popover"
            class="w-10 h-10 rounded-full bg-white/6 flex items-center justify-center text-sky-400 hover:bg-white/10 transition-colors"
          >
            <i class="pi pi-sparkles"></i>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ChatSidebar implements AfterViewInit {
  // expansion now handled via ChatPanelService
  chatService = inject(ChatService);
  chatPanel = inject(ChatPanelService);
  sanitizer = inject(DomSanitizer);
  @ViewChild("scrollContainer", { static: false }) scrollContainer?: ElementRef<HTMLDivElement>;
  @ViewChild("chatInputRef", { static: false }) chatInputEl?: ElementRef<HTMLTextAreaElement>;

  messages: ChatMessage[] = [
    {
      id: "1",
      role: "assistant",
      content: "How can I help you today?",
      createdAt: new Date().toISOString(),
    },
  ];

  inputText = "";
  isSending = false;
  sessionId: string | null = null;
  now = new Date();

  close() {
    this.chatPanel.close();
  }

  emitExpand() {
    try {
      this.chatPanel.toggleExpanded();
    } catch {}
  }

  ngAfterViewInit(): void {
    try {
      if (this.chatInputEl?.nativeElement) {
        this.chatInputEl.nativeElement.focus();
      }
    } catch {}
  }

  // #region agent log
  sendDebug(hypothesisId: string, location: string, message: string, data: any = {}) {
    try {
      fetch("http://127.0.0.1:7243/ingest/f2aff8f0-78f4-4a4f-a7f4-47ee6e818e8f", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: "debug-session",
          runId: "run1",
          hypothesisId,
          location,
          message,
          data,
          timestamp: Date.now(),
        }),
      }).catch(() => {});
    } catch {}
  }
  // #endregion

  focusInput(e: Event) {
    try {
      const t = e.target as HTMLElement;
      // If clicked directly on input or on a button, don't override default focus
      this.sendDebug("A", "chat-sidebar:focusInput", "focusInput called", { targetTag: t?.tagName });
      if (!t) return;
      if (t.tagName === "INPUT" || t.closest("button")) return;
      if (this.chatInputEl?.nativeElement) {
        this.chatInputEl.nativeElement.focus();
        this.sendDebug("A", "chat-sidebar:focusInput", "focused input via ViewChild", { active: document.activeElement?.tagName });
      }
    } catch {}
  }

  showSuggestions = false;
  suggestions = [
    "What are the basic steps to buying a house from start to finish?",
    "What does pre-approval mean, and why do I need it before looking at homes?",
    "What is the difference between FHA, VA, and conventional loans?",
    "What costs are involved when buying a home besides the purchase price?",
    "How do I find the right real estate agent?",
    "What should I look for when touring a home for the first time?",
    "How do I list a property?",
  ];

  toggleSuggestions() {
    this.showSuggestions = !this.showSuggestions;
  }

  autoResize(e: Event) {
    try {
      const ta = e.target as HTMLTextAreaElement;
      if (!ta) return;
      ta.style.height = "auto";
      const newHeight = Math.min(600, ta.scrollHeight); // cap to prevent huge growth
      ta.style.height = newHeight + "px";
    } catch {}
  }

  handleKeydown(e: KeyboardEvent) {
    try {
      // Enter to send, Shift+Enter for newline
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.send();
      }
    } catch {}
  }

  applySuggestion(s: string) {
    this.inputText = s;
    // focus input after applying
    try {
      this.sendDebug("E", "chat-sidebar:applySuggestion", "applying suggestion", { suggestion: s });
      if (this.chatInputEl?.nativeElement) this.chatInputEl.nativeElement.focus();
      this.sendDebug("E", "chat-sidebar:applySuggestion", "focused input after suggestion", { active: document.activeElement?.tagName });
    } catch {}
    this.showSuggestions = false;
  }

  async send() {
    if (!this.inputText.trim()) return;
    this.sendDebug("D", "chat-sidebar:send", "send invoked", { inputLen: this.inputText.length });
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

    try {
      const stored = localStorage.getItem("chat_sidebar_session");
      if (stored) this.sessionId = stored;
      else {
        this.sessionId = String(Date.now()) + "-" + Math.random().toString(36).slice(2, 8);
        localStorage.setItem("chat_sidebar_session", this.sessionId);
      }
    } catch {}

    const history = this.messages.map((m) => ({ role: m.role, content: m.content }));

    try {
      const replyRaw = await this.chatService.sendMessage({
        message: text,
        sessionId: this.sessionId ?? undefined,
        history,
      });
      this.sendDebug("D", "chat-sidebar:send", "received replyRaw", { replyRaw: typeof replyRaw });

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

  formatMarkdownToHtml(md: string) {
    if (!md) return "";
    let out = md;
    out = out.replace(/\\n/g, "\n");
    out = out.replace(/ ?### ?/g, "\n### ");
    out = out.replace(/ ?--- ?/g, "\n---\n");
    const inlineBulletCount = (out.match(/ - [A-Za-z0-9]/g) || []).length;
    if (inlineBulletCount > 1) {
      out = out.replace(/ - /g, "\n- ");
    }
    out = out.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    out = out.replace(/(^|\n)---(\n|$)/g, "<hr/>");
    out = out.replace(/(^|\n)###\s*(.+)/g, "$1<h3 class=\"text-lg font-semibold text-surface-0\">$2</h3>");
    out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    out = out.replace(/(^|\n)(- .+(?:\n- .+)*)/g, (m: string, p1: string, p2: string) => {
      const items = p2.trim().split(/\n/).map((l: string) => l.replace(/^- /, ""));
      return p1 + "<ul class=\"list-disc pl-5 text-white/64\">" + items.map((it: string) => `<li>${it}</li>`).join("") + "</ul>";
    });
    out = out.replace(/\n/g, "<br/>");
    return out;
  }
}

/* Component styles (inlined for simplicity): add to global CSS if preferred */
/* Typing progress animation */
const style = document.createElement('style');
style.textContent = `
@keyframes typingProgress {
  0% { transform: translateX(-0%); width: 20%; }
  50% { transform: translateX(25%); width: 60%; }
  100% { transform: translateX(0%); width: 20%; }
}
.animate-typing-progress {
  animation: typingProgress 1.2s ease-in-out infinite;
}
`;
document.head.appendChild(style);

