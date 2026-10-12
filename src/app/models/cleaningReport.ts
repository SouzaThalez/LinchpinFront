// Relatório de limpeza, no formato da API /cleaning-reports.

import { Intervention } from './intervention';

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
}

export interface CleaningReport extends CleaningReportForm {
    id: number;
    simulatorName: string;
    simulatorCategory: string;
    simulatorImage?: string;
    hasIntervention: boolean;   // true quando a intervenção for registrada (em /interventions)
    interventionId?: number;
    intervention?: Intervention;
    user: {
        id?: number;
        name: string;
        role?: string;
    };
}
