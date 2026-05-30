import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminTypeItemDTO } from '../../../shared/models/DTOs/admin/AdminTypeItemDTO';
import { AdminUpsertTypeDTO } from '../../../shared/models/DTOs/admin/AdminUpsertTypeDTO';
import { LocalizationOption } from '../../../core/services/api/admin/AdminLanguageService';
import { TypeManagerConfig } from '../TypeManagerConfig';

export interface AdminTypeFormDialogData {
    config: TypeManagerConfig;
    hasColors: boolean;
    languages: LocalizationOption[];
    item?: AdminTypeItemDTO;
}

@Component({
    selector: 'app-admin-type-form-dialog',
    templateUrl: './admin-type-form-dialog.component.html',
    styleUrl: './admin-type-form-dialog.component.css'
})
export class AdminTypeFormDialogComponent implements OnInit {

    form: FormGroup;
    isEdit: boolean = false;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AdminTypeFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AdminTypeFormDialogData
    ) {
        this.isEdit = !!data.item;
        this.form = this.fb.group({
            internalName: [data.item?.internalName ?? '', Validators.required],
            hexBGColor: [data.item?.hexBGColor ?? '#3F51B5'],
            hexFontColor: [data.item?.hexFontColor ?? '#FFFFFF'],
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
            const existingValue = this.data.item?.localizations
                .find(l => l.localizationId === lang.localizationId)?.displayValue ?? '';

            this.localizationsArray.push(this.fb.group({
                localizationId: [lang.localizationId],
                localizationCode: [lang.localizationCode],
                displayValue: [existingValue]
            }));
        }
    }

    submit(): void {
        if (this.form.invalid) return;

        const dto: AdminUpsertTypeDTO = {
            id: this.data.item?.id ?? 0,
            internalName: this.form.value.internalName,
            hexBGColor: this.data.hasColors ? this.form.value.hexBGColor : undefined,
            hexFontColor: this.data.hasColors ? this.form.value.hexFontColor : undefined,
            localizations: this.localizationsArray.value
                .filter((l: any) => l.displayValue?.trim())
                .map((l: any) => ({
                    localizationId: l.localizationId,
                    displayValue: l.displayValue.trim()
                }))
        };

        this.dialogRef.close(dto);
    }

    cancel(): void {
        this.dialogRef.close(null);
    }
}
