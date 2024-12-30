import { CommonModule } from '@angular/common'
import { Component, EventEmitter, inject, Output } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { FlexModule } from '@ngbracket/ngx-layout'
import { Store } from '@ngrx/store'
import { debounceTime, filter, tap } from 'rxjs/operators'

import { SearchActions } from '../actions/search.actions'
import * as fromSearch from '../reducers/search.reducer'
import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css'],
})
export class CitySearchComponent {
  private readonly weatherService = inject(WeatherService)
  search = new FormControl('', [Validators.required, Validators.minLength(2)])
  @Output() searchEvent = new EventEmitter<{ searchText: string; country?: string }>()
  searchHistory: string[] = []

  constructor(private store: Store<fromSearch.WeatherState>) {
    this.search.valueChanges
      .pipe(
        filter(() => this.search.valid),
        debounceTime(1000),
        tap((searchValue) => this.doSearch(searchValue)),
        takeUntilDestroyed()
      )
      .subscribe()
  }

  doSearch(searchValue: string | null) {
    if (searchValue === null) return
    const userInput = searchValue.split(',').map((s) => s.trim())
    const searchText = userInput[0]
    const country = userInput.length > 1 ? userInput[1] : undefined

    this.searchEvent.emit({ searchText, country })

    switch (this.weatherService.reactivityMode()) {
      case 'signal':
        this.signalBasedSearch(searchText, country)
        break
      case 'subject':
        this.behaviorSubjectBasedSearch(searchText, country)
        break
      case 'ngrx':
        this.ngRxBasedSearch(searchText, country)
        break
    }
  }

  signalBasedSearch(searchText: string, country?: string) {
    this.weatherService.updateCurrentWeatherSignal(searchText, country)
    this.addToSearchHistory(searchText)
  }

  behaviorSubjectBasedSearch(searchText: string, country?: string) {
    this.weatherService.updateCurrentWeather(searchText, country)
    this.addToSearchHistory(searchText)
  }

  ngRxBasedSearch(searchText: string, country?: string) {
    this.store.dispatch(SearchActions.search({ searchText, country }))
    this.addToSearchHistory(searchText)
  }
  addToSearchHistory(searchText: string) {
    if (!this.searchHistory.includes(searchText)) {
      this.searchHistory.push(searchText)
    }
  }

  selectHistoryItem(searchText: string) {
    this.search.setValue(searchText)
    this.doSearch(searchText)
  }
  onKeydown(event: KeyboardEvent, searchText: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.selectHistoryItem(searchText)
    }
  }

  clear_history() {
    this.searchHistory = []
  }
}
