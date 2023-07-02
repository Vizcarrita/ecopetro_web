import { Component, OnInit } from '@angular/core';
import { fadeInUpAnimation } from '../../@fury/animations/fade-in-up.animation';

@Component({
  selector: 'fury-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss'],
  animations: [fadeInUpAnimation]
})
export class ComingSoonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
