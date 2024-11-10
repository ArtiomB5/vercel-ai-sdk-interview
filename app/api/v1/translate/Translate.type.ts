type LanguageType = 'English' | 'Russian';

export interface ITranslatePropmp {
    from: LanguageType,
    into: LanguageType,
    text: string
}
