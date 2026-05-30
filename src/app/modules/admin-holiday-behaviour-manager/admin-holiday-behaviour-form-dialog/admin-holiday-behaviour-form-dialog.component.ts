import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalizationOption } from '../../../core/services/api/admin/AdminLanguageService';
import { HolidayBehaviourItem } from '../admin-holiday-behaviour-manager.component';

export interface HolidayBehaviourFormDialogData {
    languages: LocalizationOption[];
    item?: HolidayBehaviourItem;
}

@Component({
    selector: 'app-admin-holiday-behaviour-form-dialog',
    templateUrl: './admin-holiday-behaviour-form-dialog.component.html',
    styleUrl: './admin-holiday-behaviour-form-dialog.component.css'
})
export class AdminHolidayBehaviourFormDialogComponent implements OnInit {

    form: FormGroup;
    isEdit: boolean;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AdminHolidayBehaviourFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: HolidayBehaviourFormDialogData
    ) {
        this.isEdit = !!data.item;
        this.form = this.fb.group({
            internalName: [data.item?.internalName ?? '', Validators.required],
            allowsOperatingTimes: [data.item?.allowsOperatingTimes ?? true],
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
        this.dialogRef.close({
            id: this.data.item?.id ?? 0,
            internalName: this.form.value.internalName,
            allowsOperatingTimes: this.form.value.allowsOperatingTimes,
            localizations: this.localizationsArray.value
                .filter((l: any) => l.displayValue?.trim())
                .map((l: any) => ({ localizationId: l.localizationId, displayValue: l.displayValue.trim() }))
        });
    }

    cancel(): void {
        this.dialogRef.close(null);
    }
}
