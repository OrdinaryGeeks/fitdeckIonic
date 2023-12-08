export class Assignment {
    

ID:number;
clientID:number;
exerciseID:number;
sets:number;
reps:[];
duration:string;
resultReps:[];
resultDuration:number;
grades: [];
date: string;
isDuration:boolean;


constructor(id:number, ClientID:number, ExerciseID:number,
    Sets:number, Reps:[], Duration:string, ResultReps:[],
    ResultDuration:number, Grades:[], Date:string, IsDuration:boolean)
    {

        this.ID = id;
        this.clientID=ClientID;
        this.exerciseID=ExerciseID;
        this.sets = Sets;
        this.reps = Reps;
        this.duration = Duration;
        this.resultReps = ResultReps;
        this.resultDuration = ResultDuration;
        this.grades = Grades;
        this.date = Date;
        this.isDuration = IsDuration;


    }


}
