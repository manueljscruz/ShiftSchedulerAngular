export interface TypeManagerConfig {
    typeKey: string;       // matches the key registered in .NET keyed services
    label: string;         // display name shown in the UI
    icon: string;          // material icon name
    routePath?: string;    // if set, sidebar link navigates here instead of configuration/:typeKey
}
