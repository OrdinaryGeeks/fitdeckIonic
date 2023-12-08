import { Injectable } from '@angular/core';
import { Exercise } from './exercise';
import { Client } from './client';
import { Team } from './team';
import { Category } from './category';
import { Assignment } from './assignment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  FacebookLogin,
  FacebookLoginResponse
} from '@capacitor-community/facebook-login';

@Injectable({
  providedIn: 'root'
})
export class FitDeckService {

  
  Categories:Category[];
  Exercises: Exercise[];
  Clients: Client[];
  Teams: Team[]=[];
  User:Client;

  userProfileId:any;
  userID:any;
  token:any;
  user:any;
  picture:any;
  email2:string;
  isLoggedIn:boolean;

  clientID:number;
  email:string; 
  userName:string;
  fbID:string;
  motto:string;
  photoURL:string;
  teamID:number;

  constructor(private http:HttpClient) {
    this.Categories = [];
    this.Exercises = [];
    this.Clients = [];
    this.Teams = [];

    this.clientID=0;
    this.email="";
    this.userName= "";
    this.fbID = "";
    this.motto="";
    this.photoURL = "";
    this.teamID = 0;
    this.isLoggedIn = false;
    this.email2 = '';
    this.User  = {fbID:'', googleID:'', teamID:-1, clientID:-1,userName:'', motto:'', photoURL:'', email:''};
    this.getCategories();
    this.getClients();
    this.getExercises();

   }

  
   fbLoadUserData()
   {


   }
  getClients()
  {

    this.http.get<Client[]>("https://www.ordinarygeeks.com/api/FitDeckClient").subscribe(res => this.Clients = res);

  }

  getExercises()
  {

    this.http.get<Exercise[]>("https://www.ordinarygeeks.com/api/FitDeckExercise").subscribe(res => this.Exercises = res);

  }

  addExercise(categoryID:number,exercise:string)
  {
   this.http.post("https://www.ordinarygeeks.com/api/fitdeckexercise", {Description:"", URL:"", PhotoUrl:"", Suit:"", CategoryID:categoryID, Name:exercise},  {observe: "response" , headers: {'Content-Type':  'application/json'}});

    this.getExercises();



  }

  assignClientToTeam(client: Client)
  {

    this.http.put("https://www.ordinarygeeks.com/api/fitdeckclient/"+client.clientID, client, {observe: "response" , headers: {'Content-Type':  'application/json'}});

  }
  addCategory(category:string)
  {

    this.http.post("https://www.ordinarygeeks.com/api/fitdeckexercisecategory", {Category:category},  {observe: "response" , headers: {'Content-Type':  'application/json'}}).subscribe((res => alert(res.status)), 	(err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        //A client-side or network error occurred.				 
       alert('An error occurred:' + err.error.message);
      } else {
        //Backend returns unsuccessful response codes such as 404, 500 etc.				 
        alert('Backend returned status code: ' + err.status);
        alert('Response body:'+ err.error);
      }
    });

    this.getCategories();
    
  }
  getCategories()
  {
    this.http.get<Category[]>("https://www.ordinarygeeks.com/api/FitDeckExerciseCategory").subscribe(((res:Category[]) => {

    this.Categories = res;

    
  }),
  (err) => { alert(err[0] + err[1])}
    
    );

}



async getCurrentToken() {
  const result = await FacebookLogin.getCurrentAccessToken();

  if (result.accessToken) {
    this.token = result.accessToken;
    this.loadUserData();
  } else {
    // Not logged in.
  }
}
onSubmit(){

  if(this.isLoggedIn)
  {
    this.http.put('https://www.ordinarygeeks.com/api/fitdeckclient/'+this.User.clientID,{GoogleID: "-1", Email : this.email2,UserName:this.User.userName, FBID:this.User.fbID,Motto:this.User.motto, PhotoURL: this.User.photoURL, TeamID:this.User.teamID}
    );
  }
  else
  {
    
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
    observe: 'response'
};
  this.http.post('https://www.ordinarygeeks.com/api/fitdeckclient/',{GoogleID: "-1", Email : this.email2,UserName:this.User.userName, FBID:this.User.fbID,Motto:this.User.motto, PhotoURL: this.User.photoURL, TeamID:this.User.teamID}, {observe: "response" , headers: {'Content-Type':  'application/json'}}
  ).subscribe((res:any) =>   {
   
  this.User.motto = res.Motto;
this.User.userName = res.UserName;
this.User.teamID = res.TeamID;

this.User.clientID = res.ClientID;
this.User.fbID = res.FBID;


});


  }
}

async loadUserData() {
  const url = `https://graph.facebook.com/${this.token.userId}?fields=id,name,picture.width(720),birthday,email&access_token=${this.token.token}`;
  this.http.get(url).subscribe(res => {
    this.user = res;
    this.email2 = this.user.email;
    this.userID = this.token.userId;
    this.photoURL =  "https://graph.facebook.com/"+this.token.userId+"/picture?type=large";
    this.isLoggedIn = true;

    alert(this.userID);
this.http.get('https://www.ordinarygeeks.com/api/fitdeckclient/fb/'+this.userID).subscribe((res :any) => {

this.User.motto = res.Motto;
this.User.userName = res.UserName;
this.User.teamID = res.TeamID;

this.User.clientID = res.ClientID;
this.User.fbID = res.FBID;

alert(res.FBID);

  },
  (error) => {alert(error.status);
  
   
  });
});}


async logOut(){

  await FacebookLogin.logout();

}
async logIn(){
 
  const FACEBOOK_PERMISSIONS = [
    'email',
    'user_birthday',
    'user_photos',
    'user_gender',
  ];
  const result = await ((
    FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS })
  ));

  if (result.accessToken) {
    // Login successful.
    console.log(`Facebook access token is ${result.accessToken.token}`);
    this.getCurrentToken();
  }
}

async loginWithFB() {
  const FACEBOOK_PERMISSIONS = ['email', 'user_birthday', 'user_photos', 'user_gender'];
  const result = await FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS }) as FacebookLoginResponse;
  const token = await FacebookLogin.getCurrentAccessToken() as FacebookLoginResponse;
  const email = await FacebookLogin.getProfile<{
    email: string;
  }>({ fields: ['email'] });

  this.email2 = email.email;
  this.loadUserData();
}
async getProfile(){


  const result = await FacebookLogin.getProfile<{
    email: string;
  }>({ fields: ['email'] });
  

  console.log(`Facebook user's email is ${result.email}`);
  this.email2 = result.email;
}
}
