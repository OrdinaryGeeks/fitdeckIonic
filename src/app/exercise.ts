export class Exercise {


    id: number;
    description:string;
   
    url:string;

    name: string = "";
    displayName: string="";
    photoURL:string;
  
    suit: string=""; 
    categoryID:number;

   

    constructor(CategoryID:number,Description:string,ID:number,
        Suit: string,Name: string, URL:string, PhotoURL:string,DisplayName:string)
    {
        this.url = URL;
        this.photoURL = PhotoURL;
        this.suit = Suit;
        this.categoryID = CategoryID;
        this.description = Description;
        this.id= ID;
        this.name = Name;
        this.displayName = DisplayName;

      
    }
}
