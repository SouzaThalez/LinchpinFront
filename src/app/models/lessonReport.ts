// Registro de aula, no formato da API /lesson-reports.
// Cada registro tem dois chamados independentes: a ocorrência da aula e a ocorrência do simulador,
// cada um com a sua intervenção (registrada em /interventions).

import { Intervention } from './intervention';

export type LessonReportCategory = 'treinamento' | 'disciplina' | 'curso';

// O que os formulários de aula enviam. Nomes da aula/curso e do simulador vêm dos cadastros;
// o usuário vem do login.
export interface LessonReportForm {
    category: LessonReportCategory;
    lessonId?: number;                  // treinamento/disciplina
    courseId?: number;                  // curso
    date: string;                       // data da aula, DD-MM-YYYY

    hasLessonOccurrence: boolean;       // false quando não houve ocorrência de aula
    lessonOccurrence?: string;

    hasSimulatorOccurrence: boolean;    // false quando não houve ocorrência de simulador
    simulatorId?: number;
    simulatorCode?: string;
    simulatorOccurrence?: string;
}

export interface LessonReport extends LessonReportForm {
    id: number;
    lessonName: string;     // nome da aula (ou do curso)
    groupName: string;      // treinamento/disciplina (ou o tipo do curso)
    groupLabel: string;     // valor do treinamento/disciplina (ou a sigla do curso)
    simulatorName?: string;
    simulatorCategory?: string;
    simulatorImage?: string;
    hasLessonIntervention: boolean;     // true quando a intervenção da aula for registrada
    lessonInterventionId?: number;
    lessonIntervention?: Intervention;
    hasSimulatorIntervention: boolean;  // true quando a intervenção do simulador for registrada
    simulatorInterventionId?: number;
    simulatorIntervention?: Intervention;
    user: {
        id?: number;
        name: string;
        role?: string;
    };
}

export const lessonReportImages: Record<LessonReportCategory, string> = {
    treinamento: 'assets/images/logo/th-logo.png',
    disciplina: 'assets/images/logo/th-logo.png',
    curso: 'assets/images/logo/curso-logo.png',
};
