import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalizationOption } from '../../../core/services/api/admin/AdminLanguageService';
import { RuleTypeItem, BusinessAspectOption } from '../admin-rule-type-manager.component';

export interface RuleTypeFormDialogData {
    languages: LocalizationOption[];
    businessAspects: BusinessAspectOption[];
    item?: RuleTypeItem;
}

@Component({
    selector: 'app-admin-rule-type-form-dialog',
    templateUrl: './admin-rule-type-form-dialog.component.html',
    styleUrl: './admin-rule-type-form-dialog.component.css'
})
export class AdminRuleTypeFormDialogComponent implements OnInit {

    form: FormGroup;
    isEdit: boolean;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AdminRuleTypeFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: RuleTypeFormDialogData
    ) {
        this.isEdit = !!data.item;
        this.form = this.fb.group({
            internalName: [data.item?.internalName ?? '', Validators.required],
            description: [data.item?.description ?? ''],
            multipleSpecification: [data.item?.multipleSpecification ?? false],
            isSpecValuesBoolean: [data.item?.isSpecValuesBoolean ?? false],
            orderNo: [data.item?.orderNo ?? 0, [Validators.required, Validators.min(0)]],
            businessAspectIds: [data.item?.businessAspectIds ?? []],
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
                descriptionValue: [existing?.descriptionValue ?? '']
            }));
        }
    }

    isAspectSelected(id: number): boolean {
        return (this.form.get('businessAspectIds')?.value as number[]).includes(id);
    }

    toggleAspect(id: number): void {
        const current: number[] = [...(this.form.get('businessAspectIds')?.value ?? [])];
        const idx = current.indexOf(id);
        if (idx >= 0) current.splice(idx, 1);
        else current.push(id);
        this.form.patchValue({ businessAspectIds: current });
    }

    submit(): void {
        if (this.form.invalid) return;
        const v = this.form.value;
        this.dialogRef.close({
            id: this.data.item?.id ?? 0,
            internalName: v.internalName,
            description: v.description,
            multipleSpecification: v.multipleSpecification,
            isSpecValuesBoolean: v.isSpecValuesBoolean,
            orderNo: v.orderNo,
            businessAspectIds: v.businessAspectIds,
            localizations: this.localizationsArray.value
                .filter((l: any) => l.displayValue?.trim() || l.descriptionValue?.trim())
                .map((l: any) => ({
                    localizationId: l.localizationId,
                    displayValue: l.displayValue?.trim() ?? '',
                    descriptionValue: l.descriptionValue?.trim() ?? ''
                }))
        });
    }

    cancel(): void {
        this.dialogRef.close(null);
    }
}
