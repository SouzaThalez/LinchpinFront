// Relatório de limpeza, no formato da API /cleaning-reports.

export type CleaningCategory = 'primária' | 'secundária';

// O que o formulário de limpeza envia. Nome, categoria e imagem do simulador
// vêm do cadastro do simulador; o usuário vem do login.
export interface CleaningReportForm {
    simulatorId: number;
    simulatorCode: string;
    cleaningCategory: CleaningCategory;
    date: string;               // data da limpeza, DD-MM-YYYY
    findings: string;           // achados
    hasDescription: boolean;    // false quando não houve achados
    hasIntervention: boolean;   // muda para true quando a intervenção for registrada
    intervention?: any;
}

export interface CleaningReport extends CleaningReportForm {
    id: number;
    simulatorName: string;
    simulatorCategory: string;
    simulatorImage?: string;
    user: {
        id?: number;
        name: string;
        role?: string;
    };
}
