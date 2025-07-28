import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Personnel } from './models/personnel.mode';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PersonnelService {
  private apiUrl = 'http://localhost:5202/api/personnel'; 
  private personnelsSubject = new BehaviorSubject<Personnel[]>([]);
  personnels$ = this.personnelsSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchPersonnels(): void {
    this.http.get<Personnel[]>(this.apiUrl).subscribe({
      next: data => this.personnelsSubject.next(data),
      error: err => console.error('Fetch failed:', err)
    });
  }

  getPersonnels(): Observable<Personnel[]> {
    return this.personnels$;
  }

  addPersonnel(personnel: Personnel): Observable<Personnel> {
    return this.http.post<Personnel>(this.apiUrl, personnel).pipe(
      tap((newPersonnel) => {
        const updated = [...this.personnelsSubject.getValue(), newPersonnel];
        this.personnelsSubject.next(updated);
      })
    );
  }

  deletePersonnel(id: string): Observable<void> {
    return new Observable<void>((observer) => {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => {
          const updated = this.personnelsSubject.getValue().filter(p => p.id !== id);
          this.personnelsSubject.next(updated);
          observer.next();
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  updatePersonnel(updatedPersonnel: Personnel): Observable<Personnel> {
  return this.http.put<Personnel>(`http://localhost:5202/api/personnel/${updatedPersonnel.id}`, updatedPersonnel).pipe(
    tap((response: Personnel) => {
      const current = this.personnelsSubject.getValue();
      const index = current.findIndex(p => p.id === response.id);
        if (index !== -1) {
          current[index] = response;
          this.personnelsSubject.next([...current]);
        }
      })
    );
  }
}

