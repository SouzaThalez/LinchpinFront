// Intervenção sobre um chamado, no formato da API /interventions.
// Os relatórios com chamados (limpeza, aula, simulador da aula e manutenção) apontam para a sua intervenção.

export type InterventionSource = 'limpeza' | 'aula' | 'simulador' | 'manutenção';

// O que o formulário de intervenção envia. O usuário vem do login.
export interface InterventionForm {
    description: string;    // relato da intervenção
    type: string;           // tipo da intervenção
    status: string;         // status do chamado após a intervenção
    date: string;           // data da intervenção, DD-MM-YYYY
}

export interface Intervention extends InterventionForm {
    id: number;
    source: InterventionSource;
    reportId?: number;      // relatório do chamado
    user: {
        id?: number;
        name: string;
        role?: string;
    };
}
