
import {throwError as observableThrowError, Subscription,  Observable, throwError } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import {Film} from '../../models/film.model';
import {GreatsList} from '../../models/list.model';

import {FilmListService} from './film-list.service';
import {AuthService} from '../../auth/auth.service';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import * as anime from 'animejs';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
})
export class GreatsListComponent implements OnInit {
  private subscription: Subscription;
  greats: Observable<GreatsList[]>;
  loaded: boolean = false;
  username: Observable<String>;
  isLoggedIn: Boolean = false;
  dataSource: MatTableDataSource<GreatsList>;
  displayedColumns = ['name'];

  constructor(private greatsListService: FilmListService, private authService: AuthService,private router: Router) {
    this.greats = greatsListService.getLists().pipe(
      map((obj:GreatsList[])=>{
      this.loaded = true;
      return obj.slice(0,4);
    }), catchError(err=>{
      return throwError(err)
    }));

    authService.isLoggedIn().subscribe(
      value =>{
        this.isLoggedIn = value;
        if(this.isLoggedIn){
          greatsListService.getMyLists().subscribe(lists=>{
            this.dataSource = new MatTableDataSource<GreatsList>(lists);
          });
        }
      }
    );
  }
  ngAfterViewInit() {
    var path = anime.path('#motionPath path');

    var motionPath = anime({
      targets: '#motionPath .el',
      translateX: path('x'),
      translateY: path('y'),
      rotate: path('angle'),
      easing: 'linear',
      duration: 2000,
      loop: true
    });

  }
  ngOnInit() {
  }

  clickList(list: GreatsList){
    this.router.navigate(['/l/' + list._id]);
  }
  getBackdrop(film: Film){
    return this.greatsListService.getBackdrop(film);
  }

}
