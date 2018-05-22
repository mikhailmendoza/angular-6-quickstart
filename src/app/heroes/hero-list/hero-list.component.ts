import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../hero-model/hero';
import { HeroService } from '../hero-service/hero.service';

@Component({
  selector: 'my-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  addingHero = false;
  error: any;
  showNgFor = false;
  isDataloading = true;

  constructor(private router: Router, private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes: any) => {
      this.heroes = heroes;
      this.isDataloading = false;
    },
      (err) => {
        this.error = this.error;
        error => (this.error = error)
      },
      () => {
         
      
       
      });

  }

  addHero(): void {
    this.addingHero = true;
    this.selectedHero = null;
  }

  saveRecord(hero){
    this.addingHero = false;
  }

  close(savedHero: Hero): void {
    this.addingHero = false;
    if (savedHero) {
      this.getHeroes();
    }
  }

  deleteHero(hero: Hero, event: any): void {
    event.stopPropagation();
    this.heroService.delete(hero).subscribe(res => {
      this.heroes = this.heroes.filter(h => h !== hero);
      if (this.selectedHero === hero) {
        this.selectedHero = null;
      }
    }, error => (this.error = error));
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.addingHero = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

}
