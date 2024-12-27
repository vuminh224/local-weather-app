import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  isDropdownOpen = false;
  isHovering = false;

  openDropdown() {
    this.isDropdownOpen = true;
    this.isHovering = true;
  }

  closeDropdown() {
    this.isHovering = false;
    setTimeout(() => {
      if (!this.isHovering) {
        this.isDropdownOpen = false;
      }
    }, 200); //200ms delay to avoid instant shutdown
  }
}
