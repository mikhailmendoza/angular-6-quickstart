import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Hero } from '../hero-model/hero';
import { HeroService } from '../hero-service/hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  @Input() addingHero: boolean;
  @Output() saveRecord = new EventEmitter();
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.heroService.getHero(id).subscribe(hero => (this.hero = hero));
      } else {
        this.navigated = false;
        this.hero = new Hero();
      }
    });
  }

  save(): void {
    this.heroService.save(this.hero).subscribe(hero => {
      this.hero = hero; // saved hero, w/ id if new
      this.saveRecord.emit(this.hero);
      this.goBack(hero);
      this.hero = new Hero();
    }, error => (this.error = error)); // TODO: Display error message
  }

  goBack(savedHero: Hero = null): void {
    this.close.emit(savedHero);
    if (this.navigated) {
      window.history.back();
    
    }
  }
}
