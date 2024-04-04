import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeaveService, leave_data } from '../../services/leave.service';
import { Subscription } from 'rxjs';
import { JWTService } from '../../../services/jwtservice.service';
import { SessionStorageService } from '../../../services/session-storage-service.service';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'school-leaves-list',
  templateUrl: './leaves-list.component.html',
  styleUrl: './leaves-list.component.css',
})
export class LeavesListComponent implements OnInit, OnDestroy {
  leavesData!: leave_data[];
  fetchLeaveSubscriber!: Subscription;
  approveLeaveSubscriber!: Subscription;
  cols!: Column[];
  role!: string;
  visible: boolean = false;

  constructor(
    private leaveService: LeaveService,
    private jwtService: JWTService,
    private storageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.fetchLeavesData();

    this.role = this.jwtService.getRoleFromToken(
      this.storageService.getFromSessionStorage('jwt')
    );
  }

  showDialog() {
    this.visible = true;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'pending':
        return 'danger';
      case 'approved':
        return 'success';
      default:
        return 'warning';
    }
  }
  fetchLeavesData() {
    this.fetchLeaveSubscriber = this.leaveService
      .getLeaves()
      .subscribe((responseData) => {
        this.leavesData = responseData.data.json;
        console.log(responseData.data.json);
      });
  }

  approveLeave(leaveId: string) {
    console.log(leaveId);
    this.approveLeaveSubscriber = this.leaveService
      .updateLeaveStatus(leaveId)
      .subscribe((responseData) => {
        console.log(responseData);
        this.fetchLeavesData();
      });
  }

  closeDialog() {
    this.visible = false;
    this.fetchLeavesData();
  }

  ngOnDestroy(): void {
    this.fetchLeaveSubscriber?.unsubscribe();
    this.approveLeaveSubscriber?.unsubscribe();
  }
}
