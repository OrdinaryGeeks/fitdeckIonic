import { Component } from '@angular/core';
import { FitDeckService } from '../fit-deck.service';

import { Category } from '../category';
import { Client } from '../client';
import { Team } from '../team';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  Clients: Client[];
  Teams: Team[];
  Categories: Category[];
  newExercise: string;
  chosenTeam:Team;
  chosenCategory:Category;
  chosenClient:Client;
  isShowCategory: boolean;
  isAdmin:boolean;
  isShowClient: boolean;
  isShowTeam: boolean;
  isShowExercise:boolean;
  motto: string;
  username:string;
  teamApplication:number;
  isLoggedIn:boolean;
  isSignUp:boolean;
  userProfileId:any;
  userID:any;
  token:any;
  email2: string;
  user:any;
  picture:any;
  photoURL: string;
  clientID: number;
  formButton:string;
  newCategory:string;
  
  constructor(private fitDeck:FitDeckService) {

    this.chosenCategory= {id:0, category:"Add A Category"};
    this.chosenClient = new Client();
    this.chosenTeam = new Team();
    this.Categories = [];
    this.Clients = [];
     this.Teams = [];
    this.isAdmin  = true;
    this.isShowCategory = false;
    this.isShowClient=false;
    this.isShowExercise=false;
    this.isShowTeam= false;
    this.motto="";
    this.username="";
    this.teamApplication = 0;
    this.email2  = "fake";
    this.userID = "";
    this.photoURL="";
    this.userProfileId="";
    this.isSignUp = false;
    this.isLoggedIn= false;
    this.clientID= -1;
    this.formButton = "Submit";
    this.newExercise="";
    this.newCategory="";


  }
 


  
  toggleExercise(){

    this.isShowExercise = !this.isShowExercise;
  }
 
  toggleClients(){

    this.isShowClient = !this.isShowClient;
  }
  toggleTeams(){

    this.isShowTeam = !this.isShowTeam;
  }
  toggleCategory(){
    
    this.Categories = this.fitDeck.Categories;
    this.isShowCategory = !this.isShowCategory;
  }
  addCategory(){

   
    this.fitDeck.addCategory(this.newCategory);
  }

  addExercise(){


    this.fitDeck.addExercise(this.chosenCategory.id, this.newExercise);


  }
  assignClientToTeam(){

  
    let updatedClient = this.fitDeck.Clients.filter(client => client.clientID == this.chosenClient.clientID)[0];

    updatedClient.teamID = this.chosenTeam.id;

    this.fitDeck.assignClientToTeam(updatedClient);

  }
  

  loginWithFB(){


    this.fitDeck.loginWithFB().then(()=>{this.photoURL=this.fitDeck.photoURL; this.isLoggedIn = this.fitDeck.isLoggedIn;});

  }

  onSubmit(){
    //this.fitDeck.onSubmit();


    this.fitDeck.motto = this.motto;
    this.fitDeck.teamID = this.teamApplication;

  }
     /*this.http.get('https://www.ordinarygeeks.com/api/fitdeckclient/fb/'+this.userID).subscribe((up :any) => {if(up.FBID == null){
 this.isSignUp = true;
 alert("positive vibes");
    }
  else{

    this.motto = up.Motto;
    this.username = up.UserName;
    this.teamApplication = up.TeamID;
    this.isLoggedIn = true;
    this.clientID = up.ClientID;
    this.formButton = "Update";
  }})});
  }
  */

}