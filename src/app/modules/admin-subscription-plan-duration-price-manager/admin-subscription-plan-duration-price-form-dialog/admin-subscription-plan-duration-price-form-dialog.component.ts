import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NamedOption, SubscriptionPlanDurationPriceItem } from '../admin-subscription-plan-duration-price-manager.component';

const EMPTY_GUID = '00000000-0000-0000-0000-000000000000';

export interface SubscriptionPlanDurationPriceFormDialogData {
    planTypes: NamedOption[];
    durationTypes: NamedOption[];
    item?: SubscriptionPlanDurationPriceItem;
}

@Component({
    selector: 'app-admin-subscription-plan-duration-price-form-dialog',
    templateUrl: './admin-subscription-plan-duration-price-form-dialog.component.html',
    styleUrl: './admin-subscription-plan-duration-price-form-dialog.component.css'
})
export class AdminSubscriptionPlanDurationPriceFormDialogComponent {

    form: FormGroup;
    isEdit: boolean;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AdminSubscriptionPlanDurationPriceFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SubscriptionPlanDurationPriceFormDialogData
    ) {
        this.isEdit = !!data.item;
        this.form = this.fb.group({
            subscriptionPlanTypeId: [data.item?.subscriptionPlanTypeId ?? null, Validators.required],
            subscriptionDurationTypeId: [data.item?.subscriptionDurationTypeId ?? null, Validators.required],
            basePrice: [data.item?.basePrice ?? 0, [Validators.required, Validators.min(0)]],
            toScale: [data.item?.toScale ?? false],
            scaleRequirement: [data.item?.scaleRequirement ?? 1, [Validators.required, Validators.min(0)]],
            pricePerExtraMember: [data.item?.pricePerExtraMember ?? 0, [Validators.min(0)]],
            includedGenerations: [data.item?.includedGenerations ?? 0, [Validators.required, Validators.min(0)]],
            pricePerExtraGeneration: [data.item?.pricePerExtraGeneration ?? 0, [Validators.min(0)]],
            isPublicPlan: [data.item?.isPublicPlan ?? true],
            isActive: [data.item?.isActive ?? true]
        });
    }

    submit(): void {
        if (this.form.invalid) return;
        const v = this.form.value;
        this.dialogRef.close({
            id: this.data.item?.id ?? EMPTY_GUID,
            subscriptionPlanTypeId: v.subscriptionPlanTypeId,
            subscriptionDurationTypeId: v.subscriptionDurationTypeId,
            basePrice: v.basePrice,
            toScale: v.toScale,
            scaleRequirement: v.scaleRequirement,
            pricePerExtraMember: v.pricePerExtraMember,
            includedGenerations: v.includedGenerations,
            pricePerExtraGeneration: v.pricePerExtraGeneration,
            isPublicPlan: v.isPublicPlan,
            isActive: v.isActive
        });
    }

    cancel(): void {
        this.dialogRef.close(null);
    }
}
