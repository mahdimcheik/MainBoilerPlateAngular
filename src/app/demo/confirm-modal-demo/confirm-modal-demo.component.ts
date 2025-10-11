import { Component, inject, signal } from '@angular/core';
import { ConfirmModalComponent } from '../../generic-components/confirm-modal/confirm-modal.component';
import { ConfirmModalService } from '../../generic-components/confirm-modal/confirm-modal.service';
import { GlobalConfirmModalComponent } from '../../generic-components/confirm-modal/global-confirm-modal.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-confirm-modal-demo',
    imports: [ConfirmModalComponent, GlobalConfirmModalComponent, ButtonModule, ToastModule],
    providers: [MessageService],
    template: `
        <div class="p-6 max-w-4xl mx-auto space-y-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-8">Confirm Modal Demo</h1>

            <!-- Method 1: Direct Component Usage -->
            <div class="bg-white p-6 rounded-lg shadow-sm border">
                <h2 class="text-xl font-semibold mb-4">Method 1: Direct Component Usage</h2>
                <div class="flex flex-wrap gap-3 mb-4">
                    <p-button label="Show Warning Modal" severity="warn" (onClick)="showDirectModal('warning')" />
                    <p-button label="Show Danger Modal" severity="danger" (onClick)="showDirectModal('danger')" />
                    <p-button label="Show Info Modal" severity="info" (onClick)="showDirectModal('info')" />
                    <p-button label="Show Success Modal" severity="success" (onClick)="showDirectModal('success')" />
                </div>

                <app-confirm-modal
                    [visible]="directModalVisible()"
                    [title]="directModalTitle()"
                    [question]="directModalQuestion()"
                    [confirmText]="directModalConfirmText()"
                    [cancelText]="directModalCancelText()"
                    [severity]="directModalSeverity()"
                    (onConfirm)="handleDirectConfirm()"
                    (onCancel)="handleDirectCancel()"
                    (onClose)="handleDirectClose()"
                >
                    <!-- Custom content projection -->
                    <div class="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p class="text-sm text-gray-600">
                            <i class="pi pi-info-circle mr-2"></i>
                            This is additional custom content projected into the modal.
                        </p>
                    </div>
                </app-confirm-modal>
            </div>

            <!-- Method 2: Service-Based Usage -->
            <div class="bg-white p-6 rounded-lg shadow-sm border">
                <h2 class="text-xl font-semibold mb-4">Method 2: Service-Based Usage (Recommended)</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <p-button label="Confirm Delete" severity="danger" (onClick)="confirmDelete()" class="w-full" />
                    <p-button label="Confirm Save" severity="info" (onClick)="confirmSave()" class="w-full" />
                    <p-button label="Confirm Logout" severity="warn" (onClick)="confirmLogout()" class="w-full" />
                    <p-button label="Confirm Submit" severity="success" (onClick)="confirmSubmit()" class="w-full" />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <p-button label="Custom Confirmation" severity="primary" (onClick)="customConfirmation()" class="w-full" />
                    <p-button label="Confirm Only Button" severity="secondary" (onClick)="confirmOnlyModal()" class="w-full" />
                </div>

                <!-- Global modal component -->
                <app-global-confirm-modal />
            </div>

            <!-- Demo Results -->
            <div class="bg-gray-50 p-6 rounded-lg">
                <h3 class="text-lg font-semibold mb-3">Last Action Result:</h3>
                <p class="text-gray-700">{{ lastResult() || 'No action taken yet' }}</p>
            </div>

            <!-- Toast for notifications -->
            <p-toast />
        </div>
    `
})
export class ConfirmModalDemoComponent {
    private confirmService = inject(ConfirmModalService);
    private messageService = inject(MessageService);

    // Direct modal state
    directModalVisible = signal(false);
    directModalTitle = signal('Confirmation');
    directModalQuestion = signal('Are you sure you want to proceed?');
    directModalConfirmText = signal('Confirm');
    directModalCancelText = signal('Cancel');
    directModalSeverity = signal<'info' | 'warning' | 'danger' | 'success'>('warning');

    // Demo state
    lastResult = signal<string>('');

    // Method 1: Direct modal usage
    showDirectModal(severity: 'info' | 'warning' | 'danger' | 'success'): void {
        const configs = {
            warning: {
                title: 'Warning Confirmation',
                question: 'This action might have consequences. Do you want to continue?',
                confirmText: 'Continue',
                cancelText: 'Stop'
            },
            danger: {
                title: 'Dangerous Action',
                question: 'This action is irreversible and might cause data loss. Are you absolutely sure?',
                confirmText: "Yes, I'm Sure",
                cancelText: 'No, Cancel'
            },
            info: {
                title: 'Information',
                question: 'This will update your preferences. Would you like to proceed?',
                confirmText: 'Update',
                cancelText: 'Keep Current'
            },
            success: {
                title: 'Success Action',
                question: 'Everything looks good! Ready to complete this action?',
                confirmText: 'Complete',
                cancelText: 'Wait'
            }
        };

        const config = configs[severity];
        this.directModalTitle.set(config.title);
        this.directModalQuestion.set(config.question);
        this.directModalConfirmText.set(config.confirmText);
        this.directModalCancelText.set(config.cancelText);
        this.directModalSeverity.set(severity);
        this.directModalVisible.set(true);
    }

    handleDirectConfirm(): void {
        this.lastResult.set(`✅ Direct modal confirmed with severity: ${this.directModalSeverity()}`);
        this.showToast('success', 'Confirmed', 'Action confirmed successfully');
    }

    handleDirectCancel(): void {
        this.lastResult.set(`❌ Direct modal cancelled with severity: ${this.directModalSeverity()}`);
        this.showToast('info', 'Cancelled', 'Action was cancelled');
    }

    handleDirectClose(): void {
        this.directModalVisible.set(false);
    }

    // Method 2: Service-based modal usage
    async confirmDelete(): Promise<void> {
        try {
            const result = await this.confirmService.confirmDelete('User Account');
            this.lastResult.set(`🗑️ Delete confirmation: ${result ? 'CONFIRMED' : 'CANCELLED'}`);

            if (result) {
                this.showToast('success', 'Deleted', 'User account deleted successfully');
            } else {
                this.showToast('info', 'Cancelled', 'Delete operation cancelled');
            }
        } catch (error) {
            this.showToast('error', 'Error', 'An error occurred');
        }
    }

    async confirmSave(): Promise<void> {
        const result = await this.confirmService.confirmSave(true);
        this.lastResult.set(`💾 Save confirmation: ${result ? 'SAVED' : 'NOT SAVED'}`);

        if (result) {
            this.showToast('success', 'Saved', 'Changes saved successfully');
        } else {
            this.showToast('info', 'Not Saved', 'Changes were not saved');
        }
    }

    async confirmLogout(): Promise<void> {
        const result = await this.confirmService.confirmLogout();
        this.lastResult.set(`🚪 Logout confirmation: ${result ? 'LOGGED OUT' : 'STAYED'}`);

        if (result) {
            this.showToast('info', 'Logged Out', 'You have been logged out');
        } else {
            this.showToast('info', 'Stayed', 'You remained logged in');
        }
    }

    async confirmSubmit(): Promise<void> {
        const result = await this.confirmService.confirmSubmit('Contact Form');
        this.lastResult.set(`📤 Submit confirmation: ${result ? 'SUBMITTED' : 'NOT SUBMITTED'}`);

        if (result) {
            this.showToast('success', 'Submitted', 'Form submitted successfully');
        } else {
            this.showToast('info', 'Not Submitted', 'Form submission cancelled');
        }
    }

    async customConfirmation(): Promise<void> {
        const result = await this.confirmService.confirm({
            title: 'Custom Confirmation',
            question: 'This is a completely custom confirmation dialog. You can customize the title, question, and button texts.',
            confirmText: 'Do It!',
            cancelText: 'Nope',
            severity: 'info'
        });

        this.lastResult.set(`🔧 Custom confirmation: ${result ? 'ACCEPTED' : 'DECLINED'}`);

        if (result) {
            this.showToast('success', 'Custom Action', 'Custom action completed');
        } else {
            this.showToast('info', 'Declined', 'Custom action declined');
        }
    }

    async confirmOnlyModal(): Promise<void> {
        const result = await this.confirmService.confirm({
            title: 'Information',
            question: "This modal only has a confirm button. It's useful for important notifications.",
            confirmText: 'Got It!',
            confirmButtonOnly: true,
            severity: 'info'
        });

        this.lastResult.set(`ℹ️ Information modal: ACKNOWLEDGED`);
        this.showToast('info', 'Acknowledged', 'Information acknowledged');
    }

    private showToast(severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail: string): void {
        this.messageService.add({
            severity,
            summary,
            detail,
            life: 3000
        });
    }
}
