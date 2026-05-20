
type FeatureFlag = 'CASE_STUDIES_ENABLED' | 'ADVANCED_ANALYTICS_ENABLED' | 'BETA_NAV_ENABLED';

type FeatureFlags = Record<FeatureFlag, boolean>;

class FeatureFlagService {
  private static instance: FeatureFlagService;
  private flags: FeatureFlags = {
    CASE_STUDIES_ENABLED: true,
    ADVANCED_ANALYTICS_ENABLED: false,
    BETA_NAV_ENABLED: false,
  };

  private constructor() {
    this.initializeFlags();
  }

  public static getInstance(): FeatureFlagService {
    if (!FeatureFlagService.instance) {
      FeatureFlagService.instance = new FeatureFlagService();
    }
    return FeatureFlagService.instance;
  }

  private initializeFlags() {
    // 1. Check URL parameters for overrides (e.g., ?ff_concept_lab=true)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      
      (Object.keys(this.flags) as FeatureFlag[]).forEach(flag => {
        const paramKey = `ff_${flag.toLowerCase().replace('_enabled', '')}`;
        const paramValue = params.get(paramKey);
        
        if (paramValue !== null) {
          this.flags[flag] = paramValue === 'true' || paramValue === '1';
        }
      });
      
      // 2. Check localStorage
      const storedFlags = localStorage.getItem('targetbob_feature_flags');
      if (storedFlags) {
        try {
          const parsed = JSON.parse(storedFlags);
          this.flags = { ...this.flags, ...parsed };
        } catch (e) {
          console.error("Failed to parse stored feature flags", e);
        }
      }
    }
  }

  public isEnabled(flag: FeatureFlag): boolean {
    return this.flags[flag];
  }

  public setFlag(flag: FeatureFlag, value: boolean) {
    this.flags[flag] = value;
    if (typeof window !== 'undefined') {
      localStorage.setItem('targetbob_feature_flags', JSON.stringify(this.flags));
    }
  }

  public getAllFlags(): FeatureFlags {
    return { ...this.flags };
  }
}

export const featureFlags = FeatureFlagService.getInstance();
