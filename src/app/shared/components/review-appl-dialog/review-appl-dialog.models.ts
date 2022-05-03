import { ApplStatuses } from '../../enums/appl-status.enum';

export interface ReviewApplDialogData {
  applicationID: string;
  status: ApplStatuses;
}

export type ReviewApplDialogResult = boolean | undefined;
