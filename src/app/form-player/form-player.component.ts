import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-form-player',
  templateUrl: './form-player.component.html',
  styleUrls: ['./form-player.component.scss']
})
export class FormPlayerComponent implements OnInit {

  playerForm: FormGroup;

  constructor(private fb: FormBuilder, private playerService: PlayerService) { 
    this.playerForm = fb.group({
      name:'',
      value: 0
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.playerForm.value);
    this.playerService.createPlayer({
      id: null,
      name: this.playerForm.value.name,
      value: this.playerForm.value.value
    }).subscribe(()=>{
      console.log("create player success")
    });
  }


}
