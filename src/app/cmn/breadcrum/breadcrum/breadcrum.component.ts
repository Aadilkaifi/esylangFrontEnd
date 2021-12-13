import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrum',
  templateUrl: './breadcrum.component.html',
  styleUrls: ['./breadcrum.component.css']
})
export class BreadcrumComponent implements OnInit {
  @Input() title: string;
  @Input() crum1: string;
  @Input() crum2: string;
  constructor() { }

  ngOnInit(): void {
  }

}
