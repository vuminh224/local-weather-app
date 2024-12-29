/* eslint-disable prettier/prettier */
import { Component, effect, inject, signal } from '@angular/core'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { FlexModule } from '@ngbracket/ngx-layout'

import { CitySearchComponent } from './city-search/city-search.component'
import { CurrentWeatherComponent } from './current-weather/current-weather.component'
import { DropdownComponent } from './dropdown/dropdown.component'
import { ICurrentWeather } from './interfaces'
import { WeatherService } from './weather/weather.service'
import { WeatherListComponent } from './weather-list/weather-list.component'

const darkClassName = 'dark-theme'
const unitClassName = 'celcius'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CitySearchComponent,
    CurrentWeatherComponent,
    DropdownComponent,
    FlexModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,
    WeatherListComponent,
],
  template: `
    <mat-toolbar color="primary">
      <span data-testid="title">LocalCast Weather</span>
      <div fxFlex></div>
      <app-dropdown>
        <div>
          <mat-icon>brightness_5</mat-icon>
          <mat-slide-toggle
            color="warn"
            data-testid="darkmode-toggle"
            [checked]="toggleState()"
            (change)="toggleState.set($event.checked)"></mat-slide-toggle>
          <mat-icon>bedtime</mat-icon>
        </div>

        <div>
          °F
          <mat-slide-toggle
            color="warn"
            data-testid="unit-toggle"
            [checked]="togglUnit()"
            (change)="togglUnit.set($event.checked)"></mat-slide-toggle>
          °C
        </div>
      </app-dropdown>
    </mat-toolbar>

    <div fxLayoutAlign="center">
      <div class="mat-caption v-pad">Your city, your forecast, right now!</div>
    </div>

    <div fxLayoutAlign="center">
      <app-city-search></app-city-search>
    </div>
    <div fxLayoutAlign="center">
      <app-weather-list [weatherList]="weatherList"></app-weather-list>
    </div>
    <div fxLayout="row" fxLayoutAlign="center center" style="margin: 16px 0;">
      <button mat-raised-button color="primary" (click)="addCurrentWeatherToList()">Add Current Weather</button>
    </div>

    <div fxLayout="row">
      <div fxFlex></div>
      <mat-card appearance="outlined" fxFlex="300px">
        <mat-card-header>
          <mat-card-title>
            <div class="mat-headline-5">Current Weather</div>
          </mat-card-title>
        </mat-card-header>
        <mat-card-content> <app-current-weather></app-current-weather> </mat-card-content> <!-- TODO -->
      </mat-card>
      <div fxFlex></div>
    </div>

    <div
      fxLayout="column"
      fxLayoutAlign="center center"
      fxLayoutGap="8px"
      style="margin-top:16px;">
      <div class="mat-headline-8">
        Reactivity Mode<mat-icon matTooltip="For demonstration purposes only"
          >info</mat-icon
        >
      </div>
      <mat-button-toggle-group
        color="accent"
        aria-label="Reactivity Mode"
        data-testid="reactivity-mode"
        [value]="this.weatherService.reactivityMode()"
        (change)="this.weatherService.reactivityMode.set($event.value)">
        <mat-button-toggle value="signal">Signal</mat-button-toggle>
        <mat-button-toggle value="subject">BehaviorSubject</mat-button-toggle>
        <mat-button-toggle value="ngrx">NgRx</mat-button-toggle>
      </mat-button-toggle-group>
    </div>
  `,
})
export class AppComponent {
  readonly weatherService = inject(WeatherService)
  readonly toggleState = signal(localStorage.getItem(darkClassName) === 'true')
  readonly togglUnit = signal(localStorage.getItem(unitClassName) === 'true')
  weatherList: ICurrentWeather[] = []

  constructor() {
    effect(() => {
      localStorage.setItem(darkClassName, this.toggleState().toString())
      document.documentElement.classList.toggle(darkClassName, this.toggleState())
    })
    effect(() => {
      localStorage.setItem(unitClassName, this.togglUnit().toString())
      document.documentElement.classList.toggle(unitClassName, this.togglUnit()) //TODO : change la class mais c'est surement pas ça, mais plutôt signaler avec un observable (TP Angular Q16) au commpodent qui gère l'affichage de la météo de passer en celcius ou farenheit
    })
  }

  addCurrentWeatherToList() {
    // Get the current weather from your weather service
    const currentWeather = this.weatherService.currentWeatherSignal();
    if (currentWeather) {
      // Check if the city already exists in the list
      const exists = this.weatherList.some(
        (weather) => weather.city === currentWeather.city
      )
      if (!exists) {
        this.weatherList = [...this.weatherList, currentWeather];
      }
    }
  }
}
