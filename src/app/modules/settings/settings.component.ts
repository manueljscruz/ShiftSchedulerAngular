import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../core/services/api/AuthService';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { ChangePasswordRequestDTO } from '../../shared/models/DTOs/Outgoing/ChangePasswordRequestDTO';

interface SupportedLanguage {
  code: string;
  label: string;
  nativeLabel: string;
  baseHref: string;
}

interface NotificationPreferences {
  emailOnInvitation: boolean;
  emailOnAbsenceDecision: boolean;
  emailOnSchedulePublished: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {

  // ─── Language ───────────────────────────────────────────────────────────────

  readonly languages: SupportedLanguage[] = [
    { code: 'en', label: 'English',    nativeLabel: 'English',    baseHref: '/'    },
    { code: 'fr', label: 'French',     nativeLabel: 'Français',   baseHref: '/fr/' },
    { code: 'es', label: 'Spanish',    nativeLabel: 'Español',    baseHref: '/es/' },
    { code: 'de', label: 'German',     nativeLabel: 'Deutsch',    baseHref: '/de/' },
    { code: 'it', label: 'Italian',    nativeLabel: 'Italiano',   baseHref: '/it/' },
    { code: 'pt', label: 'Portuguese', nativeLabel: 'Português',  baseHref: '/pt/' },
  ];

  currentLanguage: SupportedLanguage = this.languages[0];
  selectedLanguageCode: string = 'en';

  // ─── Timezone ───────────────────────────────────────────────────────────────

  timezones: string[] = [];
  selectedTimezone: string = 'UTC';

  // timezoneFilter is kept in sync with the autocomplete input value
  private _timezoneFilter: string = '';
  set timezoneFilter(val: string) { this._timezoneFilter = val ?? ''; }
  get timezoneFilter(): string { return this._timezoneFilter; }

  get filteredTimezones(): string[] {
    const q = this._timezoneFilter.toLowerCase();
    return q ? this.timezones.filter(tz => tz.toLowerCase().includes(q)) : this.timezones;
  }

  // ─── Notifications ──────────────────────────────────────────────────────────

  notifications: NotificationPreferences = {
    emailOnInvitation: true,
    emailOnAbsenceDecision: true,
    emailOnSchedulePublished: false,
  };

  // ─── Password ───────────────────────────────────────────────────────────────

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private snackbarService: SnackbarManagerService,
    private loadingService: LoadingSpinnerManagerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.detectCurrentLanguage();
      this.loadTimezones();
      this.loadNotificationPreferences();
    }
  }

  // ─── Language ───────────────────────────────────────────────────────────────

  private detectCurrentLanguage(): void {
    const path = window.location.pathname;
    const match = this.languages.find(l => l.baseHref !== '/' && path.startsWith(l.baseHref));
    this.currentLanguage = match ?? this.languages[0];
    this.selectedLanguageCode = this.currentLanguage.code;
  }

  applyLanguage(): void {
    const target = this.languages.find(l => l.code === this.selectedLanguageCode);
    if (!target || target.code === this.currentLanguage.code) return;

    const currentPath = window.location.pathname;

    // Strip any existing non-default locale prefix from the path
    const strippedPath = this.languages
      .filter(l => l.baseHref !== '/')
      .reduce((p, l) => (p.startsWith(l.baseHref) ? '/' + p.slice(l.baseHref.length) : p), currentPath);

    const newPath = target.baseHref === '/'
      ? strippedPath || '/'
      : target.baseHref + strippedPath.replace(/^\//, '');

    window.location.href = newPath;
  }

  // ─── Timezone ───────────────────────────────────────────────────────────────

  private loadTimezones(): void {
    try {
      this.timezones = (Intl as any).supportedValuesOf('timeZone');
    } catch {
      // Fallback for browsers that don't support Intl.supportedValuesOf
      this.timezones = [
        'UTC', 'America/New_York', 'America/Chicago', 'America/Denver',
        'America/Los_Angeles', 'America/Sao_Paulo', 'Europe/London',
        'Europe/Paris', 'Europe/Berlin', 'Europe/Lisbon', 'Europe/Rome',
        'Asia/Dubai', 'Asia/Kolkata', 'Asia/Tokyo', 'Asia/Shanghai',
        'Australia/Sydney', 'Pacific/Auckland',
      ];
    }
    const saved = localStorage.getItem('preferredTimezone');
    this.selectedTimezone = saved ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  saveTimezone(): void {
    localStorage.setItem('preferredTimezone', this.selectedTimezone);
    this.snackbarService.showSuccessSnackbar(new SnackbarUIModel(3, 'Timezone preference saved.'));
  }

  // ─── Notifications ──────────────────────────────────────────────────────────

  private loadNotificationPreferences(): void {
    const saved = localStorage.getItem('notificationPreferences');
    if (saved) {
      try {
        this.notifications = { ...this.notifications, ...JSON.parse(saved) };
      } catch {
        // ignore malformed data
      }
    }
  }

  saveNotifications(): void {
    localStorage.setItem('notificationPreferences', JSON.stringify(this.notifications));
    this.snackbarService.showSuccessSnackbar(new SnackbarUIModel(3, 'Notification preferences saved.'));
  }

  // ─── Password ───────────────────────────────────────────────────────────────

  async changePassword(): Promise<void> {
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.snackbarService.showFailSnackbar(new SnackbarUIModel(4, 'All password fields are required.'));
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.snackbarService.showFailSnackbar(new SnackbarUIModel(4, 'New passwords do not match.'));
      return;
    }
    if (this.newPassword.length < 6) {
      this.snackbarService.showFailSnackbar(new SnackbarUIModel(4, 'New password must be at least 6 characters.'));
      return;
    }
    if (this.newPassword === this.currentPassword) {
      this.snackbarService.showFailSnackbar(new SnackbarUIModel(4, 'New password must differ from the current password.'));
      return;
    }

    this.loadingService.changeLoadingState(true);
    const dto = new ChangePasswordRequestDTO(this.currentPassword, this.newPassword, this.confirmPassword);
    const response = await this.authService.changePassword(dto);
    this.loadingService.changeLoadingState(false);

    if (response?.success || response?.result) {
      this.snackbarService.showSuccessSnackbar(new SnackbarUIModel(4, 'Password changed successfully.'));
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    } else {
      const msg = typeof response?.message === 'string' ? response.message : 'Failed to change password.';
      this.snackbarService.showFailSnackbar(new SnackbarUIModel(5, msg));
    }
  }
}
