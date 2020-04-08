import { User } from './user';
import { LeaveType } from 'src/app/models/LeaveType';
export class LeaveRequest{
    id: string;
    startDate: string;
    description: String;
    endDate: string;
    leaveType: LeaveType;
    user: User;
    approve: boolean;
    edit: boolean;
}