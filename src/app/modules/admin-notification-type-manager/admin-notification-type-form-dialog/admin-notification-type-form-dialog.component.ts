import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalizationOption } from '../../../core/services/api/admin/AdminLanguageService';
import { NotificationTypeItem } from '../admin-notification-type-manager.component';

export interface NotificationTypeFormDialogData {
    languages: LocalizationOption[];
    item?: NotificationTypeItem;
}

@Component({
    selector: 'app-admin-notification-type-form-dialog',
    templateUrl: './admin-notification-type-form-dialog.component.html',
    styleUrl: './admin-notification-type-form-dialog.component.css'
})
export class AdminNotificationTypeFormDialogComponent implements OnInit {

    form: FormGroup;
    isEdit: boolean;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AdminNotificationTypeFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: NotificationTypeFormDialogData
    ) {
        this.isEdit = !!data.item;
        this.form = this.fb.group({
            notificationTypeCode: [data.item?.notificationTypeCode ?? '', Validators.required],
            localizations: this.fb.array([])
        });
    }

    ngOnInit(): void {
        this.buildLocalizationRows();
    }

    get localizationsArray(): FormArray {
        return this.form.get('localizations') as FormArray;
    }

    private buildLocalizationRows(): void {
        this.localizationsArray.clear();
        for (const lang of this.data.languages) {
            const existing = this.data.item?.localizations.find(l => l.localizationId === lang.localizationId);
            this.localizationsArray.push(this.fb.group({
                localizationId: [lang.localizationId],
                localizationCode: [lang.localizationCode],
                displayValue: [existing?.displayValue ?? ''],
                messageTemplate: [existing?.messageTemplate ?? '']
            }));
        }
    }

    submit(): void {
        if (this.form.invalid) return;
        this.dialogRef.close({
            id: this.data.item?.id ?? 0,
            notificationTypeCode: this.form.value.notificationTypeCode,
            localizations: this.localizationsArray.value
                .filter((l: any) => l.displayValue?.trim() || l.messageTemplate?.trim())
                .map((l: any) => ({
                    localizationId: l.localizationId,
                    displayValue: l.displayValue?.trim() ?? '',
                    messageTemplate: l.messageTemplate?.trim() ?? ''
                }))
        });
    }

    cancel(): void {
        this.dialogRef.close(null);
    }
}
