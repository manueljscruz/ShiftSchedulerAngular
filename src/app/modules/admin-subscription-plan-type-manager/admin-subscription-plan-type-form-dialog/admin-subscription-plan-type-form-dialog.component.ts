import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalizationOption } from '../../../core/services/api/admin/AdminLanguageService';
import { SubscriptionPlanTypeItem } from '../admin-subscription-plan-type-manager.component';

export interface SubscriptionPlanTypeFormDialogData {
    languages: LocalizationOption[];
    item?: SubscriptionPlanTypeItem;
}

@Component({
    selector: 'app-admin-subscription-plan-type-form-dialog',
    templateUrl: './admin-subscription-plan-type-form-dialog.component.html',
    styleUrl: './admin-subscription-plan-type-form-dialog.component.css'
})
export class AdminSubscriptionPlanTypeFormDialogComponent implements OnInit {

    form: FormGroup;
    isEdit: boolean;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AdminSubscriptionPlanTypeFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SubscriptionPlanTypeFormDialogData
    ) {
        this.isEdit = !!data.item;
        this.form = this.fb.group({
            name: [data.item?.name ?? '', Validators.required],
            description: [data.item?.description ?? ''],
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
                nameDisplayValue: [existing?.nameDisplayValue ?? ''],
                descriptionDisplayValue: [existing?.descriptionDisplayValue ?? '']
            }));
        }
    }

    submit(): void {
        if (this.form.invalid) return;
        const v = this.form.value;
        this.dialogRef.close({
            id: this.data.item?.id ?? 0,
            name: v.name,
            description: v.description,
            localizations: this.localizationsArray.value
                .filter((l: any) => l.nameDisplayValue?.trim() || l.descriptionDisplayValue?.trim())
                .map((l: any) => ({
                    localizationId: l.localizationId,
                    nameDisplayValue: l.nameDisplayValue?.trim() ?? '',
                    descriptionDisplayValue: l.descriptionDisplayValue?.trim() ?? ''
                }))
        });
    }

    cancel(): void {
        this.dialogRef.close(null);
    }
}
