import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalizationOption } from '../../../core/services/api/admin/AdminLanguageService';
import { PaymentMethodTypeItem } from '../admin-payment-method-type-manager.component';

export interface PaymentMethodTypeFormDialogData {
    languages: LocalizationOption[];
    item?: PaymentMethodTypeItem;
}

@Component({
    selector: 'app-admin-payment-method-type-form-dialog',
    templateUrl: './admin-payment-method-type-form-dialog.component.html',
    styleUrl: './admin-payment-method-type-form-dialog.component.css'
})
export class AdminPaymentMethodTypeFormDialogComponent implements OnInit {

    form: FormGroup;
    isEdit: boolean;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AdminPaymentMethodTypeFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: PaymentMethodTypeFormDialogData
    ) {
        this.isEdit = !!data.item;
        this.form = this.fb.group({
            name: [data.item?.name ?? '', Validators.required],
            isActive: [data.item?.isActive ?? true],
            countryCodesText: [(data.item?.countryCodes ?? []).join(', ')],
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
        const countryCodes: string[] = (v.countryCodesText ?? '')
            .split(',')
            .map((c: string) => c.trim().toUpperCase())
            .filter((c: string) => c.length === 2);

        this.dialogRef.close({
            id: this.data.item?.id ?? 0,
            name: v.name,
            isActive: v.isActive,
            countryCodes,
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
