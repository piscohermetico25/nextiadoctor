import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() icon: string = '';
  
  // Action configuration
  @Input() actionType: 'back' | 'button' = 'back';
  @Input() actionText: string = 'Volver';
  @Input() actionRoute: string = '';
  @Input() actionIcon: string = 'bi-arrow-left';
  @Input() showAction: boolean = true;
  
  // Colors
  @Input() primaryColor: string = '#28a745';
  @Input() secondaryColor: string = '#1e7e34';
  
  // Legacy support (deprecated)
  @Input() backRoute: string = '';
  @Input() backText: string = 'Volver';
  @Input() showBackButton: boolean = true;
  
  // Computed properties for backward compatibility
  get computedActionRoute(): string {
    return this.actionRoute || this.backRoute;
  }
  
  get computedActionText(): string {
    return this.actionText !== 'Volver' ? this.actionText : this.backText;
  }
  
  get computedShowAction(): boolean {
    return this.showAction && (this.showBackButton !== false);
  }
}