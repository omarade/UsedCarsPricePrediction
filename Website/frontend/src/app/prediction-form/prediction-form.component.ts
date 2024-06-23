import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prediction-form',
  templateUrl: './prediction-form.component.html',
  styleUrls: ['./prediction-form.component.css']
})
export class PredictionFormComponent {
  

  prediction: string | null = null;

  constructor(private http: HttpClient) {}

  onSubmit(predictionForm: { value: { year: any; manufacturer: any; odometer: any; transmission: any; size: any; }; }) {
    const formData = {
      year: predictionForm.value.year,
      manufacturer: predictionForm.value.manufacturer,
      odometer: predictionForm.value.odometer,
      transmission: predictionForm.value.transmission,
      size: predictionForm.value.size
    };

    console.log(formData);

    this.http.post<any>('http://localhost:5000/predict', formData).subscribe(
      (response) => {
        this.prediction = response.prediction;
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }
}
