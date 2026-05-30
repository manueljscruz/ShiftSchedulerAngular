import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalizationOption } from '../../../core/services/api/admin/AdminLanguageService';
import { HolidayCatalogItem, SimpleDropdownOption } from '../admin-holiday-catalog-manager.component';

export interface HolidayCatalogFormDialogData {
    languages: LocalizationOption[];
    holidayTypes: SimpleDropdownOption[];
    holidayBehaviours: SimpleDropdownOption[];
    item?: HolidayCatalogItem;
}

@Component({
    selector: 'app-admin-holiday-catalog-form-dialog',
    templateUrl: './admin-holiday-catalog-form-dialog.component.html',
    styleUrl: './admin-holiday-catalog-form-dialog.component.css'
})
export class AdminHolidayCatalogFormDialogComponent implements OnInit {

    form: FormGroup;
    isEdit: boolean;

    readonly days = Array.from({ length: 31 }, (_, i) => i + 1);
    readonly months = [
        { value: 1, label: 'January' }, { value: 2, label: 'February' },
        { value: 3, label: 'March' },   { value: 4, label: 'April' },
        { value: 5, label: 'May' },     { value: 6, label: 'June' },
        { value: 7, label: 'July' },    { value: 8, label: 'August' },
        { value: 9, label: 'September' },{ value: 10, label: 'October' },
        { value: 11, label: 'November' },{ value: 12, label: 'December' }
    ];

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AdminHolidayCatalogFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: HolidayCatalogFormDialogData
    ) {
        this.isEdit = !!data.item;
        this.form = this.fb.group({
            holidayName: [data.item?.holidayName ?? '', Validators.required],
            holidayDescription: [data.item?.holidayDescription ?? ''],
            holidayTypeId: [data.item?.holidayTypeId ?? null, Validators.required],
            holidayBehaviourId: [data.item?.holidayBehaviourId ?? null, Validators.required],
            recurrenceDay: [data.item?.recurrenceDay ?? 1, [Validators.required, Validators.min(1), Validators.max(31)]],
            recurrenceMonth: [data.item?.recurrenceMonth ?? 1, [Validators.required, Validators.min(1), Validators.max(12)]],
            isRecurring: [data.item?.isRecurring ?? true],
            isActive: [data.item?.isActive ?? true],
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
                localizedName: [existing?.localizedName ?? ''],
                localizedDescription: [existing?.localizedDescription ?? '']
            }));
        }
    }

    submit(): void {
        if (this.form.invalid) return;
        const v = this.form.value;
        this.dialogRef.close({
            id: this.data.item?.id ?? 0,
            holidayName: v.holidayName,
            holidayDescription: v.holidayDescription,
            holidayTypeId: v.holidayTypeId,
            holidayBehaviourId: v.holidayBehaviourId,
            recurrenceDay: v.recurrenceDay,
            recurrenceMonth: v.recurrenceMonth,
            isRecurring: v.isRecurring,
            isActive: v.isActive,
            localizations: this.localizationsArray.value
                .filter((l: any) => l.localizedName?.trim() || l.localizedDescription?.trim())
                .map((l: any) => ({
                    localizationId: l.localizationId,
                    localizedName: l.localizedName?.trim() ?? '',
                    localizedDescription: l.localizedDescription?.trim() ?? ''
                }))
        });
    }

    cancel(): void {
        this.dialogRef.close(null);
    }
}
