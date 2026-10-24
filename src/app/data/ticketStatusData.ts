import { manitanceStatus } from '../enums/manitanceStatus';
import { userRoleType } from '../enums/userRoles';
import { Intervention } from '../models/intervention';

// Perfis que podem registrar/editar intervenções nos chamados.
export const interventionRoles: string[] = [userRoleType.admin, userRoleType.analyst];

// Status do chamado: segue o status da intervenção; sem intervenção o chamado está aberto.
export function ticketStatus(intervention?: Intervention | null): string {
    return intervention?.status || manitanceStatus.status1;
}

// Classe do .status-badge para cada status do chamado.
export function ticketBadgeClass(intervention?: Intervention | null): string {
    switch (ticketStatus(intervention)) {
        case manitanceStatus.status3: return 'success';
        case manitanceStatus.status2: return 'warning';
        default: return 'danger';
    }
}
