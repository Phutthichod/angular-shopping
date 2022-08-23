import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PlayerService } from '../player.service';

import { FormPlayerComponent } from './form-player.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { findEl, setFieldValue } from '../spec-helpers/element.spec-helper';

const player = {
  id:1,
  name:"Neymar JR",
  value:200
}

fdescribe('FormPlayerComponent', () => {
  let component: FormPlayerComponent;
  let fixture: ComponentFixture<FormPlayerComponent>;
  let fakePlayerService: PlayerService;

  const setup = async (
    playerServiceReturnValues?:
      jasmine.SpyObjMethodNames<PlayerService>,
  ) => {

    fakePlayerService = jasmine.createSpyObj<PlayerService>(
      'PlayerService',
      {
        getPlayers: undefined,
        createPlayer: undefined,
        ...playerServiceReturnValues,
      }
    );

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ FormPlayerComponent ],
      providers:  [
        { provide: PlayerService, useValue: fakePlayerService }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }


  fit('should create', async() => {
    await setup()
    expect(component).toBeTruthy();
  });

  fit('submit form add player',async()=>{
    await setup({
      createPlayer: of({...player,id:null})
    })
    setFieldValue(fixture, 'nameInputPlayer', player.name);
    setFieldValue(fixture, 'inputValuePlayer', player.value.toString());

    findEl(fixture, 'form').triggerEventHandler('submit',{});

    expect(fakePlayerService.createPlayer).toHaveBeenCalledWith({...player,id:null})
  })
});
