import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginSuccessResponse } from '../../models/response.model';
import { SessionStorageService } from '../../services/session-storage-service.service';

export type feedbackData = {
  created_date: string;
  feedback_id: string;
  message: string;
};

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  constructor(
    private http: HttpClient,
    private storageService: SessionStorageService
  ) {}

  getFeedbacks() {
    return this.http.get<LoginSuccessResponse<feedbackData>>(
      'http://localhost:5000/api/v1/feedbacks',
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.storageService.getFromSessionStorage(
            'jwt'
          )}`,
        }),
      }
    );
  }
}