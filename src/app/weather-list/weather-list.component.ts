import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { FlexModule } from '@ngbracket/ngx-layout'

import { ICurrentWeather } from '../interfaces'

@Component({
  selector: 'app-weather-list',
  standalone: true,
  imports: [CommonModule, FlexModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent {
  @Input() weatherList: ICurrentWeather[] = []

  getOrdinal(date: number) {
    const n = new Date(date).getDate()
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : ''
  }

  removeWeather(index: number) {
    this.weatherList.splice(index, 1)
  }
}
