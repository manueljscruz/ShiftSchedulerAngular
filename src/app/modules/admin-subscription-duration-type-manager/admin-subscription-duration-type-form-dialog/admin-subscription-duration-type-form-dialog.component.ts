import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalizationOption } from '../../../core/services/api/admin/AdminLanguageService';
import { SubscriptionDurationTypeItem } from '../admin-subscription-duration-type-manager.component';

export interface SubscriptionDurationTypeFormDialogData {
    languages: LocalizationOption[];
    item?: SubscriptionDurationTypeItem;
}

@Component({
    selector: 'app-admin-subscription-duration-type-form-dialog',
    templateUrl: './admin-subscription-duration-type-form-dialog.component.html',
    styleUrl: './admin-subscription-duration-type-form-dialog.component.css'
})
export class AdminSubscriptionDurationTypeFormDialogComponent implements OnInit {

    form: FormGroup;
    isEdit: boolean;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AdminSubscriptionDurationTypeFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SubscriptionDurationTypeFormDialogData
    ) {
        this.isEdit = !!data.item;
        this.form = this.fb.group({
            name: [data.item?.name ?? '', Validators.required],
            durationInDays: [data.item?.durationInDays ?? 30, [Validators.required, Validators.min(1)]],
            appliesPromo: [data.item?.appliesPromo ?? false],
            promoPercentage: [data.item?.promoPercentage ?? 0, [Validators.min(0), Validators.max(100)]],
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
                displayValue: [existing?.displayValue ?? '']
            }));
        }
    }

    submit(): void {
        if (this.form.invalid) return;
        const v = this.form.value;
        this.dialogRef.close({
            id: this.data.item?.id ?? 0,
            name: v.name,
            durationInDays: v.durationInDays,
            appliesPromo: v.appliesPromo,
            promoPercentage: v.promoPercentage,
            localizations: this.localizationsArray.value
                .filter((l: any) => l.displayValue?.trim())
                .map((l: any) => ({
                    localizationId: l.localizationId,
                    displayValue: l.displayValue?.trim() ?? ''
                }))
        });
    }

    cancel(): void {
        this.dialogRef.close(null);
    }
}
