import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalizationOption } from '../../../core/services/api/admin/AdminLanguageService';
import { CampaignItem } from '../admin-campaign-manager.component';

const EMPTY_GUID = '00000000-0000-0000-0000-000000000000';

export interface SubscriptionPlanDurationPriceOption {
    id: string;
    label: string;
}

export interface CampaignFormDialogData {
    languages: LocalizationOption[];
    planOptions: SubscriptionPlanDurationPriceOption[];
    item?: CampaignItem;
}

@Component({
    selector: 'app-admin-campaign-form-dialog',
    templateUrl: './admin-campaign-form-dialog.component.html',
    styleUrl: './admin-campaign-form-dialog.component.css'
})
export class AdminCampaignFormDialogComponent implements OnInit {

    form: FormGroup;
    isEdit: boolean;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AdminCampaignFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CampaignFormDialogData
    ) {
        this.isEdit = !!data.item;
        this.form = this.fb.group({
            name: [data.item?.name ?? '', Validators.required],
            description: [data.item?.description ?? ''],
            startDate: [data.item?.startDate ? new Date(data.item.startDate) : new Date(), Validators.required],
            endDate: [data.item?.endDate ? new Date(data.item.endDate) : null],
            promotionPercent: [data.item?.promotionPercent ?? 0, [Validators.required, Validators.min(0), Validators.max(100)]],
            isActive: [data.item?.isActive ?? true],
            maxRedemptions: [data.item?.maxRedemptions ?? 0, [Validators.min(0)]],
            couponCode: [data.item?.couponCode ?? ''],
            eligibleSubscriptionPlanDurationPriceIds: [data.item?.eligibleSubscriptionPlanDurationPriceIds ?? []],
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

    isPlanSelected(id: string): boolean {
        return (this.form.get('eligibleSubscriptionPlanDurationPriceIds')?.value as string[]).includes(id);
    }

    togglePlan(id: string): void {
        const current: string[] = [...(this.form.get('eligibleSubscriptionPlanDurationPriceIds')?.value ?? [])];
        const idx = current.indexOf(id);
        if (idx >= 0) current.splice(idx, 1);
        else current.push(id);
        this.form.patchValue({ eligibleSubscriptionPlanDurationPriceIds: current });
    }

    submit(): void {
        if (this.form.invalid) return;
        const v = this.form.value;
        this.dialogRef.close({
            id: this.data.item?.id ?? EMPTY_GUID,
            name: v.name,
            description: v.description,
            startDate: v.startDate,
            endDate: v.endDate,
            promotionPercent: v.promotionPercent,
            isActive: v.isActive,
            maxRedemptions: v.maxRedemptions,
            couponCode: v.couponCode,
            eligibleSubscriptionPlanDurationPriceIds: v.eligibleSubscriptionPlanDurationPriceIds,
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
