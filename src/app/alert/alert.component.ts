import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-alert',
	imports: [NgbAlertModule,CommonModule],
	templateUrl: './alert.component.html',
	styleUrl: './alert.component.css'
})
export class AlertComponent {
	@Input() message: string | null = null;
	@Input() type: 'success' | 'danger' | 'warning' | 'info' = 'info';

	visible: boolean = true;

	ngOnInit() {
		if (this.message) {
			setTimeout(() => this.visible = false, 3000);
		}
	}
}
